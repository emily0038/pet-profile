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
        className="rounded-sm px-8 py-2 bg-[#9185FF] hover:bg-[#6E5FEE] font-semibold border border-[#5B4FC6] shadow-[1px_2px_#878787]"
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
