'use client';

import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { createClient } from '@/utils/supabase/client';
import * as Bytescale from "@bytescale/sdk";
import { saveService, deleteService } from '@/app/actions/editor';
import PhotoUploadModal from '../PhotoUploadModal';
import styles from '../editor.module.css';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

// Service types (matching database schema)
interface ServiceMenuItem {
  id?: string;
  service_id?: string;
  name: string;
  price: string;
  is_add_on_only: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ServiceWithItems {
  id?: string;
  profile_id?: string;
  type: string;
  description?: string;
  photo_url?: string;
  created_at?: string;
  updated_at?: string;
  menu_items: ServiceMenuItem[];
}

interface ServicesSectionProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function ServicesSection({
  config,
  onSaveStatusChange
}: ServicesSectionProps) {
  const [savedServices, setSavedServices] = useState<ServiceWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceWithItems | null>(null);
  const [serviceTypeInput, setServiceTypeInput] = useState('');
  const [servicePhotoFileToUpload, setServicePhotoFileToUpload] = useState<File | null>(null);
  const [servicePhotoPreviewUrl, setServicePhotoPreviewUrl] = useState<string | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const isEditingService = editingService !== null;

  // Load services on mount
  useEffect(() => {
    async function loadServices() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Get profile id
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        setLoading(false);
        return;
      }

      // Get services
      const { data: services } = await supabase
        .from('services')
        .select('*')
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: true });

      if (services) {
        // Get menu items for each service
        const servicesWithItems = await Promise.all(
          services.map(async (service) => {
            const { data: menuItems } = await supabase
              .from('service_menu_items')
              .select('*')
              .eq('service_id', service.id)
              .order('created_at', { ascending: true });

            return {
              ...service,
              menu_items: menuItems || []
            };
          })
        );

        setSavedServices(servicesWithItems);
      }

