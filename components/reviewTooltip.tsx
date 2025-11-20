'use client'

import { useEffect, useRef } from 'react'

interface ReviewTooltipProps {
  petDetails?: string
  review?: string
  owner?: string
  onClose: () => void
  buttonRef?: HTMLButtonElement | null
}

export default function ReviewTooltip({
  petDetails,
  review,
  owner,
  onClose,
  buttonRef
}: ReviewTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Add click outside listener
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    // Position the tooltip relative to the button
    if (tooltipRef.current && buttonRef) {
      const buttonRect = buttonRef.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = buttonRect.bottom + 8 // Below the button with gap
      let left = buttonRect.left

      // If tooltip would go off the right edge, align it to the right edge of button
      if (left + tooltipRect.width > viewportWidth - 16) {
        left = buttonRect.right - tooltipRect.width
      }

      // If still off the left edge, align to viewport with padding
      if (left < 16) {
        left = 16
      }

      // If tooltip would go off the bottom, show it above the button
      if (top + tooltipRect.height > viewportHeight - 16) {
        top = buttonRect.top - tooltipRect.height - 8
      }

      tooltipRef.current.style.top = `${top}px`
      tooltipRef.current.style.left = `${left}px`
    }
  }, [buttonRef])

  return (
    <div
      ref={tooltipRef}
      className="fixed z-[9999] bg-white rounded-lg shadow-xl p-4 w-64 max-w-[calc(100vw-2rem)]"
      onClick={(e) => e.stopPropagation()}
    >
      {petDetails && (
        <h3 className="font-bold text-gray-900 mb-2">{petDetails}</h3>
      )}

      {review && (
        <p className="text-gray-700 text-sm leading-relaxed mb-2">
          {review}
        </p>
      )}

      {owner && (
        <p className="text-gray-600 italic text-sm">
          - {owner}
        </p>
      )}
    </div>
  )
}
