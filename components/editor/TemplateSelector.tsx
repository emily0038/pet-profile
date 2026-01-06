'use client';

import { useState } from 'react';
import TemplatePreviewModal from './TemplatePreviewModal';
import AppHeader from '@/components/appHeader';

interface Template {
  id: string;
  name: string;
  description: string;
  isComingSoon?: boolean;
  previewGradient: string;
  previewUrl?: string;
}

const templates: Template[] = [
  {
    id: 'pro',
    name: 'Professional',
    description: 'Clean aesthetic with earthy tones. Communicates trust and quality care to wellness-conscious pet owners.',
    previewGradient: 'linear-gradient(135deg, #2c5f4f 0%, #1a3d31 100%)',
    previewUrl: '/preview/pro',
  },
  {
    id: 'bubbly',
    name: 'Bubbly',
    description: 'Playful design with soft pastel gradients. Perfect for sitters who want to showcase their fun, pet-loving personality.',
    previewGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffc93c 100%)',
    previewUrl: '/preview/bubbly',
  },
  {
    id: 'sleek',
    name: 'Sleek',
    description: '',
    isComingSoon: true,
    previewGradient: 'linear-gradient(135deg, #0a0a0a 0%, #333333 100%)',
    previewUrl: undefined,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: '',
    isComingSoon: true,
    previewGradient: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
    previewUrl: undefined,
  },
];

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const handlePreview = (template: Template) => {
    if (template.previewUrl) {
      setPreviewTemplate(template);
    }
  };

  const handleSelect = (templateId: string) => {
    onSelectTemplate(templateId);
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
            {templates.map((template) => (
              <div
                key={template.id}
                style={{
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  background: 'white',
                  opacity: template.isComingSoon ? 0.6 : 1,
                  pointerEvents: template.isComingSoon ? 'none' : 'auto',
                }}
                onMouseEnter={(e) => {
                  if (!template.isComingSoon) {
                    e.currentTarget.style.borderColor = '#9185FF';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(145, 133, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!template.isComingSoon) {
                    e.currentTarget.style.borderColor = '#E5E7EB';
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
                        width: '200%',
                        height: '200%',
                        border: 'none',
                        pointerEvents: 'none',
                        transform: 'scale(0.5)',
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
                      disabled={template.isComingSoon || !template.previewUrl}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: template.isComingSoon || !template.previewUrl ? 'not-allowed' : 'pointer',
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
                        if (!template.isComingSoon && template.previewUrl) {
                          e.currentTarget.style.borderColor = '#9185FF';
                          e.currentTarget.style.color = '#9185FF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!template.isComingSoon && template.previewUrl) {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.color = '#000000';
                        }
                      }}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleSelect(template.id)}
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
                      <span>{template.isComingSoon ? 'Coming Soon' : 'Select Template'}</span>
                      {!template.isComingSoon && <span>→</span>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => handleSelect(previewTemplate.id)}
        />
      )}
    </>
  );
}