      setLoading(false);
    }

    loadServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status (services save immediately, so always 'saved')
  useEffect(() => {
    onSaveStatusChange?.({
      status: 'saved',
      lastSaved: null
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addNewService = () => {
    if (!serviceTypeInput.trim()) return;

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

  const handleEditService = (service: ServiceWithItems) => {
    setEditingService({ ...service });
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
          { name: '', price: '', is_add_on_only: false },
        ],
      });
    }
  };

  const updateMenuItem = (index: number, field: keyof ServiceMenuItem, value: string | boolean) => {
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
    const newMenuItems = [...editingService.menu_items];
    newMenuItems.splice(index, 1);
    setEditingService({
      ...editingService,
      menu_items: newMenuItems,
    });
  };

  const canAddMenuItem = (): boolean => {
    if (!editingService || editingService.menu_items.length === 0) return true;
    const lastItem = editingService.menu_items[editingService.menu_items.length - 1];
    return lastItem.name.trim() !== '';
  };

  const handleSaveService = async () => {
    if (!editingService) return;

    const duplicateExists = savedServices.some(s =>
      s.id !== editingService.id &&
      s.type.toLowerCase() === editingService.type.trim().toLowerCase()
    );

    if (duplicateExists) {
      alert('A service with this name already exists. Please choose a different name.');
      return;
    }

    try {
      let photoUrl = editingService.photo_url;

      // Upload photo to Bytescale if there's a new file
      if (servicePhotoFileToUpload) {
        const { fileUrl } = await uploadManager.upload({ data: servicePhotoFileToUpload });
        photoUrl = fileUrl;
      }

      // Update the service with the photo URL
      const serviceToSave = { ...editingService, photo_url: photoUrl };

      // Save to database
      await saveService(serviceToSave);

      const existingIndex = savedServices.findIndex(s => s.id === editingService.id);

      if (existingIndex >= 0) {
        const newSavedServices = [...savedServices];
        newSavedServices[existingIndex] = serviceToSave;
        setSavedServices(newSavedServices);
      } else {
        setSavedServices([...savedServices, serviceToSave]);
      }

      setEditingService(null);
      setServicePhotoFileToUpload(null);
      setServicePhotoPreviewUrl(null);
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Failed to save service. Please try again.');
    }
  };

  const handleCancelService = () => {
    setEditingService(null);
    setServicePhotoFileToUpload(null);
    setServicePhotoPreviewUrl(null);
  };

  const handleDeleteService = async () => {
    if (!editingService?.id) return;

    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(editingService.id);
        setSavedServices(savedServices.filter(s => s.id !== editingService.id));
        setEditingService(null);
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderEditForm = () => (
    <>
      {/* Category Photo */}
      <div className={styles.field}>
        <label className={styles.label}>Category Photo</label>
        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
          {editingService?.photo_url || servicePhotoPreviewUrl ? '1/1 uploaded' : 'Optional. Square format, max 4MB'}
        </div>
        <div
          onClick={() => setIsPhotoModalOpen(true)}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '12px',
            backgroundColor: (editingService?.photo_url || servicePhotoPreviewUrl) ? '#F3F4F6' : 'white',
            border: '2px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'all 0.2s',
            backgroundImage: editingService?.photo_url && !servicePhotoPreviewUrl ? `url(${editingService.photo_url})` :
                           servicePhotoPreviewUrl ? `url(${servicePhotoPreviewUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = config.colors.primary;
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {!editingService?.photo_url && !servicePhotoPreviewUrl && (
            <span style={{ fontSize: '80px' }}>📷</span>
          )}
        </div>
      </div>

      {/* Service Type Header with Delete */}
      <div className={styles.field}>
        <label className={styles.label}>Category Name</label>
        <input
          type="text"
          value={editingService?.type || ''}
          onChange={(e) => updateServiceType(e.target.value)}
          className={styles.input}
          style={{ fontFamily: config.fonts.body }}
        />
        {editingService?.id && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              onClick={handleDeleteService}
              style={{
                background: 'none',
                border: 'none',
                color: '#EF4444',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label className={styles.label}>Description (optional)</label>
        <textarea
          value={editingService?.description || ''}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="Describe this service category..."
          rows={3}
          className={styles.textarea}
          style={{ fontFamily: config.fonts.body }}
        />
      </div>

      {/* Pricing by service */}
      <div>
        <label className={styles.label}>Pricing by service (optional)</label>

        {editingService?.menu_items.map((item, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: '12px',
              alignItems: 'end',
            }}>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                placeholder="e.g., 20-min walk"
                className={styles.input}
                style={{ fontFamily: config.fonts.body }}
              />
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6B7280',
                  fontSize: '15px',
                }}>
                  $
                </span>
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => updateMenuItem(index, 'price', e.target.value)}
                  placeholder=""
                  className={styles.input}
                  style={{
                    paddingLeft: '28px',
                    width: '80px',
                    fontFamily: config.fonts.body
                  }}
                />
              </div>
              <button
                onClick={() => removeMenuItem(index)}
                style={{
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}
              >
                ×
              </button>
            </div>
            <div className={styles.checkboxField} style={{ marginTop: '8px' }}>
              <input
                type="checkbox"
                checked={item.is_add_on_only}
                onChange={(e) => updateMenuItem(index, 'is_add_on_only', e.target.checked)}
                className={styles.checkbox}
              />
              <label className={styles.checkboxLabel}>Available as add-on only</label>
            </div>
          </div>
        ))}

        <button
          onClick={addMenuItem}
          disabled={!canAddMenuItem()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#6B7280',
            fontSize: '15px',
            fontWeight: 600,
            cursor: canAddMenuItem() ? 'pointer' : 'not-allowed',
            padding: '12px 0',
            opacity: canAddMenuItem() ? 1 : 0.5,
          }}
        >
          <span style={{ fontSize: '20px' }}>⊕</span>
          <span>Add another service option</span>
        </button>
      </div>

      {/* Action buttons */}
      <div className={styles.buttonGroup} style={{ marginTop: '32px' }}>
        <button onClick={handleCancelService} className="btn-cancel">
          Cancel
        </button>
        <button
          onClick={handleSaveService}
          className="btn-save"
        >
          Save
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.sectionDescription}>
        List the services you provide with pricing options
      </div>

      {/* Saved Services List with inline editing */}
      <div className={styles.itemList} style={{ marginBottom: '20px' }}>
        {savedServices.map((service) => {
          const isThisServiceEditing = editingService?.id === service.id;

          // If this service is being edited, show the edit form in place
          if (isThisServiceEditing && editingService) {
            return (
              <div
                key={service.id || service.type}
                className={styles.editCard}
                style={{
                  borderColor: config.colors.primary,
                  padding: '24px'
                }}
              >
                {renderEditForm()}
              </div>
            );
          }

          // Otherwise show the service card
          return (
            <div
              key={service.id || service.type}
              style={{
                padding: '20px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                background: 'white',
                display: 'flex',
                gap: '16px',
              }}
            >
              {/* Photo thumbnail */}
              {service.photo_url && (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundImage: `url(${service.photo_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid #E5E7EB',
                }} />
              )}

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: service.description || service.menu_items.length > 0 ? '12px' : '0',
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000',
                  }}>
                    {service.type}
                  </div>
                  <button
                    onClick={() => handleEditService(service)}
                    disabled={isEditingService}
                    className={styles.editButton}
                    style={{ color: config.colors.primary }}
                  >
                    Edit
                  </button>
                </div>

              {service.description && (
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginBottom: '16px',
                  lineHeight: '1.6',
                }}>
                  {service.description}
                </p>
              )}

              {service.menu_items.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {service.menu_items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '14px',
                      }}
                    >
                      <span style={{ color: '#000' }}>
                        {item.name}
                        {item.is_add_on_only && (
                          <span style={{
                            marginLeft: '8px',
                            color: config.colors.primary,
                            fontSize: '13px',
                          }}>
                            (Add-on only)
                          </span>
                        )}
                      </span>
                      {item.price && (
                        <span style={{ fontWeight: 600, color: '#000' }}>${item.price}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit form for new service (no ID yet) */}
      {editingService && !editingService.id && (
        <div
          className={styles.editCard}
          style={{
            borderColor: config.colors.primary,
            marginBottom: '20px',
            padding: '24px'
          }}
        >
          {renderEditForm()}
        </div>
      )}

      {/* Add New Service */}
      <div style={{
        padding: '20px',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        background: 'white',
      }}>
        <input
          type="text"
          value={serviceTypeInput}
          onChange={(e) => setServiceTypeInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNewService()}
          placeholder="e.g. Dog Walking, House Sitting, Pet Taxi"
          disabled={isEditingService}
          className={styles.input}
          style={{
            fontFamily: config.fonts.body,
            marginBottom: '12px',
            opacity: isEditingService ? 0.5 : 1,
          }}
        />
        <button
          onClick={addNewService}
          disabled={isEditingService || !serviceTypeInput.trim()}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: config.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: (isEditingService || !serviceTypeInput.trim()) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: (isEditingService || !serviceTypeInput.trim()) ? 0.5 : 1,
          }}
        >
          <span style={{ fontSize: '18px' }}>+</span>
          <span>Add</span>
        </button>
      </div>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onUpload={(file, preview) => {
          setServicePhotoFileToUpload(file);
          setServicePhotoPreviewUrl(preview);
          setIsPhotoModalOpen(false);
        }}
        aspectRatio="1/1"
        maxSizeMB={4}
      />
    </>
  );
}
