'use client';

import React, { useState, useRef } from 'react';
import * as Bytescale from "@bytescale/sdk";
import Image from 'next/image';
import ReviewModal from './reviewModal';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

interface GalleryPhoto {
  id: string;
  photo_url: string;
  order: number;
  pet_details?: string;
  review?: string;
  owner?: string;
}

interface PortfolioGalleryProps {
  initialPhotos?: GalleryPhoto[];
  onPhotosSave?: (photoUrls: string[]) => Promise<void>;
  onPhotoDelete?: (photoId: string) => Promise<void>;
  onReviewSave?: (photoId: string, petDetails: string, review: string, owner: string) => Promise<void>;
}

export default function PortfolioGallery({
  initialPhotos = [],
  onPhotosSave,
  onPhotoDelete,
  onReviewSave
}: PortfolioGalleryProps) {
  // Saved photos (from database)
  const [savedPhotos, setSavedPhotos] = useState<GalleryPhoto[]>(initialPhotos);

  // New photos being previewed (not yet saved)
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);

  // Files to upload when user clicks Save
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  // Photos marked for deletion (will be deleted on Save)
  const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedPhotoForReview, setSelectedPhotoForReview] = useState<GalleryPhoto | null>(null);

  const handleOpenReviewModal = (photo: GalleryPhoto) => {
    setSelectedPhotoForReview(photo);
    setReviewModalOpen(true);
  };

  const handleReviewSave = async (photoId: string, petDetails: string, review: string, owner: string) => {
    if (onReviewSave) {
      await onReviewSave(photoId, petDetails, review, owner);
      // Update local state to reflect the review
      setSavedPhotos(savedPhotos.map(photo =>
        photo.id === photoId
          ? { ...photo, pet_details: petDetails, review, owner }
          : photo
      ));
    }
  };

  const MAX_PHOTOS = 8;
  // Count visible photos (excluding ones marked for deletion)
  const visibleSavedPhotos = savedPhotos.filter(photo => !photosToDelete.includes(photo.id));
  const totalPhotos = visibleSavedPhotos.length + previewPhotos.length;
  const remainingSlots = MAX_PHOTOS - totalPhotos;

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleAddPhotos = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    
    if (filesToAdd.length === 0) {
      alert(`Maximum ${MAX_PHOTOS} photos allowed`);
      return;
    }

    // Create preview URLs for the new files
    const newPreviewUrls: string[] = [];
    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result as string);
        if (newPreviewUrls.length === filesToAdd.length) {
          setPreviewPhotos([...previewPhotos, ...newPreviewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Store files for upload on Save
    setPendingFiles([...pendingFiles, ...filesToAdd]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    const filesToAdd = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .slice(0, remainingSlots);
    
    if (filesToAdd.length === 0) {
      if (remainingSlots === 0) {
        alert(`Maximum ${MAX_PHOTOS} photos allowed`);
      }
      return;
    }

    // Create preview URLs
    const newPreviewUrls: string[] = [];
    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result as string);
        if (newPreviewUrls.length === filesToAdd.length) {
          setPreviewPhotos([...previewPhotos, ...newPreviewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });

    setPendingFiles([...pendingFiles, ...filesToAdd]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveSaved = (indexToRemove: number) => {
    const photoToDelete = savedPhotos[indexToRemove];

    // Mark for deletion (will be deleted on Save)
    setPhotosToDelete([...photosToDelete, photoToDelete.id]);
  };

  const handleRemovePreview = (indexToRemove: number) => {
    const newPreviewPhotos = previewPhotos.filter((_, index) => index !== indexToRemove);
    const newPendingFiles = pendingFiles.filter((_, index) => index !== indexToRemove);
    
    setPreviewPhotos(newPreviewPhotos);
    setPendingFiles(newPendingFiles);
  };

  const handleCancel = () => {
    // Discard all changes
    setPreviewPhotos([]);
    setPendingFiles([]);
    setPhotosToDelete([]);
    setShowModal(false);
  };

  const handleSave = async () => {
    // Check if there are any changes to save
    if (pendingFiles.length === 0 && photosToDelete.length === 0) {
      // No changes, just close modal
      setShowModal(false);
      return;
    }

    setUploading(true);

    try {
      // Remove deleted photos from local state immediately (optimistic update)
      const remainingPhotos = savedPhotos.filter(photo => !photosToDelete.includes(photo.id));

      // Delete photos marked for deletion from database
      if (photosToDelete.length > 0 && onPhotoDelete) {
        await Promise.all(photosToDelete.map(photoId => onPhotoDelete(photoId)));
      }

      // Upload new photos if any
      let newPhotos: GalleryPhoto[] = [];
      if (pendingFiles.length > 0) {
        const uploadPromises = pendingFiles.map(async (file) => {
          const { fileUrl } = await uploadManager.upload({ data: file });
          return fileUrl;
        });

        const uploadedUrls = await Promise.all(uploadPromises);

        // Save to database
        if (onPhotosSave) {
          await onPhotosSave(uploadedUrls);
        }

        // Create temporary photo objects for optimistic update
        // These will have the correct URLs but temporary IDs
        newPhotos = uploadedUrls.map((url, index) => ({
          id: `temp-${Date.now()}-${index}`,
          photo_url: url,
          order: remainingPhotos.length + index
        }));
      }

      // Update local state immediately (optimistic update)
      setSavedPhotos([...remainingPhotos, ...newPhotos]);

      // Clear all pending changes
      setPreviewPhotos([]);
      setPendingFiles([]);
      setPhotosToDelete([]);

      setShowModal(false);
    } catch (error) {
      console.error('Save error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to save changes: ${message}`);
    } finally {
      setUploading(false);
    }
  };

  // Total count for display
  const totalDisplayPhotos = savedPhotos.length + previewPhotos.length;

  return (
    <>
      {/* Add Photos Button */}
      <button
        onClick={handleButtonClick}
        className="px-6 py-2 border-2 border-[#9185FF] text-[#9185FF] rounded-lg hover:bg-[#E4E1FF] transition-colors"
      >
        {savedPhotos.length > 0 
          ? `View / add photos (${savedPhotos.length}/${MAX_PHOTOS})` 
          : 'Add photos'}
      </button>

      {/* Gallery Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Portfolio Photos</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 text-2xl shadow-none"
              >
                ×
              </button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Display saved photos (excluding ones marked for deletion) */}
              {savedPhotos
                .filter(photo => !photosToDelete.includes(photo.id))
                .map((photo, index) => (
                  <div key={photo.id} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={photo.photo_url}
                      alt={`Portfolio ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => {
                        const originalIndex = savedPhotos.findIndex(p => p.id === photo.id);
                        handleRemoveSaved(originalIndex);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                    >
                      ×
                    </button>
                    {/* Review icon - only show for photos with real IDs (not temp IDs) */}
                    {!photo.id.startsWith('temp-') && (
                      <button
                        onClick={() => handleOpenReviewModal(photo)}
                        className="absolute bottom-2 right-2 rounded-full hover:bg-[#BCB5FF] w-8 h-8 flex items-center justify-center transition-colors shadow-md"
                        title={photo.review ? "Edit review" : "Add review"}
                      >
                        <Image
                          src={photo.review ? "/review-edit.svg" : "/review-add.svg"}
                          alt={photo.review ? "Edit review" : "Add review"}
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                  </div>
                ))}

              {/* Display preview photos (with visual indicator they're not saved yet) */}
              {previewPhotos.map((photoUrl, index) => (
                <div key={`preview-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-[#9185FF]">
                  <Image
                    src={photoUrl}
                    width={500}
                    height={500}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-2 left-2 bg-[#9185FF] text-white text-xs px-2 py-1 rounded">
                    New
                  </div>
                  <button
                    onClick={() => handleRemovePreview(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Empty slots / Drop zone */}
              {remainingSlots > 0 && (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleAddPhotos}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#9185FF] hover:bg-[#E4E1FF] transition-colors"
                >
                  <div className="text-center text-gray-400">
                    <div className="text-3xl mb-1">+</div>
                    <div className="text-xs">Add photo</div>
                  </div>
                </div>
              )}
            </div>

            {/* Empty state */}
            {totalDisplayPhotos === 0 && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleAddPhotos}
                className="mb-6 p-16 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-[#9185FF] hover:bg-[#E4E1FF] transition-colors"
              >
                <div className="text-gray-400 mb-2 text-4xl">📸</div>
                <p className="text-gray-600 mb-1">Drag and drop photos here</p>
                <p className="text-sm text-gray-400">or click to browse</p>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Photo count */}
            <p className="text-sm text-gray-500 mb-4">
              {totalPhotos} / {MAX_PHOTOS} photos
              {(previewPhotos.length > 0 || photosToDelete.length > 0) && (
                <span className="text-[#9185FF] ml-2">
                  ({previewPhotos.length > 0 && `${previewPhotos.length} new`}
                  {previewPhotos.length > 0 && photosToDelete.length > 0 && ', '}
                  {photosToDelete.length > 0 && `${photosToDelete.length} to delete`} - unsaved)
                </span>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={uploading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={uploading || (previewPhotos.length === 0 && photosToDelete.length === 0)}
                className="flex-1 px-4 py-2 bg-[#9185FF] text-white rounded-lg hover:bg-[#5B4FC6] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && selectedPhotoForReview && (
        <ReviewModal
          photoUrl={selectedPhotoForReview.photo_url}
          photoId={selectedPhotoForReview.id}
          initialPetDetails={selectedPhotoForReview.pet_details}
          initialReview={selectedPhotoForReview.review}
          initialOwner={selectedPhotoForReview.owner}
          onSave={handleReviewSave}
          onClose={() => setReviewModalOpen(false)}
        />
      )}
    </>
  );
}