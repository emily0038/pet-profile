'use client';

import React, { useState, useRef } from 'react';
import * as Bytescale from "@bytescale/sdk";
import Image from 'next/image';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

interface PortfolioGalleryProps {
  onPhotosChange?: (photoUrls: string[]) => void;
  initialPhotos?: string[]; // For loading from database
}

export default function PortfolioGallery({ onPhotosChange, initialPhotos = [] }: PortfolioGalleryProps) {
  // Saved photos (from database)
  const [savedPhotos, setSavedPhotos] = useState<string[]>(initialPhotos);
  
  // New photos being previewed (not yet saved)
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  
  // Files to upload when user clicks Save
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_PHOTOS = 8;
  const totalPhotos = savedPhotos.length + previewPhotos.length;
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
    const newSavedPhotos = savedPhotos.filter((_, index) => index !== indexToRemove);
    setSavedPhotos(newSavedPhotos);
    
    // NOTE: When connected to database, you'd also delete from database here
    // await deletePhotoFromDatabase(savedPhotos[indexToRemove]);
  };

  const handleRemovePreview = (indexToRemove: number) => {
    const newPreviewPhotos = previewPhotos.filter((_, index) => index !== indexToRemove);
    const newPendingFiles = pendingFiles.filter((_, index) => index !== indexToRemove);
    
    setPreviewPhotos(newPreviewPhotos);
    setPendingFiles(newPendingFiles);
  };

  const handleCancel = () => {
    // Discard all preview photos
    setPreviewPhotos([]);
    setPendingFiles([]);
    setShowModal(false);
  };

  const handleSave = async () => {
    if (pendingFiles.length === 0) {
      // No new photos to upload, just close modal
      setShowModal(false);

      // Notify parent of any removed photos
      if (onPhotosChange) {
        onPhotosChange(savedPhotos);
      }
      return;
    }

    setUploading(true);

    try {
      // Upload all pending files to Bytescale
      const uploadPromises = pendingFiles.map(async (file) => {
        const { fileUrl } = await uploadManager.upload({ data: file });
        return fileUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // Add uploaded URLs to saved photos
      const newSavedPhotos = [...savedPhotos, ...uploadedUrls];
      setSavedPhotos(newSavedPhotos);

      // Clear preview state
      setPreviewPhotos([]);
      setPendingFiles([]);

      // Notify parent component with all saved photo URLs
      if (onPhotosChange) {
        onPhotosChange(newSavedPhotos);
      }

      // NOTE: When connected to database, save the new URLs:
      // await savePhotosToDatabase(uploadedUrls);

      setShowModal(false);
    } catch (error) {
      console.error('Upload error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to upload images: ${message}`);
    } finally {
      setUploading(false);
    }
  };

  // Combine saved and preview photos for display
  const allDisplayPhotos = [...savedPhotos, ...previewPhotos];

  return (
    <>
      {/* Add Photos Button */}
      <button
        onClick={handleButtonClick}
        className="px-6 py-2 border-2 border-purple-400 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
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
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Display saved photos */}
              {savedPhotos.map((photoUrl, index) => (
                <div key={`saved-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveSaved(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Display preview photos (with visual indicator they're not saved yet) */}
              {previewPhotos.map((photoUrl, index) => (
                <div key={`preview-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-purple-400">
                  <Image
                    src={photoUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
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
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  <div className="text-center text-gray-400">
                    <div className="text-3xl mb-1">+</div>
                    <div className="text-xs">Add photo</div>
                  </div>
                </div>
              )}
            </div>

            {/* Empty state */}
            {allDisplayPhotos.length === 0 && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleAddPhotos}
                className="mb-6 p-16 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
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
              {previewPhotos.length > 0 && (
                <span className="text-purple-600 ml-2">
                  ({previewPhotos.length} new, not saved yet)
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
                disabled={uploading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? 'Uploading...' : previewPhotos.length > 0 ? `Save ${previewPhotos.length} Photo${previewPhotos.length > 1 ? 's' : ''}` : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Example usage:
function EditorExample() {
  // When connected to database, load initial photos like this:
  const [portfolioPhotos, setPortfolioPhotos] = useState<string[]>([
    // These would come from your database
    // 'https://bytescale.com/saved-photo-1.jpg',
    // 'https://bytescale.com/saved-photo-2.jpg',
  ]);

  const handlePhotosChange = (photoUrls: string[]) => {
    console.log('Updated portfolio photos:', photoUrls);
    setPortfolioPhotos(photoUrls);
    
    // Save to database:
    // await database.profiles.update({
    //   portfolioPhotos: photoUrls
    // });
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
      <p className="text-gray-600 mb-4">Showcase your space and happy clients</p>
      <PortfolioGallery 
        onPhotosChange={handlePhotosChange}
        initialPhotos={portfolioPhotos}
      />
    </div>
  );
}