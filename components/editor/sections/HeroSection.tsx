'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { updateHeroSection } from '@/app/actions/editor';
import { createClient } from '@/utils/supabase/client';
import * as Bytescale from "@bytescale/sdk";
import { useSaveStatus } from '@/hooks/useSaveStatus';
import PhotoUploadModal from '../PhotoUploadModal';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

interface HeroSectionProps {
  config: TemplateEditorConfig;
  onStatusChange?: (status: 'complete' | 'incomplete') => void;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function HeroSection({ config, onStatusChange, onSaveStatusChange }: HeroSectionProps) {
  // State managed internally
  const [tagline, setTagline] = useState<string>('');
  const [featuredImages, setFeaturedImages] = useState<string[]>(['', '', '']);
  const [originalTagline, setOriginalTagline] = useState<string>('');
  const [originalFeaturedImages, setOriginalFeaturedImages] = useState<string[]>(['', '', '']);
  const [loading, setLoading] = useState(true);

  const [featuredImageFilesToUpload, setFeaturedImageFilesToUpload] = useState<(File | null)[]>([]);
  const [isFeaturedImageModalOpen, setIsFeaturedImageModalOpen] = useState(false);
  const [currentFeaturedImageIndex, setCurrentFeaturedImageIndex] = useState<number>(0);
  const heroSaveStatus = useSaveStatus();

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Get profile (including id and tagline)
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, tagline')
        .eq('user_id', user.id)
        .single();

      // Get hero images from gallery_photos
      const { data: heroPhotos } = await supabase
        .from('gallery_photos')
        .select('photo_url, order')
        .eq('profile_id', profile?.id)
        .eq('category', 'hero')
        .order('order', { ascending: true });

      if (profile) {
        const taglineValue = profile.tagline || '';
        const images = ['', '', ''];

        // Fill in the images based on order (order is 1-indexed, array is 0-indexed)
        if (heroPhotos) {
          heroPhotos.forEach((photo) => {
            if (photo.order >= 1 && photo.order <= 3) {
              images[photo.order - 1] = photo.photo_url;
            }
          });
        }

        setTagline(taglineValue);
        setFeaturedImages(images);
        setOriginalTagline(taglineValue);
        setOriginalFeaturedImages(images);

        // Report initial status based on saved data
        // Check if we have the required number of images filled
        const uploadedImageCount = images.filter(img => !!img).length;
        const hasRequiredImages = uploadedImageCount >= config.hero.featuredImageCount;
        const isComplete = !!taglineValue.trim() && hasRequiredImages;
        onStatusChange?.(isComplete ? 'complete' : 'incomplete');
      }

      setLoading(false);
    }

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if hero has unsaved changes
  const hasHeroChanges = tagline !== originalTagline ||
    JSON.stringify(featuredImages) !== JSON.stringify(originalFeaturedImages);

  // Mark hero as unsaved when changes are detected
  useEffect(() => {
    if (hasHeroChanges) {
      heroSaveStatus.markUnsaved();
    }
  }, [hasHeroChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status changes to parent
  useEffect(() => {
    onSaveStatusChange?.({
      status: heroSaveStatus.status,
      lastSaved: heroSaveStatus.lastSaved
    });
  }, [heroSaveStatus.status, heroSaveStatus.lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save hero changes
  const saveHeroChanges = async () => {
    try {
      let uploadedImages: string[] = [];

      await heroSaveStatus.saveWithStatus(async () => {
        const imagesToSave = [...featuredImages];

        // Upload any base64 previews to Bytescale
        for (let i = 0; i < imagesToSave.length; i++) {
          if (imagesToSave[i] && imagesToSave[i].startsWith('data:') && featuredImageFilesToUpload[i]) {
            const { fileUrl } = await uploadManager.upload({ data: featuredImageFilesToUpload[i]! });
            imagesToSave[i] = fileUrl;
          }
        }

        // Update database with Bytescale URLs
        await updateHeroSection({
          tagline: tagline,
          featured_image_1: imagesToSave[0] || undefined,
          featured_image_2: imagesToSave[1] || undefined,
          featured_image_3: imagesToSave[2] || undefined,
        });

        // Update state with actual URLs
        setFeaturedImages(imagesToSave);
        uploadedImages = imagesToSave;
      });

      // Update original values after successful save
      setOriginalTagline(tagline);
      setOriginalFeaturedImages(uploadedImages);
      setFeaturedImageFilesToUpload([]);

      // Report updated status based on saved data
      const uploadedImageCount = uploadedImages.filter(img => !!img).length;
      const hasRequiredImages = uploadedImageCount >= config.hero.featuredImageCount;
      const isComplete = !!tagline.trim() && hasRequiredImages;
      onStatusChange?.(isComplete ? 'complete' : 'incomplete');
    } catch (error) {
      console.error('Failed to save hero:', error);
    }
  };

  // Cancel hero changes
  const cancelHeroChanges = () => {
    setTagline(originalTagline);
    setFeaturedImages([...originalFeaturedImages]);
    setFeaturedImageFilesToUpload([]);
    heroSaveStatus.markSaved();
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
          Business Tagline <span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          maxLength={100}
          placeholder="Professional, loving care for your furry family members"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '15px',
            fontFamily: "'Roboto Flex', sans-serif",
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = config.colors.primary}
          onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
        />
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          marginTop: '6px',
        }}>
          {tagline.length}/100 characters
        </div>
      </div>

      {/* Featured Images */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Featured Images {config.hero.featuredImageRequired && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '8px',
        }}>
          {Array.from({ length: config.hero.featuredImageCount }).map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentFeaturedImageIndex(index);
                setIsFeaturedImageModalOpen(true);
              }}
              style={{
                aspectRatio: '1/1',
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
              {featuredImages[index] ? (
                <Image
                  src={featuredImages[index]}
                  alt={`Featured ${index + 1}`}
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
          Square images, 500x500px minimum, max 5MB each
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
          onClick={saveHeroChanges}
          disabled={!hasHeroChanges || heroSaveStatus.status === 'saving'}
          className="btn-save"
        >
          {heroSaveStatus.status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={cancelHeroChanges}
          disabled={!hasHeroChanges}
          className="btn-cancel"
        >
          Cancel
        </button>
      </div>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isFeaturedImageModalOpen}
        onClose={() => setIsFeaturedImageModalOpen(false)}
        onUpload={(file, preview) => {
          const newImages = [...featuredImages];
          newImages[currentFeaturedImageIndex] = preview;
          setFeaturedImages(newImages);

          const newFiles = [...featuredImageFilesToUpload];
          newFiles[currentFeaturedImageIndex] = file;
          setFeaturedImageFilesToUpload(newFiles);

          setIsFeaturedImageModalOpen(false);
        }}
        aspectRatio="1/1"
        maxSizeMB={5}
      />
    </>
  );
}
