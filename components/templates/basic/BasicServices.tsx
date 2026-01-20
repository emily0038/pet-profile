'use client';

import { useState } from 'react';
import { Service } from '@/lib/templates/types';

interface BasicServicesProps {
  services: Service[];
}

export default function BasicServices({ services }: BasicServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (services.length === 0) {
    return null;
  }

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="services" className="basic-services">
        <div className="basic-section-title">
          <h2>Services & Pricing</h2>
          <p>Professional pet care services tailored to your needs</p>
        </div>

        <div className="basic-services__cta">
          <button className="basic-btn" onClick={openModal}>
            See full pricing menu
          </button>
        </div>

        <div className="basic-services__grid">
          {services.map((service) => (
            <div key={service.id} className="basic-service-card">
              <h3>{service.type}</h3>
              {service.description && (
                <p className="basic-service-card__description">{service.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Modal */}
      {isModalOpen && (
        <div className="basic-modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="basic-modal__content">
            <div className="basic-modal__header">
              <button className="basic-modal__close" onClick={closeModal}>
                &times;
              </button>
              <h2>Full Pricing Menu</h2>
              <p>Comprehensive pet care services for your furry family</p>
            </div>
            <div className="basic-modal__body">
              {services.map((service) => (
                <div key={service.id} className="basic-pricing-table">
                  <h3>{service.type}</h3>
                  {service.description && (
                    <p className="basic-pricing-table__description">{service.description}</p>
                  )}
                  {service.menu_items.map((item) => (
                    <div key={item.id} className="basic-pricing-row">
                      <div className="basic-pricing-service">
                        <span>{item.name}</span>
                      </div>
                      <div className="basic-pricing-cost">{item.price}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
