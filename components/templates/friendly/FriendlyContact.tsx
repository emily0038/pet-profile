'use client';

import { useState } from 'react';
import { Profile, Service } from '@/lib/templates/types';

interface FriendlyContactProps {
  profile: Profile;
  services: Service[];
}

export default function FriendlyContact({ profile, services }: FriendlyContactProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    service: '',
    foundVia: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { submitInquiry } = await import('@/app/actions/requests');

      await submitInquiry({
        profileId: profile.user_id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        message: formData.message,
        serviceType: formData.service || undefined,
        foundVia: formData.foundVia || undefined,
      });

      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', phone: '', service: '', foundVia: '', message: '' });
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="friendly-contact">
      <div className="friendly-contact-wrapper">
        <div className="friendly-contact-content">
          <h2>Get in Touch</h2>
          <p>
            Feel free to reach out with any questions and requests.
            Cat got your tongue? Don&apos;t worry about it. Send an email.
          </p>
          <div className="friendly-contact-info">
            {profile.email && (
              <div className="friendly-contact-item">
                <h4>Email</h4>
                <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
              </div>
            )}
            {profile.phone_number && (
              <div className="friendly-contact-item">
                <h4>Phone</h4>
                <p><a href={`tel:${profile.phone_number}`}>{profile.phone_number}</a></p>
              </div>
            )}
            {profile.service_area && (
              <div className="friendly-contact-item">
                <h4>Service Area</h4>
                <p>{profile.service_area}</p>
              </div>
            )}
          </div>
        </div>
        <div>
          {submitted ? (
            <div className="friendly-inquiry-form" style={{ textAlign: 'center', padding: '60px 40px' }}>
              <h3 style={{ marginBottom: '15px' }}>Thank You!</h3>
              <p style={{ color: '#666' }}>
                Your inquiry has been sent. We&apos;ll get back to you soon!
              </p>
            </div>
          ) : (
            <form className="friendly-inquiry-form" onSubmit={handleSubmit}>
              <h3>Send Us an Inquiry</h3>
              <div className="friendly-form-row">
                <div className="friendly-form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="friendly-form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="friendly-form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="friendly-form-group">
                <label htmlFor="service">What service are you interested in? *</label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">Select a service...</option>
                  {services && services.length > 0 ? (
                    services.map((service) => (
                      <option key={service.id} value={service.type}>
                        {service.type}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="dog-walking">Dog Walking</option>
                      <option value="pet-sitting">Pet Sitting</option>
                      <option value="other">Other</option>
                    </>
                  )}
                </select>
              </div>
              <div className="friendly-form-group">
                <label htmlFor="foundVia">How did you find me?</label>
                <input
                  type="text"
                  id="foundVia"
                  name="foundVia"
                  placeholder="Google, Instagram, a friend..."
                  value={formData.foundVia}
                  onChange={(e) => setFormData({ ...formData, foundVia: e.target.value })}
                />
              </div>
              <div className="friendly-form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your pets and what you're looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className="friendly-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
