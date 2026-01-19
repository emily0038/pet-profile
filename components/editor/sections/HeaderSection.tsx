'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { updateHeaderSection } from '@/app/actions/editor';
import { createClient } from '@/utils/supabase/client';
import * as Bytescale from "@bytescale/sdk";
import { useSaveStatus } from '@/hooks/useSaveStatus';
import PhotoUploadModal from '../PhotoUploadModal';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

interface HeaderSectionProps {
  config: TemplateEditorConfig;
  onStatusChange?: (status: 'complete' | 'incomplete') => void;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function HeaderSection({ config, onStatusChange, onSaveStatusChange }: HeaderSectionProps) {
  // State managed internally
  const [logo, setLogo] = useState<string>('');
  const [businessNameField, setBusinessNameField] = useState<string>('');
  const [originalLogo, setOriginalLogo] = useState<string>('');
  const [originalBusinessName, setOriginalBusinessName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [logoFileToUpload, setLogoFileToUpload] = useState<File | null>(null);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const headerSaveStatus = useSaveStatus();

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('logo_url, business_name')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const logoUrl = profile.logo_url || '';
        const businessName = profile.business_name || '';

        setLogo(logoUrl);
        setBusinessNameField(businessName);
        setOriginalLogo(logoUrl);
        setOriginalBusinessName(businessName);

        // Report initial status based on saved data
        const isComplete = !!logoUrl && !!businessName.trim();
        onStatusChange?.(isComplete ? 'complete' : 'incomplete');
      }

      setLoading(false);
    }

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if header has unsaved changes
  const hasHeaderChanges = logo !== originalLogo || businessNameField !== originalBusinessName;

  // Mark header as unsaved when changes are detected
  useEffect(() => {
    if (hasHeaderChanges) {
      headerSaveStatus.markUnsaved();
    }
  }, [hasHeaderChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status changes to parent
  useEffect(() => {
    onSaveStatusChange?.({
      status: headerSaveStatus.status,
      lastSaved: headerSaveStatus.lastSaved
    });
  }, [headerSaveStatus.status, headerSaveStatus.lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save header changes
  const saveHeaderChanges = async () => {
    try {
      await headerSaveStatus.saveWithStatus(async () => {
        let logoUrlToSave = logo;

        // If logo is a base64 preview (starts with 'data:') and we have a file, upload it to Bytescale first
        if (logo && logo.startsWith('data:') && logoFileToUpload) {
          const { fileUrl } = await uploadManager.upload({ data: logoFileToUpload });
          logoUrlToSave = fileUrl;
          setLogo(fileUrl); // Update with the Bytescale URL
        }

        // Update database with the Bytescale URL or existing URL
        await updateHeaderSection({
          logo_url: logoUrlToSave,
          business_name: businessNameField
        });
      });
      // Update original values after successful save
      setOriginalLogo(logo);
      setOriginalBusinessName(businessNameField);
      setLogoFileToUpload(null); // Clear the file after successful upload

      // Report updated status based on saved data
      const isComplete = !!logo && !!businessNameField.trim();
      onStatusChange?.(isComplete ? 'complete' : 'incomplete');
    } catch (error) {
      console.error('Failed to save header:', error);
    }
  };

  // Cancel header changes
  const cancelHeaderChanges = () => {
    setLogo(originalLogo);
    setBusinessNameField(originalBusinessName);
    setLogoFileToUpload(null); // Clear any pending file upload
    headerSaveStatus.markSaved();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Logo
        </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px',
            gap: '12px',
          }}>
            <div
              onClick={() => setIsLogoModalOpen(true)}
              style={{
                aspectRatio: '1',
                borderRadius: '8px',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {logo ? (
                <Image
                  src={logo}
                  alt="Logo"
                  width={200}
                  height={200}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <>
                  <div style={{
                    flex: 1,
                    background: '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    height: '150px',
                  }}>
                    📷
                  </div>
                  <div style={{
                    padding: '8px',
                    background: 'white',
                    borderTop: '1px solid #E5E7EB',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '12px', color: '#374151', fontWeight: 500 }}>
                      Upload logo
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#374151', marginTop: '6px' }}>
            PNG, SVG, or JPG. Max 2MB. Recommended 500x500px
          </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Business Name <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          type="text"
          value={businessNameField}
          onChange={(e) => setBusinessNameField(e.target.value)}
          maxLength={50}
          placeholder="Emily's Pet Sitting"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '15px',
            fontFamily: config.fonts.body,
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = config.colors.primary}
          onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
        />
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          marginTop: '6px',
        }}>
          {businessNameField.length}/50 characters
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '1px solid #E5E7EB'
      }}>
        <button
          onClick={saveHeaderChanges}
          disabled={!hasHeaderChanges || headerSaveStatus.status === 'saving'}
          className="btn-save"
        >
          {headerSaveStatus.status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={cancelHeaderChanges}
          disabled={!hasHeaderChanges}
          className="btn-cancel"
        >
          Cancel
        </button>
      </div>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        onUpload={(file, preview) => {
          setLogoFileToUpload(file);
          setLogo(preview);
          setIsLogoModalOpen(false);
        }}
        aspectRatio="1/1"
        maxSizeMB={2}
      />
    </>
  );
}
