'use client';

import { useState } from 'react';
import { Service } from '@/lib/templates/types';
import Image from 'next/image';
import FriendlyServiceModal from './FriendlyServiceModal';

interface FriendlyServicesProps {
  services: Service[];
  businessName?: string;
}

export default function FriendlyServices({ services, businessName }: FriendlyServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!services || services.length === 0) return null;

  // Get price range for a service
  const getPriceDisplay = (service: Service) => {
    if (!service.menu_items || service.menu_items.length === 0) {
      return 'Contact for pricing';
    }

    const prices = service.menu_items
      .filter(item => item.price && !item.is_add_on_only)
      .map(item => {
        const numPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return isNaN(numPrice) ? 0 : numPrice;
      })
      .filter(p => p > 0);

    if (prices.length === 0) {
      return 'Contact for pricing';
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (minPrice === maxPrice) {
      return `$${minPrice}`;
    }
    return `$${minPrice}-$${maxPrice}`;
  };

  // Background colors for service circles
  const bgColors = ['#FFE5E5', '#E8F5E9', '#E5F0FF', '#FFF5E5', '#F5E5FF', '#E5FFF5'];

  return (
    <section id="services" className="friendly-services">
      <div className="friendly-services-header">
        <h2>Services &amp; Pricing</h2>
        <p>Professional pet care services tailored to your needs</p>
        <button
          className="friendly-full-menu-btn"
          onClick={() => setIsModalOpen(true)}
        >
          See Full Service Menu
        </button>
      </div>
      <div className="friendly-services-grid">
        {services.map((service, index) => (
          <div key={service.id} className="friendly-service-item">
            <div
              className="friendly-service-image"
              style={{ background: bgColors[index % bgColors.length] }}
            >
              {service.photo_url ? (
                <Image
                  src={service.photo_url}
                  alt={service.type}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="250px"
                />
              ) : (
                <span style={{ fontSize: '60px' }}>🐾</span>
              )}
            </div>
            <div className="friendly-service-content">
              <h3>{service.type}</h3>
              {service.description && (
                <p>{service.description}</p>
              )}
              <p className="friendly-service-price">{getPriceDisplay(service)}</p>
              <a href="#contact" className="friendly-service-link">Book Service</a>
            </div>
          </div>
        ))}
      </div>

      <FriendlyServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
        businessName={businessName}
      />
    </section>
  );
}
