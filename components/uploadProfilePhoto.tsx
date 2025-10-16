'use client';

import React, { useState, useRef } from 'react';
import * as Bytescale from "@bytescale/sdk";
import Image from 'next/image';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

interface ProfilePhotoFrameProps {
  onPhotoSave?: (photoUrl: string) => void;
}

export default function UploadProfilePhoto({ onPhotoSave }: ProfilePhotoFrameProps) {
  const [savedPhoto, setSavedPhoto] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFrameClick = () => {
    setShowUploadModal(true);
  };

  // Store both the file and its preview
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Upload to Bytescale and save the URL
  const handleSave = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      // Upload to Bytescale
      const { fileUrl } = await uploadManager.upload({ data: selectedFile });

      // Save the Bytescale URL (not the base64 preview)
      setSavedPhoto(fileUrl);

      // Pass the URL to parent component
      if (onPhotoSave) {
        onPhotoSave(fileUrl);
      }

      // Close modal and reset state
    setShowUploadModal(false);
    setPreviewPhoto(null);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error uploading image: ${message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setShowUploadModal(false);
    setPreviewPhoto(null);
    setSelectedFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Profile Photo Frame */}
      <div
        onClick={handleFrameClick}
        className="w-48 h-48 rounded-full border-4 border-gray-300 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors overflow-hidden bg-gray-100"
      >
        {savedPhoto ? (
          <Image
            src={savedPhoto}
            width={192}
            height={192}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-center px-4">Upload here</span>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">

            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 cursor-pointer hover:border-purple-400 transition-colors"
            >
              {/* If preview photo exists, show rounded frame, OTHERWISE show default image */}  
              {previewPhoto ? (
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
                  <Image
                    src={previewPhoto}
                    width={192}
                    height={192}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
                  <Image
                    src={"person.svg"}
                    width={192}
                    height={192}
                    alt="Default"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!previewPhoto || uploading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? 'Uploading...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Example usage in your editor page: - WILL NEED TO DELETE
function EditorExample() {
  const handlePhotoSave = (photoUrl: string) => {
    console.log('Photo saved:', photoUrl);
    // You can save this to your state management or database
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Profile Editor</h1>
      <UploadProfilePhoto onPhotoSave={handlePhotoSave} />
    </div>
  );
}