'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { updatePersonalSection } from '@/app/actions/editor';
import { createClient } from '@/utils/supabase/client';
import * as Bytescale from "@bytescale/sdk";
import { useSaveStatus } from '@/hooks/useSaveStatus';
import PhotoUploadModal from '../PhotoUploadModal';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

interface PersonalSectionProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function PersonalSection({ config, onSaveStatusChange }: PersonalSectionProps) {
  // State managed internally
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [personalTagline, setPersonalTagline] = useState<string>('');
  const [personalBio, setPersonalBio] = useState<string>('');
  const [originalProfilePhoto, setOriginalProfilePhoto] = useState<string>('');
  const [originalPersonalTagline, setOriginalPersonalTagline] = useState<string>('');
  const [originalPersonalBio, setOriginalPersonalBio] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [profilePhotoFileToUpload, setProfilePhotoFileToUpload] = useState<File | null>(null);
  const [isProfilePhotoModalOpen, setIsProfilePhotoModalOpen] = useState(false);
  const personalSaveStatus = useSaveStatus();

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_photo_url, personal_tagline, about_me')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const photoUrl = profile.profile_photo_url || '';
        const tagline = profile.personal_tagline || '';
        const bio = profile.about_me || '';

        setProfilePhoto(photoUrl);
        setPersonalTagline(tagline);
        setPersonalBio(bio);
        setOriginalProfilePhoto(photoUrl);
        setOriginalPersonalTagline(tagline);
        setOriginalPersonalBio(bio);
      }

      setLoading(false);
    }

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if personal has unsaved changes
  const hasPersonalChanges = profilePhoto !== originalProfilePhoto ||
    personalTagline !== originalPersonalTagline ||
    personalBio !== originalPersonalBio;

  // Mark personal as unsaved when changes are detected
  useEffect(() => {
    if (hasPersonalChanges) {
      personalSaveStatus.markUnsaved();
    }
  }, [hasPersonalChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status changes to parent
  useEffect(() => {
    onSaveStatusChange?.({
      status: personalSaveStatus.status,
      lastSaved: personalSaveStatus.lastSaved
    });
  }, [personalSaveStatus.status, personalSaveStatus.lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save personal changes
  const savePersonalChanges = async () => {
    try {
      await personalSaveStatus.saveWithStatus(async () => {
        let photoUrlToSave = profilePhoto;

        // If profile photo is a base64 preview and we have a file, upload it to Bytescale first
        if (profilePhoto && profilePhoto.startsWith('data:') && profilePhotoFileToUpload) {
          const { fileUrl } = await uploadManager.upload({ data: profilePhotoFileToUpload });
          photoUrlToSave = fileUrl;
          setProfilePhoto(fileUrl); // Update with the Bytescale URL
        }

        // Update database with the Bytescale URL or existing URL
        await updatePersonalSection({
          profile_photo_url: photoUrlToSave,
          personal_tagline: personalTagline,
          bio: personalBio
        });
      });

      // Update original values after successful save
      setOriginalProfilePhoto(profilePhoto);
      setOriginalPersonalTagline(personalTagline);
      setOriginalPersonalBio(personalBio);
      setProfilePhotoFileToUpload(null); // Clear the file after successful upload
    } catch (error) {
      console.error('Failed to save personal:', error);
    }
  };

  // Cancel personal changes
  const cancelPersonalChanges = () => {
    setProfilePhoto(originalProfilePhoto);
    setPersonalTagline(originalPersonalTagline);
    setPersonalBio(originalPersonalBio);
    setProfilePhotoFileToUpload(null); // Clear any pending file upload
    personalSaveStatus.markSaved();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {config.personal.showProfilePhoto && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Profile Photo
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px',
            gap: '12px',
          }}>
            <div
              onClick={() => setIsProfilePhotoModalOpen(true)}
              style={{
                aspectRatio: '1',
                borderRadius: '8px',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
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
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  alt="Profile"
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
                    👤
                  </div>
                  <div style={{
                    padding: '8px',
                    background: 'white',
                    borderTop: '1px solid #E5E7EB',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '12px', color: '#374151', fontWeight: 500 }}>
                      Upload photo
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#374151', marginTop: '6px' }}>
            Square format recommended, max 5MB
          </div>
        </div>
      )}

      {config.personal.showTagline && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Personal Tagline
          </label>
          <input
            type="text"
            value={personalTagline}
            onChange={(e) => setPersonalTagline(e.target.value)}
            maxLength={config.personal.taglineMaxLength || 80}
            placeholder="e.g., Certified Pet Sitter since 2015"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: config.fonts.body,
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = config.colors.primary}
            onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
          />
          <div style={{
            fontSize: '13px',
            color: '#6B7280',
            marginTop: '6px',
          }}>
            {personalTagline.length}/{config.personal.taglineMaxLength || 80} characters
          </div>
        </div>
      )}

      {config.personal.showBio && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Personal Bio
          </label>
          <textarea
            value={personalBio}
            onChange={(e) => setPersonalBio(e.target.value)}
            maxLength={config.personal.bioMaxLength || 500}
            placeholder="Tell clients about yourself, your experience with animals, certifications, etc."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: config.fonts.body,
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
            {personalBio.length}/{config.personal.bioMaxLength || 500} characters
          </div>
        </div>
      )}

      {/* Save/Cancel Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '1px solid #E5E7EB'
      }}>
        <button
          onClick={savePersonalChanges}
          disabled={!hasPersonalChanges || personalSaveStatus.status === 'saving'}
          style={{
            padding: '10px 24px',
            background: hasPersonalChanges && personalSaveStatus.status !== 'saving' ? config.colors.primary : '#D1D5DB',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: hasPersonalChanges && personalSaveStatus.status !== 'saving' ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            opacity: hasPersonalChanges && personalSaveStatus.status !== 'saving' ? 1 : 0.6,
          }}
        >
          {personalSaveStatus.status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={cancelPersonalChanges}
          disabled={!hasPersonalChanges}
          style={{
            padding: '10px 24px',
            background: 'white',
            color: '#374151',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: hasPersonalChanges ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            opacity: hasPersonalChanges ? 1 : 0.6,
          }}
        >
          Cancel
        </button>
      </div>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isProfilePhotoModalOpen}
        onClose={() => setIsProfilePhotoModalOpen(false)}
        onUpload={(file, preview) => {
          setProfilePhotoFileToUpload(file);
          setProfilePhoto(preview);
          setIsProfilePhotoModalOpen(false);
        }}
        aspectRatio="1/1"
        maxSizeMB={5}
      />
    </>
  );
}
