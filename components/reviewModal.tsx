'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ReviewModalProps {
  photoUrl: string
  photoId: string
  initialPetDetails?: string
  initialReview?: string
  initialOwner?: string
  onSave: (photoId: string, petDetails: string, review: string, owner: string) => Promise<void>
  onClose: () => void
}

export default function ReviewModal({
  photoUrl,
  photoId,
  initialPetDetails = '',
  initialReview = '',
  initialOwner = '',
  onSave,
  onClose
}: ReviewModalProps) {
  const [petDetails, setPetDetails] = useState(initialPetDetails || '')
  const [review, setReview] = useState(initialReview || '')
  const [owner, setOwner] = useState(initialOwner || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(photoId, petDetails, review, owner)
      onClose()
    } catch (error) {
      console.error('Error saving review:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h1>Add Review</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={photoUrl}
            alt="Gallery photo"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Pet name and breed
            </label>
            <input
              type="text"
              value={petDetails}
              onChange={(e) => setPetDetails(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
              placeholder="e.g., Smokey: Jindo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Review (max 250 characters)
            </label>
            <textarea
              value={review}
              onChange={(e) => {
                if (e.target.value.length <= 250) {
                  setReview(e.target.value)
                }
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9185FF] min-h-[100px] resize-none"
              placeholder="Write your review..."
            />
            <div className="text-sm text-gray-500 text-right">
              {review?.length}/250
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Owner / reviewer name
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
              placeholder="e.g., Kristin H."
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#9185FF] rounded-md py-2 w-full text-white font-bold hover:bg-[#5B4FC6] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Review'}
        </button>
      </div>
    </div>
  )
}
