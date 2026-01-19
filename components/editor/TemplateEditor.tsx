'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { Profile } from '@/lib/templates/types';
import { createClient } from '@/utils/supabase/client';
import PoliciesSection from './sections/PoliciesSection';
import ReviewsSection from './sections/ReviewsSection';
import FaqsSection from './sections/FaqsSection';
import ServicesSection from './sections/ServicesSection';
import HeaderSection from './sections/HeaderSection';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import PersonalSection from './sections/PersonalSection';
import ServiceAreasSection from './sections/ServiceAreasSection';
import ContactSection from './sections/ContactSection';
import SaveStatusIndicator from './SaveStatusIndicator';
import { SaveStatus } from '@/hooks/useSaveStatus';
import AppHeader from '@/components/appHeader';

interface EditorSection {
  id: string;
  title: string;
  subtitle?: string;
  status: 'complete' | 'incomplete' | 'optional' | null;
  isExpanded: boolean;
  isRequired: boolean;
  saveStatus?: { status: SaveStatus; lastSaved: Date | null };
  hasError?: boolean; // For highlighting incomplete required sections
}

// GalleryPhoto type (matching database schema)
interface GalleryPhoto {
  id?: string;
  profile_id?: string;
  photo_url: string;
  category?: string | null;
  order: number;
  created_at?: string;
  updated_at?: string;
}

interface TemplateEditorProps {
  config: TemplateEditorConfig;
  onBack?: () => void;
  onPreview?: () => void;
  previewButtonText?: string;
}

