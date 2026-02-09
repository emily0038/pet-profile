'use client';

import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { createClient } from '@/utils/supabase/client';
import { updateServiceAreasSection } from '@/app/actions/editor';
import { useSaveStatus } from '@/hooks/useSaveStatus';

interface ServiceAreasProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function ServiceAreasSection({
  config,
  onSaveStatusChange
}: ServiceAreasProps) {
  const [serviceAreaDescription, setServiceAreaDescription] = useState('');
  const [serviceAreas, setServiceAreas] = useState<Array<{name: string, description: string}>>([{ name: '', description: '' }]);
  const [originalServiceAreaDescription, setOriginalServiceAreaDescription] = useState('');
  const [originalServiceAreas, setOriginalServiceAreas] = useState<Array<{name: string, description: string}>>([{ name: '', description: '' }]);
  const [loading, setLoading] = useState(true);

  const serviceAreasSaveStatus = useSaveStatus();

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id, service_area')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const serviceAreaText = profile.service_area || '';
        setServiceAreaDescription(serviceAreaText);
        setOriginalServiceAreaDescription(serviceAreaText);

        // Load service areas from table
        const { data: serviceAreasData } = await supabase
          .from('service_areas')
          .select('*')
          .eq('profile_id', profile.id)
          .order('"order"', { ascending: true });

        if (serviceAreasData && serviceAreasData.length > 0) {
          const areas = serviceAreasData.map(area => ({
            name: area.name || '',
            description: area.description || ''
          }));
          setServiceAreas(areas);
          setOriginalServiceAreas(areas);
        } else {
          // Initialize with one empty area if no data
          setServiceAreas([{ name: '', description: '' }]);
          setOriginalServiceAreas([{ name: '', description: '' }]);
        }
      }

      setLoading(false);
    }

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if service areas has unsaved changes
  const hasServiceAreasChanges = serviceAreaDescription !== originalServiceAreaDescription ||
    JSON.stringify(serviceAreas) !== JSON.stringify(originalServiceAreas);

  // Mark service areas as unsaved when changes are detected
  useEffect(() => {
    if (hasServiceAreasChanges) {
      serviceAreasSaveStatus.markUnsaved();
    }
  }, [hasServiceAreasChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status changes to parent
  useEffect(() => {
    onSaveStatusChange?.({
      status: serviceAreasSaveStatus.status,
      lastSaved: serviceAreasSaveStatus.lastSaved
    });
  }, [serviceAreasSaveStatus.status, serviceAreasSaveStatus.lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save service areas changes
  const saveServiceAreasChanges = async () => {
    try {
      await serviceAreasSaveStatus.saveWithStatus(async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error('Not authenticated');

        // Get profile id
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!profile) throw new Error('Profile not found');

        // Save to service_area field as a simple text field
        // Combines description or area names into a comma-separated string
        const areasText = serviceAreaDescription || serviceAreas
          .filter(area => area.name.trim() !== '')
          .map(area => area.name)
          .join(', ');

        await updateServiceAreasSection({
          service_area: areasText
        });

        // Delete all existing service areas
        await supabase
          .from('service_areas')
          .delete()
          .eq('profile_id', profile.id);

        // Insert new service areas (only non-empty ones)
        const areasToInsert = serviceAreas
          .filter(area => area.name.trim() !== '')
          .map((area, index) => ({
            profile_id: profile.id,
            name: area.name,
            description: area.description,
            order: index + 1
          }));

        if (areasToInsert.length > 0) {
          await supabase
            .from('service_areas')
            .insert(areasToInsert);
        }
      });

      // Update original values after successful save
      setOriginalServiceAreaDescription(serviceAreaDescription);
      setOriginalServiceAreas([...serviceAreas]);
    } catch (error) {
      console.error('Failed to save service areas:', error);
    }
  };

  // Cancel service areas changes
  const cancelServiceAreasChanges = () => {
    setServiceAreaDescription(originalServiceAreaDescription);
    setServiceAreas([...originalServiceAreas]);
    serviceAreasSaveStatus.markSaved();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {config.serviceAreas.showDescription && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Description
          </label>
          <textarea
            value={serviceAreaDescription}
            onChange={(e) => setServiceAreaDescription(e.target.value)}
            maxLength={200}
            placeholder="Describe the general area you serve..."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: "'Roboto Flex', sans-serif",
              minHeight: '100px',
              resize: 'vertical',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = config.colors.primary}
            onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
          />
          <div style={{
            fontSize: '13px',
            color: '#6B7280',
            marginTop: '6px',
          }}>
            {serviceAreaDescription.length}/200 characters
          </div>
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Areas
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
          {serviceAreas.map((area, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: '12px',
              alignItems: 'end',
              padding: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              background: '#F9FAFB',
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#000000',
                  marginBottom: '6px',
                }}>
                  Neighborhood
                </label>
                <input
                  type="text"
                  value={area.name}
                  onChange={(e) => {
                    const newAreas = [...serviceAreas];
                    newAreas[index].name = e.target.value;
                    setServiceAreas(newAreas);
                  }}
                  placeholder="e.g., Downtown"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontFamily: "'Roboto Flex', sans-serif",
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#000000',
                  marginBottom: '6px',
                }}>
                  Description
                </label>
                <input
                  type="text"
                  value={area.description}
                  onChange={(e) => {
                    const newAreas = [...serviceAreas];
                    newAreas[index].description = e.target.value;
                    setServiceAreas(newAreas);
                  }}
                  placeholder="e.g., Portland"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontFamily: "'Roboto Flex', sans-serif",
                  }}
                />
              </div>
              <button style={{
                padding: '8px 12px',
                background: 'white',
                color: '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => {
                const newAreas = serviceAreas.filter((_, i) => i !== index);
                setServiceAreas(newAreas);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#EF4444';
                e.currentTarget.style.color = '#EF4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.color = '#374151';
              }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button style={{
          width: '100%',
          padding: '16px 24px',
          background: 'white',
          color: config.colors.primary,
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
        onClick={() => {
          setServiceAreas([...serviceAreas, { name: '', description: '' }]);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = config.colors.primary;
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(145, 133, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E5E7EB';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
          <span style={{ fontSize: '18px' }}>+</span>
          <span>Add Another Area</span>
        </button>
      </div>

      {/* Conditional Save/Cancel buttons */}
      {hasServiceAreasChanges && (
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
        }}>
          <button
            onClick={cancelServiceAreasChanges}
            className="btn-cancel"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
          <button
            onClick={saveServiceAreasChanges}
            className="btn-save"
            style={{ flex: 1 }}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}
