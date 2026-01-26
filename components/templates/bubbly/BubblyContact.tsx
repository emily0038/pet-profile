'use client';

import { useState } from 'react';
import { Profile, ServiceArea, Service } from '@/lib/templates/types';

interface BubblyContactProps {
  profile: Profile;
  serviceAreas: ServiceArea[];
  services: Service[];
}

export default function BubblyContact({ profile, serviceAreas, services }: BubblyContactProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Format phone number for display
  const formatPhoneForDisplay = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;

    const parts = [match[1], match[2], match[3]].filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
    return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const serviceAreaDisplay = serviceAreas?.length > 0
    ? serviceAreas.map(area => area.name).join(', ')
    : null;

  const isFormValid = () => {
    return name && phoneNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      const { submitInquiry } = await import('@/app/actions/requests');

      // Split name into first and last name
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await submitInquiry({
        profileId: profile.user_id,
        firstName,
        lastName,
        phoneNumber,
        message,
        serviceType: serviceType || undefined,
      });

      // Show success message
      setShowSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setName('');
        setPhoneNumber('');
        setServiceType('');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 24px',
        background: 'var(--bubbly-bg-white)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        <h2
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 'clamp(28px, 6vw, 42px)',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--bubbly-text-dark)',
            textAlign: 'center',
          }}
        >
          Let&apos;s Chat!
        </h2>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            marginBottom: '0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {showSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--bubbly-text-dark)', fontSize: '1.1rem' }}>
                Thank you for reaching out! I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <>
            {/* Service Type Dropdown */}
              {services.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="serviceType"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: 'var(--bubbly-text-dark)',
                    }}
                  >
                    What service are you interested in?
                  </label>
                  <select
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e5e5',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--bubbly-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e5e5')}
                  >
                    <option value="">Select a service...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.type}>
                        {service.type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* First Row - Name and Phone */}
              <div
                className="contact-form-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: 'var(--bubbly-text-dark)',
                    }}
                  >
                    Name (required)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e5e5',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--bubbly-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e5e5')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: 'var(--bubbly-text-dark)',
                    }}
                  >
                    Phone (required)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="(555) 123-4567"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e5e5',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--bubbly-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e5e5')}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'var(--bubbly-text-dark)',
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell us about your pet and what services you're interested in..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e5e5e5',
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--bubbly-primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e5e5')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, var(--bubbly-primary) 0%, #ff8fb4 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: !isFormValid() || isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 24px rgba(255, 107, 157, 0.3)',
                  transition: 'all 0.3s',
                  marginBottom: '32px',
                  opacity: !isFormValid() || isSubmitting ? 0.6 : 1,
                }}
                onMouseOver={(e) => {
                  if (isFormValid() && !isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 107, 157, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 157, 0.3)';
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </>
          )}

          {/* Contact Info Display */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              borderTop: '1px solid #e5e5e5',
              paddingTop: '32px',
            }}
          >
            {profile.email && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                  Email
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--bubbly-text-dark)',
                  }}
                >
                  {profile.email}
                </div>
              </div>
            )}
            {profile.phone_number_alt && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📞</div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                  Phone
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--bubbly-text-dark)',
                  }}
                >
                  {formatPhoneForDisplay(profile.phone_number_alt)}
                </div>
              </div>
            )}
            {serviceAreaDisplay && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📍</div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                  Location
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--bubbly-text-dark)',
                  }}
                >
                  {serviceAreaDisplay}
                </div>
              </div>
            )}
          </div>
        </form>

        <style jsx>{`
          @media (max-width: 768px) {
            .contact-form-row {
              grid-template-columns: 1fr !important;
            }

            form {
              padding: 24px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
