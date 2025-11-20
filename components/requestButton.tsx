'use client';

import { useState } from 'react';
import RequestModal from '@/components/requestModal';

interface ServiceType {
  type: string;
  items: { name: string; is_add_on_only: boolean }[];
}

interface RequestButtonProps {
  profileId: string;
  serviceTypes: ServiceType[];
  prefilledServiceType?: string;
  prefilledService?: string;
}

export default function RequestButton({ profileId, serviceTypes, prefilledServiceType, prefilledService }: RequestButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-sm px-4 py-1 border border-[#9185FF] bg-[#E4E1FF] hover:bg-[#BCB5FF] text-[#878787] text-sm font-bold whitespace-nowrap"
      >
        Request
      </button>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileId={profileId}
        serviceTypes={serviceTypes}
        prefilledServiceType={prefilledServiceType}
        prefilledService={prefilledService}
      />
    </>
  );
}
