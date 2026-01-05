'use client';

import { Service } from '@/lib/templates/types';
import { useState } from 'react';

interface BubblyServicesProps {
  services: Service[];
}

export default function BubblyServices({ services }: BubblyServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="services"
      style={{
        padding: '100px 24px',
        background: 'var(--bubbly-bg-white)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '42px',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--bubbly-text-dark)',
          }}
        >
          My Services
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '36px',
          }}
        >
          Professional pet care services tailored to your needs
        </p>

        {/* See Full Service Menu Button */}
        <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '48px'  }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, var(--bubbly-primary) 0%, #ff8fb4 100%)',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 107, 157, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 157, 0.3)';
            }}
          >
            See Full Service Menu
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {services.map((service) => {
            // Get price range
            const prices = service.menu_items
              ?.filter((item) => item.price && !item.is_add_on_only)
              .map((item) => parseFloat(item.price))
              .filter((price) => !isNaN(price));

            const minPrice = prices && prices.length > 0 ? Math.min(...prices) : null;
            const maxPrice = prices && prices.length > 0 ? Math.max(...prices) : null;

            let priceDisplay = '';
            if (minPrice && maxPrice) {
              if (minPrice === maxPrice) {
                priceDisplay = `$${minPrice}`;
              } else {
                priceDisplay = `$${minPrice} - $${maxPrice}`;
              }
            }

            return (
              <div
                key={service.id}
                style={{
                  background: 'var(--bubbly-cream)',
                  borderRadius: '24px',
                  padding: '40px 32px',
                  textAlign: 'left',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--bubbly-text-dark)',
                  }}
                >
                  {service.type}
                </h3>
                {service.description && (
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: 1.7,
                      marginBottom: '16px',
                    }}
                  >
                    {service.description}
                  </p>
                )}
                {priceDisplay && (
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--bubbly-primary)',
                    }}
                  >
                    {priceDisplay}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Menu Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '24px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '32px 32px 24px',
                borderBottom: '2px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                background: 'white',
                zIndex: 1,
                borderRadius: '24px 24px 0 0',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '28px',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Full Service Menu
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#999',
                  padding: 0,
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px 32px 32px' }}>
              {services.map((service) => (
                <div
                  key={service.id}
                  style={{
                    background: '#f8f8f8',
                    padding: '24px',
                    borderRadius: '16px',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '20px',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {service.type}
                    </h3>
                    {(() => {
                      const prices = service.menu_items
                        ?.filter((item) => item.price && !item.is_add_on_only)
                        .map((item) => parseFloat(item.price))
                        .filter((price) => !isNaN(price));

                      const minPrice = prices && prices.length > 0 ? Math.min(...prices) : null;
                      const maxPrice = prices && prices.length > 0 ? Math.max(...prices) : null;

                      if (minPrice && maxPrice) {
                        const priceDisplay = minPrice === maxPrice
                          ? `$${minPrice}`
                          : `$${minPrice} - $${maxPrice}`;

                        return (
                          <span
                            style={{
                              color: 'var(--bubbly-primary)',
                              fontWeight: 700,
                              fontSize: '18px',
                            }}
                          >
                            {priceDisplay}
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </div>

                  {service.description && (
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                        lineHeight: 1.6,
                      }}
                    >
                      {service.description}
                    </p>
                  )}

                  {service.menu_items && service.menu_items.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.menu_items.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 0',
                          }}
                        >
                          <span style={{ fontSize: '15px', color: '#333' }}>
                            {item.name}
                            {item.is_add_on_only && (
                              <span style={{ fontSize: '12px', color: '#999', marginLeft: '8px' }}>
                                (Add-on only)
                              </span>
                            )}
                          </span>
                          {item.price ? (
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>${item.price}</span>
                          ) : (
                            <span style={{ fontWeight: 600, fontSize: '15px', color: '#999' }}>—</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 968px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
