'use client';

import React, { useState } from 'react';
import ConfirmModal from '@/components/confirmModal';

interface MeetGreetModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  serviceTypes: { type: string }[];
}

export default function MeetGreetModal({
  isOpen,
  onClose,
  profileId,
  serviceTypes,
}: MeetGreetModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [meetingTimes, setMeetingTimes] = useState([
    { date: '', startTime: '', endTime: '' },
    { date: '', startTime: '', endTime: '' },
    { date: '', startTime: '', endTime: '' },
  ]);
  const [meetingSpot, setMeetingSpot] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [petDetails, setPetDetails] = useState('');
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

  const handleServiceToggle = (serviceType: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceType)
        ? prev.filter((s) => s !== serviceType)
        : [...prev, serviceType]
    );
  };

  const handleTimeChange = (index: number, field: 'date' | 'startTime' | 'endTime', value: string) => {
    const newTimes = [...meetingTimes];
    newTimes[index][field] = value;
    setMeetingTimes(newTimes);
  };

  const isFormDirty = () => {
    return (
      selectedServices.length > 0 ||
      meetingTimes.some((t) => t.date || t.startTime || t.endTime) ||
      meetingSpot ||
      firstName ||
      lastName ||
      phoneNumber ||
      petDetails ||
      message
    );
  };

  const isFormValid = () => {
    // Must have at least one service selected
    if (selectedServices.length === 0) return false;

    // Must have at least one complete time block (date + start + end)
    const hasAtLeastOneTime = meetingTimes.some((t) => t.date && t.startTime && t.endTime);
    if (!hasAtLeastOneTime) return false;

    // Must have required contact fields
    return firstName && lastName && phoneNumber && petDetails;
  };

  const resetForm = () => {
    setSelectedServices([]);
    setMeetingTimes([
      { date: '', startTime: '', endTime: '' },
      { date: '', startTime: '', endTime: '' },
      { date: '', startTime: '', endTime: '' },
    ]);
    setMeetingSpot('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setPetDetails('');
    setMessage('');
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
    resetForm();
    onClose();
  };

  const cancelClose = () => {
    setShowConfirmClose(false);
    console.log('Opted to keep editing');
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      const { submitMeetGreet } = await import('@/app/actions/requests');

      // Filter out empty meeting times
      const validMeetingTimes = meetingTimes.filter((t) => t.date && t.startTime && t.endTime);

      await submitMeetGreet({
        profileId,
        selectedServices,
        meetingTimes: validMeetingTimes,
        meetingSpot,
        firstName,
        lastName,
        phoneNumber,
        petDetails,
        message,
      });

      // Show success message
      setShowSuccess(true);

      // Reset form after 3 seconds and close
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        resetForm();
      }, 3000);
    } catch (error) {
      console.error('Error submitting meet & greet:', error);
      alert('Failed to submit request. Please try again.');
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
        className="bg-white rounded-lg p-6 text-gray-600 max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-400">Schedule a Meet & Greet</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl shadow-none"
          >
            ×
          </button>
        </div>

        {/* Service Selection */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            What service(s) are you interested in?*
          </label>
          <div className="space-y-2">
            {serviceTypes.map((service) => (
              <label key={service.type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.type)}
                  onChange={() => handleServiceToggle(service.type)}
                  className="w-4 h-4 text-[#9185FF] border-gray-300 rounded focus:ring-[#9185FF]"
                />
                <span className="text-gray-600">{service.type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Meeting Times */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            Provide three time blocks that you&apos;re available:*
          </label>
          <div className="space-y-3">
            {meetingTimes.map((time, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="date"
                  value={time.date}
                  onChange={(e) => handleTimeChange(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                />
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={time.startTime}
                    onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                    placeholder="Start time"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                  />
                  <span className="flex items-center text-gray-400">-</span>
                  <input
                    type="time"
                    value={time.endTime}
                    onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                    placeholder="End time"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Spot */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Meeting spot <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={meetingSpot}
            onChange={(e) => setMeetingSpot(e.target.value)}
            placeholder="e.g., 75th St and 1st Ave"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
          />
        </div>

        {/* Name */}
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">First name*</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Last name*</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Phone number*</label>
          <input
            type="tel"
            maxLength={14}
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
          />
        </div>

        {/* Pet Details */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Pet details*</label>
          <input
            type="text"
            value={petDetails}
            onChange={(e) => setPetDetails(e.target.value)}
            placeholder="Breed, weight, age"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Message <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF] resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="w-full px-4 py-3 bg-[#9185FF] text-white rounded-lg hover:bg-[#5B4FC6] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
