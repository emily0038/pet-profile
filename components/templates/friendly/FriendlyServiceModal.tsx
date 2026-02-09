'use client';

import { Service } from '@/lib/templates/types';
import { useEffect } from 'react';

interface FriendlyServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  businessName?: string;
}

export default function FriendlyServiceModal({
  isOpen,
  onClose,
  services,
  businessName
}: FriendlyServiceModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="friendly-modal-overlay"
      onClick={onClose}
    >
      <div
        className="friendly-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="friendly-modal-header">
          <button className="friendly-modal-close" onClick={onClose}>
            &times;
          </button>
          <h2 className="text-white">Full Service Menu</h2>
          <p className="text-white">Comprehensive pet care services{businessName ? ` from ${businessName}` : ''}</p>
        </div>
        <div className="friendly-modal-body">
          {services.map((service) => (
            <div key={service.id} className="friendly-pricing-table">
              <h3>{service.type}</h3>
              {service.description && (
                <p className="friendly-pricing-description">{service.description}</p>
              )}
              {service.menu_items && service.menu_items.length > 0 ? (
                service.menu_items.map((item, idx) => (
                  <div key={item.id || idx} className="friendly-pricing-row">
                    <div className="friendly-pricing-service">
                      <h4>
                        {item.name}
                        {item.is_add_on_only && (
                          <span className="friendly-addon-badge">Add-on</span>
                        )}
                      </h4>
                    </div>
                    <div className="friendly-pricing-cost">
                      {item.price ? `$${item.price}` : 'Contact for pricing'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="friendly-pricing-row">
                  <div className="friendly-pricing-service">
                    <h4>Contact for details</h4>
                  </div>
                  <div className="friendly-pricing-cost">-</div>
                </div>
              )}
            </div>
          ))}
          <p className="friendly-pricing-note">
            All prices are subject to change. Contact us for custom packages and multiple pet discounts.
          </p>
        </div>
      </div>
    </div>
  );
}
