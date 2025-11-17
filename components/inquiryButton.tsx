'use client';

import { useState } from 'react';
import InquiryModal from '@/components/inquiryModal';

interface InquiryButtonProps {
  profileId: string;
}

export default function InquiryButton({ profileId }: InquiryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-sm px-8 py-2 bg-[#9185FF] font-semibold"
      >
        Get In Touch
      </button>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileId={profileId}
      />
    </>
  );
}
