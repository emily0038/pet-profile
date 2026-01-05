'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ShareModal from '@/components/shareModal';
import QRCode from 'qrcode';
import Image from 'next/image';

interface ShareButtonProps {
  domain: string;
}

export default function ShareButton({ domain }: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${domain}`
    : '';

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
    if (isModalOpen && profileUrl) {
      generateQRCode();
    }
  }, [isModalOpen, profileUrl, generateQRCode]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share profile"
      >
        <Image
          src="/share.svg"
          alt="Share"
          width={24}
          height={24}
        />
      </button>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        qrCodeDataUrl={qrCodeDataUrl}
        profileUrl={profileUrl}
      />
    </>
  );
}
