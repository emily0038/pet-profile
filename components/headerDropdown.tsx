'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ShareModal from '@/components/shareModal';
import QRCode from 'qrcode';

interface HeaderDropdownProps {
  username: string;
  isViewMode?: boolean;
}

export default function HeaderDropdown({ username, isViewMode = false }: HeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${username}`
    : '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const generateQRCode = useCallback(async () => {
    try {
      const dataUrl = await QRCode.toDataURL(profileUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  }, [profileUrl]);

  useEffect(() => {
    if (isShareModalOpen && profileUrl) {
      generateQRCode();
    }
  }, [isShareModalOpen, profileUrl, generateQRCode]);

  const handleShareClick = () => {
    setIsOpen(false);
    setIsShareModalOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:opacity-80 transition-opacity shadow-none"
      >
        <Image
          src="/pawprint.svg"
          alt="Profile menu"
          width={48}
          height={48}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          {isViewMode && (
            <Link
              href={`/editor`}
              className="block font-flex px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <Image src="/edit.svg" alt="" width={20} height={20} />
              Edit Page
            </Link>
          )}
          <button
            onClick={handleShareClick}
            className={`w-full text-left font-flex px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3 ${isViewMode ? 'border-t border-gray-100' : ''}`}
          >
            <Image src="/share.svg" alt="" width={20} height={20} />
            Share Profile
          </button>
        </div>
      )}

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        qrCodeDataUrl={qrCodeDataUrl}
        profileUrl={profileUrl}
      />
    </div>
  );
}
