'use client';

import Image from 'next/image';
import { Service, ServiceArea } from '@/lib/templates/types';

interface ProServicesProps {
  services: Service[];
  serviceAreas: ServiceArea[];
  profileServiceArea?: string;
}

export default function ProServices({ services, serviceAreas, profileServiceArea }: ProServicesProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <>
      <section id="services" className="section section-bg-cream">
        <div className="section-header">
          <h2>Pet Care Services</h2>
          <p>Offerings designed to meet your pet&apos;s unique needs</p>
        </div>
      <div
        className="section-container services-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {services.map((service) => {
          // Calculate price range from menu items
          const prices = service.menu_items
            ?.filter((item) => !item.is_add_on_only && item.price)
            .map((item) => parseFloat(item.price))
            .filter((price) => !isNaN(price));

          const minPrice = prices && prices.length > 0 ? Math.min(...prices) : null;
          const maxPrice = prices && prices.length > 0 ? Math.max(...prices) : null;

          const priceRange =
            minPrice && maxPrice
              ? minPrice === maxPrice
                ? `$${minPrice}`
                : `$${minPrice} - $${maxPrice}`
              : null;

          return (
            <div
              key={service.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px var(--shadow)',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
              className="service-card"
            >
              {service.photo_url && (
                <div style={{ width: '100%', aspectRatio: '1/1', background: '#ddd', position: 'relative' }}>
                  <Image
                    src={service.photo_url}
                    alt={service.type}
                    fill
                    sizes="(max-width: 968px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                    {service.type}
                  </h3>
                  {service.description && (
                    <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                      {service.description}
                    </p>
                  )}
                  {priceRange && (
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem' }}>
                      {priceRange}
                    </div>
                  )}
                  {service.menu_items && service.menu_items.length > 0 && (
                    <>
                      <ul style={{ listStyle: 'none', margin: '1.5rem 0', padding: 0 }}>
                        {service.menu_items.map((item) => (
                          <li
                            key={item.id}
                            style={{
                              padding: '0.75rem 0',
                              borderBottom: '1px solid rgba(45, 95, 79, 0.1)',
                              color: 'var(--text-light)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              gap: '1rem',
                            }}
                          >
                            <span style={{ flex: 1 }}>
                              {item.name}
                              {item.is_add_on_only && '*'}
                            </span>
                            {item.price && (
                              <span style={{ fontWeight: 600, color: 'var(--primary)', flexShrink: 0 }}>
                                ${item.price}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                      {service.menu_items.some((item) => item.is_add_on_only) && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', fontStyle: 'italic', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                          *Add-on service
                        </p>
                      )}
                    </>
                  )}
                </div>
                <a href="#contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', marginTop: '1.5rem' }}>
                  Book Service
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>

      {/* Service Areas Section */}
      {serviceAreas.length > 0 && (
        <section className="section section-bg-primary">
          <div className="section-header">
            <h2>Service Area</h2>
            <p style={{color: 'white'}}>{profileServiceArea || 'Areas we proudly serve'}</p>
          </div>
          <div className="section-container">
            <div className="service-areas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {serviceAreas.map((area) => (
                <div
                  key={area.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    padding: '2rem',
                    borderRadius: '15px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{area.name}</h4>
                  {area.description && <p style={{ color: 'white', opacity: 0.8, fontSize: '0.95rem' }}>{area.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <style jsx>{`
        @media (max-width: 968px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .service-areas-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
