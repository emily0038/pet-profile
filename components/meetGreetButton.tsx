'use client'

import { useState } from 'react'
import MeetGreetModal from './meetGreetModal'
import Image from 'next/image'

interface MeetGreetButtonProps {
  profileId: string
  serviceTypes: { type: string }[]
}

export default function MeetGreetButton({ profileId, serviceTypes }: MeetGreetButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-3 bg-white border-1 border-[#9185FF] rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-[1px_2px_#878787]"
      >
        <Image
          src="/calendar.svg"
          width={24}
          height={24}
          alt="Calendar"
        />
        <span className="text-[#9185FF] button-style text-sm">
          Schedule Your Free Meet & Greet
        </span>
      </button>

      <MeetGreetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileId={profileId}
        serviceTypes={serviceTypes}
      />
    </>
  )
}
