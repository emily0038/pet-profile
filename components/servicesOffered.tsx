'use client';

import React, { useState } from 'react';
import ConfirmModal from './confirmModal';

// Database schema interfaces
// Matches services table
interface Service {
  id?: string; // UUID from database (optional for new services)
  profile_id?: string; // Foreign key to profiles table
  type: string; // e.g., "Dog Walking", "Pet Taxi"
  description?: string; // Optional description
  created_at?: string;
  updated_at?: string;
}

// Matches service_menu_items table
interface ServiceMenuItem {
  id?: string; // UUID from database (optional for new items)
  service_id?: string; // Foreign key to services table
  name: string; // e.g., "30 minute walk"
  price: string; // e.g., "25"
  is_add_on_only: boolean;
  created_at?: string;
  updated_at?: string;
}

// Combined interface for component state (service with its menu items)
interface ServiceWithItems extends Service {
  menu_items: ServiceMenuItem[];
}

interface ServicesOfferedProps {
  onSave?: (service: ServiceWithItems) => Promise<void>;
  onDelete?: (serviceId: string) => Promise<void>;
  initialServices?: ServiceWithItems[];

}

export default function ServicesOffered({
  onSave,
  onDelete,
  initialServices = []
}: ServicesOfferedProps) {
  const [savedServices, setSavedServices] = useState<ServiceWithItems[]>(initialServices);
  const [editingService, setEditingService] = useState<ServiceWithItems | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalConfig, setConfirmModalConfig] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const [serviceTypeInput, setServiceTypeInput] = useState('');

  const hasUnsavedChanges = (currentService: ServiceWithItems): boolean => {
    // If it's a new service (no ID), check if any content was added
    if (!currentService.id) {
      return currentService.type?.trim() !== '' ||
             currentService.description?.trim() !== '' ||
             currentService.menu_items.some(item => item.name.trim() !== '');
    }

    // If it's an existing service, compare with saved version
    const savedService = initialServices.find(s => s.id === currentService.id);
    if (!savedService) return false;

    // Check if type changed
    if (currentService.type !== savedService.type) return true;

    // Check if description changed
    if (currentService.description !== savedService.description) return true;

    // Check if menu items changed
    if (currentService.menu_items.length !== savedService.menu_items.length) return true;

    // Check if any menu item content changed
    return currentService.menu_items.some((item, index) => {
      const savedItem = savedService.menu_items[index];
      if (!savedItem) return true;
      return item.name !== savedItem.name ||
             item.price !== savedItem.price ||
             item.is_add_on_only !== savedItem.is_add_on_only;
    });
  };

  const handleEditService = (service: ServiceWithItems) => {
    setEditingService({ ...service });
  };

  const addNewService = () => {
    if (!serviceTypeInput.trim()) return;

    // Check if service type already exists
    const exists = savedServices.some(s => s.type.toLowerCase() === serviceTypeInput.trim().toLowerCase());
    if (exists) {
      alert('A service with this name already exists.');
      return;
    }

    const newService: ServiceWithItems = {
      type: serviceTypeInput.trim(),
      description: '',
      menu_items: [{
        name: '',
        price: '',
        is_add_on_only: false,
      }],
    };
    setEditingService(newService);
    setServiceTypeInput('');
  };

  const updateServiceType = (type: string) => {
    if (editingService) {
      setEditingService({ ...editingService, type });
    }
  }; 

  const updateDescription = (description: string) => {
    if (editingService) {
      setEditingService({ ...editingService, description });
    }
  };

  const addMenuItem = () => {
    if (editingService) {
      setEditingService({
        ...editingService,
        menu_items: [
          ...editingService.menu_items,
          {
            name: '',
            price: '',
            is_add_on_only: false,
          },
        ],
      });
    }
  };

  const updateMenuItem = (
    index: number,
    field: keyof ServiceMenuItem,
    value: string | boolean
  ) => {
    if (editingService) {
      const newMenuItems = [...editingService.menu_items];
      newMenuItems[index] = {
        ...newMenuItems[index],
        [field]: value,
      };
      setEditingService({
        ...editingService,
        menu_items: newMenuItems,
      });
    }
  };

  const removeMenuItem = (index: number) => {
    if (!editingService) return;

    const menuItem = editingService.menu_items[index];

    if (menuItem.name.trim() !== '') {
      // Show confirmation modal
      setConfirmModalConfig({
        title: 'Remove service option?',
        message: 'Are you sure you want to remove this service?',
        onConfirm: () => {
          const newMenuItems = [...editingService.menu_items];
          newMenuItems.splice(index, 1);
          setEditingService({
            ...editingService,
            menu_items: newMenuItems,
          });
          setShowConfirmModal(false);
        },
      });
      setShowConfirmModal(true);
    } else {
      const newMenuItems = [...editingService.menu_items];
      newMenuItems.splice(index, 1);
      setEditingService({
        ...editingService,
        menu_items: newMenuItems,
      });
    }
  };

  const canAddMenuItem = (): boolean => {
    if (!editingService || editingService.menu_items.length === 0) return true;
    const lastItem = editingService.menu_items[editingService.menu_items.length - 1];
    return lastItem.name.trim() !== '';
  };

  const handleSave = async () => {
    if (!editingService) return;

    // Check for duplicate service type (excluding the current service being edited)
    const duplicateExists = savedServices.some(s =>
      s.id !== editingService.id &&
      s.type.toLowerCase() === editingService.type.trim().toLowerCase()
    );

    if (duplicateExists) {
      alert('A service with this name already exists. Please choose a different name.');
      return;
    }

    // Update local state IMMEDIATELY for instant UI update
    const existingIndex = savedServices.findIndex(s =>
      s.id === editingService.id
    );

    if (existingIndex >= 0) {
      const newSavedServices = [...savedServices];
      newSavedServices[existingIndex] = editingService;
      setSavedServices(newSavedServices);
    } else {
      setSavedServices([...savedServices, editingService]);
    }

    // Close the editor immediately
    setEditingService(null);

    // Save to database in background (don't await)
    if (onSave) {
      onSave(editingService).catch(error => {
        console.error('Failed to save service:', error);
        alert('Failed to save service. Please try again.');
        // Could revert the optimistic update here if needed
      });
    }
  };

  const handleCancel = () => {
    if (editingService && hasUnsavedChanges(editingService)) {
      // Show confirmation modal only if there are unsaved changes
      setConfirmModalConfig({
        title: 'Discard changes?',
        message: 'You have unsaved changes. Are you sure you want to discard them?',
        onConfirm: () => {
          setEditingService(null);
          setShowConfirmModal(false);
        },
      });
      setShowConfirmModal(true);
    } else {
      setEditingService(null);
    }
  };

  const handleDelete = async () => {
    if (!editingService) return;

    // Always show confirmation for delete (it's a destructive action)
    setConfirmModalConfig({
      title: 'Delete service?',
      message: 'Are you sure you want to delete this service and all its pricing options? This action cannot be undone.',
      onConfirm: async () => {
        // Update local state to remove the service
        setSavedServices(savedServices.filter(s => s.id !== editingService.id));
        setEditingService(null);
        setShowConfirmModal(false);
        try {
          if (onDelete && editingService.id) {
            // Server action deletes from database
            await onDelete(editingService.id);
          }

        } catch (error) {
          console.error('Failed to delete service:', error);
          alert('Failed to delete service. Please try again.');
        }
      },
    });
    setShowConfirmModal(true);
  };

  const isEditing = editingService !== null;

  return (
    <>
      {/* Overlay when editing - WANT TO CHANGE - MAYBE RESTRICT SCROLL? */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title={confirmModalConfig.title}
        message={confirmModalConfig.message}
        confirmText="Delete"
        cancelText="Keep Editing"
        onConfirm={confirmModalConfig.onConfirm}
        onCancel={() => setShowConfirmModal(false)}
      />

      <div className={`space-y-4 ${isEditing && !showConfirmModal ? 'relative z-50' : ''}`}>
        {/* Saved Services List */}
        {savedServices.map((service) => {
          const isThisServiceEditing = editingService?.id === service.id;

          return (
            <div key={service.id || service.type}>
              {/* Saved Service Display */}
              {!isThisServiceEditing && (
                <div className="border-2 border-[#9185FF] rounded-lg p-4 bg-[#E4E1FF]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-800 font-semibold text-lg">{service.type}</h3>
                    <button
                      onClick={() => handleEditService(service)}
                      disabled={isEditing}
                      className="ml-4 text-sm text-[#9185FF] hover:text-[#5B4FC6] disabled:opacity-50 flex-shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Only show content box if there's something to display */}
                  {(service.description || service.menu_items.length > 0) && (
                    <div className="mt-2">
                      {service.description && (
                        <p className="text-sm text-gray-800 mb-2">{service.description}</p>
                      )}
                      {service.menu_items.length > 0 && (
                        <div className="space-y-1">
                          {service.menu_items.map((item, idx) => (
                            <div key={item.id || idx} className="flex justify-between text-sm">
                              <span className="text-gray-800">
                                {item.name}
                                {item.is_add_on_only && (
                                  <span className="ml-2 text-xs text-[#9185FF]">(Add-on only)</span>
                                )}
                              </span>
                              {item.price && (
                                <span className="font-medium text-gray-800">${item.price}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Edit Mode for current service (saved or new) */}
        {editingService && (
          <div className="bg-white p-6 rounded-lg border-2 border-purple-300 space-y-4">
                  {/* Service Type Header */}
                  <div className="flex items-center justify-between mb-4">
                    <textarea
                      value={editingService.type}
                      onChange={(e) => updateServiceType(e.target.value)}
                      placeholder=""
                      className="w-xl px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9185FF] resize-none"
                      rows={1}
                    />
                    {editingService.id && (
                      <button
                        onClick={handleDelete}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Description (optional)
                    </label>
                    <textarea
                      value={editingService.description || ''}
                      onChange={(e) => updateDescription(e.target.value)}
                      placeholder="E.g. Solo walks around the city, with park play included by request"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9185FF] resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Pricing by service */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Pricing by service (optional)
                    </label>

                    {editingService.menu_items.map((item, index) => (
                      <div key={index} className="mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                            placeholder="E.g. 20-minute walk"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9185FF]"
                          />
                          <div className="relative w-24">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              $
                            </span>
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => updateMenuItem(index, 'price', e.target.value)}
                              placeholder=""
                              className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9185FF]"
                            />
                          </div>
                          {/* Remove button */}
                          <button
                            onClick={() => removeMenuItem(index)}
                            className="w-8 h-8 flex items-center justify-center text-white bg-red-500 rounded hover:bg-red-600 text-lg font-bold flex-shrink-0"
                          >
                            ×
                          </button>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`addon-${index}`}
                            checked={item.is_add_on_only}
                            onChange={(e) => updateMenuItem(index, 'is_add_on_only', e.target.checked)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <label
                            htmlFor={`addon-${index}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            Available as add-on only
                          </label>
                        </div>
                      </div>
                    ))}

                    {/* Add another service option button */}
                    <button
                      onClick={addMenuItem}
                      disabled={!canAddMenuItem()}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-[#E4E1FF] transition-colors w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-lg">⊕</span>
                      <span>Add another service option</span>
                    </button>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-3 bg-[#9185FF] text-white rounded-lg hover:bg-[#5B4FC6] transition-colors font-medium"
                    >
                      Save
                    </button>
                  </div>
          </div>
        )}

        {/* Add New Service */}
        <div className="flex gap-2">
          <input
            type="text"
            value={serviceTypeInput}
            onChange={(e) => setServiceTypeInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNewService()}
            placeholder="e.g. Dog Walking, House Sitting, Pet Taxi"
            disabled={isEditing}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9185FF] disabled:opacity-50 disabled:bg-gray-100"
          />
          <button
            onClick={addNewService}
            disabled={isEditing || !serviceTypeInput.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#9185FF] text-white rounded-lg hover:bg-[#5B4FC6] transition-colors disabled:opacity-50 disabled:bg-gray-300"
          >
            <span className="text-lg">+</span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </>
  );
}
