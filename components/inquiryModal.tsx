'use client';

import React, { useState } from 'react';
import ConfirmModal from '@/components/confirmModal';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
}

export default function InquiryModal({ isOpen, onClose, profileId }: InquiryModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  if (!isOpen) return null;

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;

    const parts = [match[1], match[2], match[3]].filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
    return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const isFormDirty = () => {
    return phoneNumber || firstName || lastName || message;
  };

  const handleClose = () => {
    if (isFormDirty()) {
      setShowConfirmClose(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setShowConfirmClose(false);
    // Reset all form fields
    setPhoneNumber('');
    setFirstName('');
    setLastName('');
    setMessage('');
    onClose();
  };

  const cancelClose = () => {
    setShowConfirmClose(false);
  };

  const isFormValid = () => {
    return phoneNumber && firstName && lastName;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      const { submitInquiry } = await import('@/app/actions/requests');

      await submitInquiry({
        profileId,
        firstName,
        lastName,
        phoneNumber,
        message,
      });

      // Show success message
      setShowSuccess(true);

      // Reset form after 3 seconds and close
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setPhoneNumber('');
        setFirstName('');
        setLastName('');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-gray-600">Thank you for reaching out! I&apos;ll get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full text-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-400">Get In Touch</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1 text-left">Phone number*</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
          />
        </div>

        {/* First Name and Last Name */}
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1 text-left">First name*</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1 text-left">Last name*</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
            />
          </div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1 text-left">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] text-gray-600 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="w-full px-4 py-3 bg-[#9185FF] rounded-lg text-white hover:bg-[#5B4FC6] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {/* Confirm Close Modal */}
      <ConfirmModal
        isOpen={showConfirmClose}
        title="Discard changes?"
        message="You have unsaved changes. Are you sure you want to close this form?"
        confirmText="Discard"
        cancelText="Keep editing"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </div>
  );
}
