'use client';

import { useState } from 'react';
import { Profile, ServiceArea, Service } from '@/lib/templates/types';

interface ProContactProps {
  profile: Profile;
  serviceAreas: ServiceArea[];
  services: Service[];
}

export default function ProContact({ profile, serviceAreas, services }: ProContactProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Format service areas as comma-separated list
  const serviceAreasList = serviceAreas.map(area => area.name).join(', ');

  // Format phone number for display
  const formatPhoneForDisplay = (phone: string) => {
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

  const isFormValid = () => {
    return phoneNumber && firstName && lastName;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      const { submitInquiry } = await import('@/app/actions/requests');

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
        setPhoneNumber('');
        setFirstName('');
        setLastName('');
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
    <section id="contact" className="section section-bg-cream">
      <div className="section-header">
        <h2>Get in Touch</h2>
        <p>Ready to give your pet the care they deserve? Let&apos;s talk!</p>
      </div>
      <div
        className="section-container contact-container"
        style={{
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
        }}
      >
        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '2rem' }}>
            Contact Information
          </h3>

          <div style={{ marginTop: '2rem' }}>
            {/* Phone */}
            {profile.phone_number_alt && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 2px 10px var(--shadow)',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Phone</h4>
                  <p style={{ color: 'var(--text-light)' }}>
                    <a
                      href={`tel:${profile.phone_number_alt}`}
                      style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      {formatPhoneForDisplay(profile.phone_number_alt)}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Email */}
            {profile.email_alt && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 2px 10px var(--shadow)',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  ✉️
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Email</h4>
                  <p style={{ color: 'var(--text-light)' }}>
                    <a
                      href={`mailto:${profile.email_alt}`}
                      style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      {profile.email_alt}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Service Area */}
            {(profile.service_area || serviceAreasList) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 2px 10px var(--shadow)',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Service Area</h4>
                  <p style={{ color: 'var(--text-light)' }}>
                    {serviceAreasList || profile.service_area}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div
          id="contact-form"
          style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '20px',
            boxShadow: '0 4px 20px var(--shadow)',
          }}
        >
          <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
            Send Us a Message
          </h3>

          {showSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem' }}>
                Thank you for reaching out! I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
            {/* Service Type Dropdown */}
              {services.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                    What service are you interested in?
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(45, 95, 79, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                    }}
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
              {/* Phone Number */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Phone number*
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(45, 95, 79, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem',
                  }}
                  required
                />
              </div>

              {/* First Name and Last Name */}
              <div className="name-fields-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                    First name*
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(45, 95, 79, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                    Last name*
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(45, 95, 79, 0.2)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                    }}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid rgba(45, 95, 79, 0.2)',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  opacity: !isFormValid() || isSubmitting ? 0.5 : 1,
                  cursor: !isFormValid() || isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Social Links & Booking */}
      {(profile.booking_link || profile.instagram_link || profile.facebook_link || profile.twitter_link || profile.tiktok_link || profile.google_business_link) && (
        <div className="section-container" style={{ maxWidth: '800px', textAlign: 'center', marginTop: '4rem' }}>
          {profile.booking_link && (
            <div style={{ marginBottom: '2rem' }}>
              <a
                href={profile.booking_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '1.2rem', padding: '1.25rem 3rem' }}
              >
                Book Online Now
              </a>
            </div>
          )}

          {(profile.instagram_link || profile.facebook_link || profile.twitter_link || profile.tiktok_link || profile.google_business_link) && (
            <div>
              <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {profile.instagram_link && (
                  <a
                    href={profile.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 10px var(--shadow)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    📷
                  </a>
                )}
                {profile.facebook_link && (
                  <a
                    href={profile.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 10px var(--shadow)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    📘
                  </a>
                )}
                {profile.twitter_link && (
                  <a
                    href={profile.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 10px var(--shadow)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    🐦
                  </a>
                )}
                {profile.tiktok_link && (
                  <a
                    href={profile.tiktok_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 10px var(--shadow)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    🎵
                  </a>
                )}
                {profile.google_business_link && (
                  <a
                    href={profile.google_business_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 10px var(--shadow)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    🔍
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        @media (max-width: 968px) {
          .contact-container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .name-fields-grid {
            grid-template-columns: 1fr !important;
          }
          
          #contact-form {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
