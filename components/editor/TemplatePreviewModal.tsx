'use client';

import { useEffect } from 'react';

interface Template {
  id: string;
  name: string;
  previewUrl?: string;
}

interface TemplatePreviewModalProps {
  template: Template;
  onClose: () => void;
  onSelect: () => void;
}

export default function TemplatePreviewModal({ template, onClose, onSelect }: TemplatePreviewModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '1400px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            fontFamily: 'Roboto Slab, serif',
            fontSize: '24px',
            fontWeight: 700,
            color: '#000000',
            margin: 0,
          }}>
            {template.name} Template Preview
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#374151',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            ×
          </button>
        </div>

        {/* Modal Content - Scrollable Iframe */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          background: '#F9FAFB',
          position: 'relative',
        }}>
          {template.previewUrl ? (
            <iframe
              src={template.previewUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title={`${template.name} Template Preview`}
            />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#374151',
              fontSize: '18px',
            }}>
              Preview not available
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: 'white',
              color: '#000000',
              border: '2px solid #E5E7EB',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#9185FF';
              e.currentTarget.style.color = '#9185FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#000000';
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelect();
              onClose();
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: '#000000',
              color: 'white',
              border: '2px solid #000000',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1f2937';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.borderColor = '#000000';
            }}
          >
            <span>Select Template</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
