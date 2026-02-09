'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getProfilePath } from '@/utils/url';
import TemplatePreviewModal from './TemplatePreviewModal';
import AppHeader from '@/components/appHeader';
import { Subscription, canUsePremiumFeatures } from '@/lib/subscription';
import { startPremiumTrial } from '@/app/actions/subscription';

interface Template {
  id: string;
  name: string;
  description: string;
  isComingSoon?: boolean;
  isPremium?: boolean;
  previewGradient: string;
  previewUrl?: string;
}

const templates: Template[] = [
  {
    id: 'pro',
    name: 'Professional',
    description: 'Clean aesthetic with earthy tones. Communicates trust and quality care to wellness-conscious pet owners.',
    previewGradient: 'linear-gradient(135deg, #2c5f4f 0%, #1a3d31 100%)',
    previewUrl: '/templates/pro/preview',
    isPremium: true,
  },
  {
    id: 'bubbly',
    name: 'Bubbly',
    description: 'Playful design with soft pastel gradients. Perfect for sitters who want to showcase their fun, pet-loving personality.',
    previewGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffc93c 100%)',
    previewUrl: '/templates/bubbly/preview',
    isPremium: true,
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Minimalist design with elegant typography. A clean, sophisticated look that lets your services speak for themselves.',
    previewGradient: 'linear-gradient(135deg, #2d3436 0%, #1a1a1a 100%)',
    previewUrl: '/templates/basic/preview',
    isPremium: false,
  },
  {
    id: 'friendly',
    name: 'Friendly',
    description: 'Warm and welcoming with circular photo frames and soft coral accents. Perfect for approachable, family-oriented pet care.',
    previewGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFF8F0 100%)',
    previewUrl: '/templates/friendly/preview',
    isPremium: true,
  },
];

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [userDomain, setUserDomain] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPremiumTemplate, setSelectedPremiumTemplate] = useState<Template | null>(null);
  const [isStartingTrial, setIsStartingTrial] = useState(false);

  const hasPremiumAccess = canUsePremiumFeatures(subscription);

  // Load user's current template and subscription
  useEffect(() => {
    async function loadUserData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Load profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('template_id, domain')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          setCurrentTemplateId(profile.template_id);
          setUserDomain(profile.domain);
        }

        // Load subscription
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (sub) {
          setSubscription(sub);
        }
      }
    }

    loadUserData();
  }, []);

  const handlePreview = (template: Template) => {
    // If this is the current template and user has a domain, go to their live page
    if (template.id === currentTemplateId && userDomain) {
      const profilePath = getProfilePath(userDomain);
      window.open(profilePath, '_blank');
    } else if (template.previewUrl) {
      setPreviewTemplate(template);
    }
  };

  const handleSelect = (template: Template) => {
    // Check if this is a premium template and user doesn't have access
    if (template.isPremium && !hasPremiumAccess) {
      setSelectedPremiumTemplate(template);
      setShowUpgradeModal(true);
      return;
    }
    onSelectTemplate(template.id);
  };

  const handleStartTrial = async () => {
    setIsStartingTrial(true);
    try {
      const result = await startPremiumTrial();
      if (result.success) {
        // Refresh subscription status
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: sub } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();
          if (sub) {
            setSubscription(sub);
          }
        }
        // Now proceed with template selection
        if (selectedPremiumTemplate) {
          onSelectTemplate(selectedPremiumTemplate.id);
        }
        setShowUpgradeModal(false);
      } else {
        alert(result.error || 'Failed to start trial');
      }
    } catch (error) {
      console.error('Failed to start trial:', error);
      alert('Failed to start trial. Please try again.');
    }
    setIsStartingTrial(false);
  };

  return (
    <>
      <div style={{ minHeight: '100vh', background: 'white' }}>
        {/* Header */}
        <AppHeader />

        {/* Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 32px' }}>
          {/* Page Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontFamily: 'Roboto Slab, serif', fontSize: '48px', fontWeight: 700, color: '#000000', marginBottom: '16px' }}>
              Choose Your Template
            </h1>
            <p style={{ fontSize: '20px', color: '#374151' }}>
              Select the perfect design for your pet sitting business
            </p>
          </div>

          {/* Template Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}>
            {templates.map((template) => {
              const isCurrentTemplate = template.id === currentTemplateId;
              return (
              <div
                key={template.id}
                style={{
                  border: isCurrentTemplate ? '3px solid #9185FF' : '2px solid #E5E7EB',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  background: 'white',
                  opacity: template.isComingSoon ? 0.6 : 1,
                  pointerEvents: template.isComingSoon ? 'none' : 'auto',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!template.isComingSoon) {
                    if (!isCurrentTemplate) {
                      e.currentTarget.style.borderColor = '#9185FF';
                    }
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(145, 133, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!template.isComingSoon) {
                    if (!isCurrentTemplate) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                    }
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Template Preview */}
                <div style={{
                  aspectRatio: '16/10',
                  background: template.previewGradient,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {template.previewUrl && !template.isComingSoon ? (
                    <iframe
                      src={template.previewUrl}
                      style={{
                        width: '300%',
                        height: '300%',
                        border: 'none',
                        pointerEvents: 'none',
                        transform: 'scale(0.333)',
                        transformOrigin: 'top left',
                      }}
                      title={`${template.name} preview`}
                    />
                  ) : (
                    <>
                      {template.isComingSoon && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(0, 0, 0, 0.8)',
                          color: 'white',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '18px',
                          zIndex: 10,
                        }}>
                          Coming Soon
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '32px',
                        fontWeight: 700,
                        fontFamily: 'Roboto Slab, serif',
                        textAlign: 'center',
                        opacity: 0.3,
                      }}>
                        {template.name.toUpperCase()}
                      </div>
                    </>
                  )}
                </div>

                {/* Badges */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 10,
                }}>
                  {template.isPremium && !hasPremiumAccess && (
                    <div style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <span>✨</span> Premium
                    </div>
                  )}
                  {isCurrentTemplate && (
                    <div style={{
                      background: '#9185FF',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}>
                      My Template
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h2 style={{ fontFamily: 'Roboto Slab, serif', fontSize: '28px', fontWeight: 700, color: '#000000', margin: 0 }}>
                      {template.name}
                    </h2>
                  </div>

                  <p style={{ fontSize: '16px', color: '#374151', marginBottom: '20px', lineHeight: 1.6 }}>
                    {template.description}
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => handlePreview(template)}
                      disabled={template.isComingSoon || (!template.previewUrl && !isCurrentTemplate)}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: (template.isComingSoon || (!template.previewUrl && !isCurrentTemplate)) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flex: 1,
                        justifyContent: 'center',
                        background: 'white',
                        color: '#000000',
                        border: '2px solid #E5E7EB',
                      }}
                      onMouseEnter={(e) => {
                        if (!template.isComingSoon && (template.previewUrl || isCurrentTemplate)) {
                          e.currentTarget.style.borderColor = '#9185FF';
                          e.currentTarget.style.color = '#9185FF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!template.isComingSoon && (template.previewUrl || isCurrentTemplate)) {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.color = '#000000';
                        }
                      }}
                    >
                      {isCurrentTemplate ? 'View Page' : 'Preview'}
                    </button>
                    <button
                      onClick={() => handleSelect(template)}
                      disabled={template.isComingSoon}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: template.isComingSoon ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flex: 1,
                        justifyContent: 'center',
                        background: template.isComingSoon ? '#E5E7EB' : '#000000',
                        color: 'white',
                        border: '2px solid ' + (template.isComingSoon ? '#E5E7EB' : '#000000'),
                      }}
                      onMouseEnter={(e) => {
                        if (!template.isComingSoon) {
                          e.currentTarget.style.background = '#1f2937';
                          e.currentTarget.style.borderColor = '#1f2937';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!template.isComingSoon) {
                          e.currentTarget.style.background = '#000000';
                          e.currentTarget.style.borderColor = '#000000';
                        }
                      }}
                    >
                      <span>{template.isComingSoon ? 'Coming Soon' : (isCurrentTemplate ? 'Edit Page' : 'Select Template')}</span>
                      {!template.isComingSoon && <span>→</span>}
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => handleSelect(previewTemplate)}
        />
      )}

      {/* Premium Upgrade Modal */}
      {showUpgradeModal && selectedPremiumTemplate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.7)',
          }}
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  marginBottom: '16px',
                }}
              >
                <span style={{ fontSize: '28px' }}>✨</span>
              </div>
              <h2 style={{ fontFamily: 'Roboto Slab, serif', fontSize: '28px', fontWeight: 700, color: '#000', marginBottom: '8px' }}>
                {selectedPremiumTemplate.name} is a Premium Template
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280' }}>
                Start your free 30-day trial to access all premium templates
              </p>
            </div>

            <div
              style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
              }}
            >
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
                Premium includes:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['All premium templates (Pro, Bubbly & more)', 'Custom domain support', 'Google Analytics integration'].map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                    <span style={{ color: '#8b5cf6' }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: '13px', color: '#9ca3af', textAlign: 'center', marginBottom: '20px' }}>
              No credit card required. You can cancel anytime.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowUpgradeModal(false)}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: 'white',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  transition: 'all 0.2s',
                }}
              >
                Maybe later
              </button>
              <button
                onClick={handleStartTrial}
                disabled={isStartingTrial}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: isStartingTrial ? 'wait' : 'pointer',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  transition: 'all 0.2s',
                  opacity: isStartingTrial ? 0.7 : 1,
                }}
              >
                {isStartingTrial ? 'Starting...' : 'Start Free Trial'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
