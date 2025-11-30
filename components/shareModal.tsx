'use client';

import React from 'react';
import Image from 'next/image';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeDataUrl: string | null;
  profileUrl: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  qrCodeDataUrl,
  profileUrl,
}: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = 'profile-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Share Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl shadow-none"
          >
            ×
          </button>
        </div>

        {/* QR Code Display */}
        {qrCodeDataUrl && (
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
              <Image
                src={qrCodeDataUrl}
                alt="Profile QR Code"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>
            <p className="text-sm text-gray-600 text-center mb-2">
              Scan this code to visit the profile
            </p>
            <button
              onClick={handleDownloadQR}
              className="text-[#9185FF] hover:text-[#5B4FC6] text-sm font-medium underline shadow-none"
            >
              Download QR Code
            </button>
          </div>
        )}

        {/* URL Display and Copy */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Profile URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
            />
            <button
              onClick={handleCopyUrl}
              className="px-4 py-2 bg-[#9185FF] text-white rounded-lg hover:bg-[#5B4FC6] transition-colors text-sm whitespace-nowrap"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
