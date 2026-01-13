'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { updateAboutSection } from '@/app/actions/editor';
import { createClient } from '@/utils/supabase/client';
import * as Bytescale from "@bytescale/sdk";
import { useSaveStatus } from '@/hooks/useSaveStatus';
import PhotoUploadModal from '../PhotoUploadModal';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

interface AboutSectionProps {
  config: TemplateEditorConfig;
  onStatusChange?: (status: 'complete' | 'incomplete') => void;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function AboutSection({ config, onStatusChange, onSaveStatusChange }: AboutSectionProps) {
  // State managed internally
  const [businessPitch, setBusinessPitch] = useState<string>('');
  const [dayToDayImages, setDayToDayImages] = useState<string[]>(['', '', '', '', '', '']);
  const [originalBusinessPitch, setOriginalBusinessPitch] = useState<string>('');
  const [originalDayToDayImages, setOriginalDayToDayImages] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(true);

  const [dayToDayImageFilesToUpload, setDayToDayImageFilesToUpload] = useState<(File | null)[]>([]);
  const [isDayToDayImageModalOpen, setIsDayToDayImageModalOpen] = useState(false);
  const [currentDayToDayImageIndex, setCurrentDayToDayImageIndex] = useState<number>(0);
  const aboutSaveStatus = useSaveStatus();

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Get profile (including id and about_business)
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, about_business')
        .eq('user_id', user.id)
        .single();

      // Get about images from gallery_photos
      const { data: aboutPhotos } = await supabase
        .from('gallery_photos')
        .select('photo_url, order')
        .eq('profile_id', profile?.id)
        .eq('category', 'about')
        .order('order', { ascending: true });

      if (profile) {
        const businessPitchValue = profile.about_business || '';
        const images = ['', '', '', '', '', ''];

        // Fill in the images based on order (order is 1-indexed, array is 0-indexed)
        if (aboutPhotos) {
          aboutPhotos.forEach((photo) => {
            if (photo.order >= 1 && photo.order <= 6) {
              images[photo.order - 1] = photo.photo_url;
            }
          });
        }

        setBusinessPitch(businessPitchValue);
        setDayToDayImages(images);
        setOriginalBusinessPitch(businessPitchValue);
        setOriginalDayToDayImages(images);

        // Report initial status based on saved data
        // Check if we have the required number of images filled
        const uploadedImageCount = images.filter(img => !!img).length;
        const hasRequiredImages = uploadedImageCount >= config.about.dayToDayImageCount;
        const isComplete = !!businessPitchValue.trim() && hasRequiredImages;
        onStatusChange?.(isComplete ? 'complete' : 'incomplete');
      }

      setLoading(false);
    }

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if about has unsaved changes
  const hasAboutChanges = businessPitch !== originalBusinessPitch ||
    JSON.stringify(dayToDayImages) !== JSON.stringify(originalDayToDayImages);

  // Mark about as unsaved when changes are detected
  useEffect(() => {
    if (hasAboutChanges) {
      aboutSaveStatus.markUnsaved();
    }
  }, [hasAboutChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status changes to parent
  useEffect(() => {
    onSaveStatusChange?.({
      status: aboutSaveStatus.status,
      lastSaved: aboutSaveStatus.lastSaved
    });
  }, [aboutSaveStatus.status, aboutSaveStatus.lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save about changes
  const saveAboutChanges = async () => {
    try {
      let uploadedImages: string[] = [];

      await aboutSaveStatus.saveWithStatus(async () => {
        const imagesToSave = [...dayToDayImages];

        // Upload any base64 previews to Bytescale
        for (let i = 0; i < imagesToSave.length; i++) {
          if (imagesToSave[i] && imagesToSave[i].startsWith('data:') && dayToDayImageFilesToUpload[i]) {
            const { fileUrl } = await uploadManager.upload({ data: dayToDayImageFilesToUpload[i]! });
            imagesToSave[i] = fileUrl;
          }
        }

        // Update database with Bytescale URLs
        await updateAboutSection({
          business_pitch: businessPitch,
          day_to_day_image_1: imagesToSave[0] || undefined,
          day_to_day_image_2: imagesToSave[1] || undefined,
          day_to_day_image_3: imagesToSave[2] || undefined,
          day_to_day_image_4: imagesToSave[3] || undefined,
          day_to_day_image_5: imagesToSave[4] || undefined,
          day_to_day_image_6: imagesToSave[5] || undefined,
        });

        // Update state with actual URLs
        setDayToDayImages(imagesToSave);
        uploadedImages = imagesToSave;
      });

      // Update original values after successful save
      setOriginalBusinessPitch(businessPitch);
      setOriginalDayToDayImages(uploadedImages);
      setDayToDayImageFilesToUpload([]);

      // Report updated status based on saved data
      const uploadedImageCount = uploadedImages.filter(img => !!img).length;
      const hasRequiredImages = uploadedImageCount >= config.about.dayToDayImageCount;
      const isComplete = !!businessPitch.trim() && hasRequiredImages;
      onStatusChange?.(isComplete ? 'complete' : 'incomplete');
    } catch (error) {
      console.error('Failed to save about:', error);
    }
  };

  // Cancel about changes
  const cancelAboutChanges = () => {
    setBusinessPitch(originalBusinessPitch);
    setDayToDayImages([...originalDayToDayImages]);
    setDayToDayImageFilesToUpload([]);
    aboutSaveStatus.markSaved();
  };

  if (loading) {
    return <div>Loading...</div>;
  };

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
          Business Pitch <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <textarea
          value={businessPitch}
          onChange={(e) => setBusinessPitch(e.target.value)}
          placeholder="Tell visitors about your business, experience, and what makes you special..."
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
          {businessPitch.split(' ').filter((w: string) => w).length}/{config.about.pitchMaxWords} words
        </div>
      </div>

      {/* Day-to-Day Images */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Day-to-Day Images {config.about.dayToDayImageRequired && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '8px',
        }}>
          {Array.from({ length: config.about.dayToDayImageCount }).map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentDayToDayImageIndex(index);
                setIsDayToDayImageModalOpen(true);
              }}
              style={{
                aspectRatio: '4/5',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
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
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {dayToDayImages[index] ? (
                <Image
                  src={dayToDayImages[index]}
                  alt={`Day-to-Day ${index + 1}`}
                  width={400}
                  height={400}
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
                      Upload image
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '13px', color: '#374151', marginTop: '6px' }}>
          4:5 ratio recommended (400x500px min), max 5MB each
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
          onClick={saveAboutChanges}
          disabled={!hasAboutChanges || aboutSaveStatus.status === 'saving'}
          className="btn-save"
        >
          {aboutSaveStatus.status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={cancelAboutChanges}
          disabled={!hasAboutChanges}
          className="btn-cancel"
        >
          Cancel
        </button>
      </div>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isDayToDayImageModalOpen}
        onClose={() => setIsDayToDayImageModalOpen(false)}
        onUpload={(file, preview) => {
          const newImages = [...dayToDayImages];
          newImages[currentDayToDayImageIndex] = preview;
          setDayToDayImages(newImages);

          const newFiles = [...dayToDayImageFilesToUpload];
          newFiles[currentDayToDayImageIndex] = file;
          setDayToDayImageFilesToUpload(newFiles);

          setIsDayToDayImageModalOpen(false);
        }}
        aspectRatio="4/5"
        maxSizeMB={5}
      />
    </>
  );
}
