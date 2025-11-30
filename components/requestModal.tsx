'use client';

import React, { useState } from 'react';
import ConfirmModal from '@/components/confirmModal';

interface Service {
  serviceType: string;
  menuItem: string;
  isAddOn: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  pickupSpot: string;
}

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  serviceTypes: { type: string; items: { name: string; is_add_on_only: boolean }[] }[];
  prefilledServiceType?: string;
  prefilledService?: string;
}

export default function RequestModal({ isOpen, onClose, profileId, serviceTypes, prefilledServiceType, prefilledService }: RequestModalProps) {
  // Determine if prefilled service is an add-on
  const prefilledIsAddOn = prefilledServiceType && prefilledService
    ? serviceTypes
        .find(st => st.type === prefilledServiceType)
        ?.items.find(item => item.name === prefilledService)
        ?.is_add_on_only || false
    : false;

  const [services, setServices] = useState<Service[]>([{
    serviceType: prefilledServiceType || '',
    menuItem: prefilledService || '',
    isAddOn: prefilledIsAddOn,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    pickupSpot: '',
  }]);

  const [petDetails, setPetDetails] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isMultiDay, setIsMultiDay] = useState<boolean[]>([false]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  if (!isOpen) return null;

  const isFormDirty = () => {
    // Check if any service fields have been filled
    const hasServiceData = services.some(s =>
      s.serviceType || s.menuItem || s.startDate || s.startTime ||
      s.endDate || s.endTime || s.pickupSpot
    );

    // Check if any other fields have been filled
    const hasOtherData = petDetails || firstName || lastName || phoneNumber || message;

    return hasServiceData || hasOtherData;
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
    setServices([{
      serviceType: prefilledServiceType || '',
      menuItem: prefilledService || '',
      isAddOn: prefilledIsAddOn,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      pickupSpot: '',
    }]);
    setPetDetails('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setMessage('');
    setIsMultiDay([false]);
    onClose();
  };

  const cancelClose = () => {
    setShowConfirmClose(false);
  };

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

  const handleServiceTypeChange = (index: number, serviceType: string) => {
    const newServices = [...services];
    newServices[index].serviceType = serviceType;
    newServices[index].menuItem = '';
    setServices(newServices);
  };

  const handleMenuItemChange = (index: number, menuItem: string) => {
    const newServices = [...services];
    const selectedService = serviceTypes
      .find(st => st.type === newServices[index].serviceType)
      ?.items.find(item => item.name === menuItem);

    newServices[index].menuItem = menuItem;
    newServices[index].isAddOn = selectedService?.is_add_on_only || false;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, {
      serviceType: '',
      menuItem: '',
      isAddOn: false,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      pickupSpot: '',
    }]);
    setIsMultiDay([...isMultiDay, false]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
      setIsMultiDay(isMultiDay.filter((_, i) => i !== index));
    }
  };

  const toggleMultiDay = (index: number) => {
    const newIsMultiDay = [...isMultiDay];
    newIsMultiDay[index] = !newIsMultiDay[index];
    setIsMultiDay(newIsMultiDay);
  };

  const canAddAnotherService = () => {
    // Check that all existing services are complete
    return services.every(s => {
      // Must have service type and menu item
      if (!s.serviceType || !s.menuItem) return false;

      // If it's not an add-on, must have date and time
      if (!s.isAddOn && (!s.startDate || !s.startTime)) return false;

      return true;
    });
  };

  const isFormValid = () => {
    // Check if at least one non-add-on service is selected
    const hasNonAddOn = services.some(s => s.menuItem && !s.isAddOn);
    if (!hasNonAddOn) return false;

    // Check all services have type and menu item
    const allServicesValid = services.every(s => s.serviceType && s.menuItem);
    if (!allServicesValid) return false;

    // Check non-add-on services have dates
    const nonAddOnServicesHaveDates = services.every(s => {
      if (s.isAddOn) return true;
      return s.startDate && s.startTime;
    });
    if (!nonAddOnServicesHaveDates) return false;

    // Check required fields
    return petDetails && firstName && lastName && phoneNumber;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      const { submitServiceRequest } = await import('@/app/actions/requests');

      await submitServiceRequest({
        profileId,
        services,
        petDetails,
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
        setServices([{
          serviceType: '',
          menuItem: '',
          isAddOn: false,
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          pickupSpot: '',
        }]);
        setPetDetails('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setMessage('');
        setIsMultiDay([false]);
      }, 3000);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-cente text-gray-600">
          <h2 className="text-2xl font-bold mb-4">Thank you for reaching out!</h2>
          <p className="text-gray-600">I&apos;ll get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-20"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-6 text-gray-600 max-w-md w-full max-h-[calc(100vh-6rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-400">Request</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2x shadow-none"
          >
            ×
          </button>
        </div>

        {/* Services */}
        {services.map((service, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg relative">
            {services.length > 1 && (
              <button
                onClick={() => removeService(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}

            {/* Service Type */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Service type</label>
              <select
                value={service.serviceType}
                onChange={(e) => handleServiceTypeChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
              >
                <option value="">Select service type</option>
                {serviceTypes.map(st => (
                  <option key={st.type} value={st.type}>{st.type}</option>
                ))}
              </select>
            </div>

            {/* Service */}
            {service.serviceType && (
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Service</label>
                <select
                  value={service.menuItem}
                  onChange={(e) => handleMenuItemChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                >
                  <option value="">Select service</option>
                  {serviceTypes
                    .find(st => st.type === service.serviceType)
                    ?.items.map(item => (
                      <option
                        key={item.name}
                        value={item.name}
                        disabled={index === 0 && item.is_add_on_only}
                      >
                        {item.name}
                        {item.is_add_on_only ? '*' : ''}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Date/Time fields - only for non-add-on services */}
            {service.menuItem && !service.isAddOn && (
              <>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm text-gray-600">Date / time</label>
                    <label className="flex items-center text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={isMultiDay[index]}
                        onChange={() => toggleMultiDay(index)}
                        className="mr-1"
                      />
                      Multi-day booking?
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={service.startDate}
                      onChange={(e) => {
                        const newServices = [...services];
                        newServices[index].startDate = e.target.value;
                        setServices(newServices);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                    />
                    <input
                      type="time"
                      value={service.startTime}
                      onChange={(e) => {
                        const newServices = [...services];
                        newServices[index].startTime = e.target.value;
                        setServices(newServices);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                    />
                  </div>
                </div>

                {/* End Date/Time - only if multi-day is checked */}
                {isMultiDay[index] && (
                  <div className="mb-3">
                    <label className="block text-sm text-gray-600 mb-1">End date / time</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={service.endDate}
                        onChange={(e) => {
                          const newServices = [...services];
                          newServices[index].endDate = e.target.value;
                          setServices(newServices);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                      />
                      <input
                        type="time"
                        value={service.endTime}
                        onChange={(e) => {
                          const newServices = [...services];
                          newServices[index].endTime = e.target.value;
                          setServices(newServices);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                      />
                    </div>
                  </div>
                )}

                {/* Pickup Spot */}
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">
                    Pickup spot <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={service.pickupSpot}
                    onChange={(e) => {
                      const newServices = [...services];
                      newServices[index].pickupSpot = e.target.value;
                      setServices(newServices);
                    }}
                    placeholder="30 Rockefeller Center"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
                  />
                </div>
              </>
            )}
          </div>
        ))}

        {/* Add Another Service Button */}
        <button
          onClick={addService}
          disabled={!canAddAnotherService()}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <span className="text-xl">+</span> Add another service
        </button>

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
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9185FF]"
          />
        </div>

        {/* Pet Details */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Pet details* - breed, weight, age
          </label>
          <input
            type="text"
            value={petDetails}
            onChange={(e) => setPetDetails(e.target.value)}
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
        cancelText="Keep Editing"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </div>
  );
}