export default function TemplateEditor({ config, onBack, onPreview, previewButtonText = 'View Page' }: TemplateEditorProps) {
  const router = useRouter();
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Gallery photos state - declared early so it can be used in useEffects
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);

  // Load profile data on mount
  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // Load user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Load user's gallery photos
      const { data: galleryPhotos } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('profile_id', profile?.id)
        .order('"order"', { ascending: true });

      setProfileData(profile);
      setGalleryPhotos(galleryPhotos || []);
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  // Update state when profileData and galleryPhotos are loaded
  useEffect(() => {
    if (!profileData) return;

    // All section data is now loaded within the individual sections
  }, [profileData, galleryPhotos]);

  // Build sections based on config
  const buildSections = (): EditorSection[] => {
    const sections: EditorSection[] = [
      {
        id: 'header',
        title: 'Header',
        subtitle: 'Logo & Business Name',
        status: null,
        isExpanded: false,
        isRequired: true, // Header is always required
      },
      {
        id: 'hero',
        title: 'Hero',
        subtitle: 'Tagline & Photos',
        status: null,
        isExpanded: false,
        isRequired: true, // Hero is always required
      },
      {
        id: 'about',
        title: 'About',
        subtitle: 'Description & Photos of Your Business',
        status: null,
        isExpanded: false,
        isRequired: true, // About is always required
      },
    ];

    if (config.personal.enabled) {
      sections.push({
        id: 'personal',
        title: 'Personal Details',
        subtitle: 'Meet the Owner',
        status: 'optional', // Personal is never required
        isExpanded: false,
        isRequired: false, // Personal is never required
      });
    }

    sections.push({
      id: 'services',
      title: 'Services',
      subtitle: 'Service Offerings & Prices',
      status: 'optional', // Services is never required
      isExpanded: false,
      isRequired: false, // Services is never required
    });

    if (config.serviceAreas.enabled) {
      sections.push({
        id: 'service-areas',
        title: 'Service Areas',
        subtitle: 'Where You Provide Services',
        status: 'optional', // Service Areas is never required
        isExpanded: false,
        isRequired: false, // Service Areas is never required
      });
    }

    sections.push({
      id: 'reviews',
      title: 'Reviews',
      subtitle: 'Testimonials from Current & Previous Clients',
      status: 'optional', // Reviews is never required
      isExpanded: false,
      isRequired: false, // Reviews is never required
    });

    sections.push({
      id: 'contact',
      title: 'Contact',
      subtitle: 'Phone Number & Email',
      status: config.contact.isRequired ? null : 'optional',
      isExpanded: false,
      isRequired: config.contact.isRequired,
    });

    if (config.faqs.enabled) {
      sections.push({
        id: 'faqs',
        title: 'FAQs',
        subtitle: 'Answering Common Questions',
        status: 'optional',
        isExpanded: false,
        isRequired: false,
      });
    }

    if (config.policies.enabled) {
      sections.push({
        id: 'policies',
        title: 'Policies',
        subtitle: 'Business Rules & Protocols',
        status: 'optional',
        isExpanded: false,
        isRequired: false,
      });
    }

    return sections;
  };

  const [sections, setSections] = useState<EditorSection[]>(buildSections());

  // Helper to update section status
  const handleSectionStatusChange = useCallback((sectionId: string, status: 'complete' | 'incomplete' | 'optional' | null) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, status } : s
    ));
  }, []);

  // Check if all required sections are complete
  const areAllRequiredSectionsComplete = () => {
    return sections
      .filter(s => s.isRequired)
      .every(s => s.status === 'complete');
  };

  // Check if any required section is incomplete
  const hasIncompleteRequiredSections = () => {
    return sections
      .filter(s => s.isRequired)
      .some(s => s.status === 'incomplete');
  };

  // Determine if button should be disabled
  const isPublishButtonDisabled = () => {
    if (previewButtonText === 'Publish') {
      return !areAllRequiredSectionsComplete();
    } else if (previewButtonText === 'View Page') {
      return hasIncompleteRequiredSections();
    }
    return false;
  };

  // Handle preview button click
  const handlePreviewClick = () => {
    if (!isPublishButtonDisabled()) {
      onPreview?.();
    }
  };

  // Helper to update section save status
  const handleSectionSaveStatusChange = useCallback((sectionId: string, saveStatus: { status: SaveStatus; lastSaved: Date | null }) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, saveStatus } : s
    ));
  }, []);

  const toggleSection = (id: string) => {
    setSections(sections.map(section =>
      section.id === id
        ? { ...section, isExpanded: !section.isExpanded }
        : section
    ));
  };

  const getStatusIcon = (status: 'complete' | 'incomplete' | 'optional' | null) => {
    if (status === null) return '';
    switch (status) {
      case 'complete': return '✓';
      case 'incomplete': return '⚠';
      case 'optional': return '○';
    }
  };

  const getStatusColor = (status: 'complete' | 'incomplete' | 'optional' | null) => {
    if (status === null) return 'transparent';
    switch (status) {
      case 'complete': return '#10B981';
      case 'incomplete': return '#FFD24C';
      case 'optional': return '#9CA3AF';
    }
  };

  // All sections have white background now, matching the reference design

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'header':
        return (
          <HeaderSection
            config={config}
            onStatusChange={(status) => handleSectionStatusChange('header', status)}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('header', saveStatus)}
          />
        );

      case 'hero':
        return (
          <HeroSection
            config={config}
            onStatusChange={(status) => handleSectionStatusChange('hero', status)}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('hero', saveStatus)}
          />
        );

      case 'about':
        return (
          <AboutSection
            config={config}
            onStatusChange={(status) => handleSectionStatusChange('about', status)}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('about', saveStatus)}
          />
        );

      case 'personal':
        return (
          <PersonalSection
            config={config}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('personal', saveStatus)}
          />
        );

      case 'services':
        return (
          <ServicesSection
            config={config}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('services', saveStatus)}
          />
        );

      case 'service-areas':
        return (
          <ServiceAreasSection
            config={config}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('service-areas', saveStatus)}
          />
        );

      case 'reviews':
        return (
          <ReviewsSection
            config={config}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('reviews', saveStatus)}
          />
        );

      case 'contact':
        return (
          <ContactSection
            config={config}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('contact', saveStatus)}
          />
        );

      case 'faqs':
        return (
          <FaqsSection
            config={config}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('faqs', saveStatus)}
          />
        );

      case 'policies':
        return (
          <PoliciesSection
            config={config}
            onSaveStatusChange={(saveStatus) => handleSectionSaveStatusChange('policies', saveStatus)}
          />
        );

      default:
        return (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#9CA3AF',
            fontSize: '14px',
          }}>
            {sectionId} section content
          </div>
        );
    }
  };

  // Show loading state while profile data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F9FAFB',
      fontFamily: config.fonts.body,
    }}>
      {/* App Header */}
      <AppHeader />

      {/* Sticky Toolbar */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: 'white',
        borderBottom: '1px solid #E5E7EB',
        zIndex: 100,
        padding: '16px 32px',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <button onClick={onBack} style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#374151',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              ←
            </button>
          </div>

          <button
            onClick={handlePreviewClick}
            disabled={isPublishButtonDisabled()}
            style={{
              padding: '10px 20px',
              background: isPublishButtonDisabled() ? '#D1D5DB' : config.colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isPublishButtonDisabled() ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              opacity: isPublishButtonDisabled() ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isPublishButtonDisabled()) {
                e.currentTarget.style.background = config.colors.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (!isPublishButtonDisabled()) {
                e.currentTarget.style.background = config.colors.primary;
              }
            }}
          >
            {previewButtonText}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '32px',
      }}>
        {sections.map((section) => (
          <div key={section.id} style={{
            background: 'white',
            borderRadius: '8px',
            marginBottom: '16px',
            overflow: 'hidden',
            border: section.hasError ? '2px solid #EF4444' : '1px solid #E5E7EB',
          }}>
            <button onClick={() => toggleSection(section.id)} style={{
              width: '100%',
              padding: '20px 24px',
              background: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: getStatusColor(section.status),
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {getStatusIcon(section.status)}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontFamily: config.fonts.heading,
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <span>
                      {section.title}
                      {section.isRequired && <span style={{ color: '#EF4444' }}> *</span>}
                    </span>
                    {section.status === 'optional' && (
                      <span style={{
                        display: 'inline-block',
                        background: '#F3F4F6',
                        color: '#6B7280',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 500,
                      }}>
                        Optional
                      </span>
                    )}
                    {section.saveStatus && (
                      <SaveStatusIndicator
                        status={section.saveStatus.status}
                      />
                    )}
                  </div>
                  {section.subtitle && (
                    <div style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      marginTop: '4px',
                    }}>
                      {section.subtitle}
                    </div>
                  )}
                </div>
              </div>
              <div style={{
                fontSize: '20px',
                color: '#6B7280',
                transform: section.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}>
                ⌄
              </div>
            </button>

            <div style={{
              display: section.isExpanded ? 'block' : 'none',
              padding: '24px',
              borderTop: '1px solid #E5E7EB',
            }}>
              {renderSectionContent(section.id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
