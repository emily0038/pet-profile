import { Profile } from '@/lib/templates/types';

interface BasicContactProps {
  profile: Profile;
}

export default function BasicContact({ profile }: BasicContactProps) {
  const hasPhone = profile.phone_number;
  const hasEmail = profile.email || profile.email_alt;
  const hasBookingLink = profile.booking_link;
  const hasSocials = profile.instagram_link || profile.facebook_link || profile.twitter_link || profile.tiktok_link;

  return (
    <section id="contact" className="basic-contact">
      <div className="basic-contact__container">
        <div className="basic-section-title">
          <h2>Get In Touch</h2>
          <p>Ready to book or have questions? Reach out!</p>
        </div>

        <div className="basic-contact__info">
          {hasPhone && (
            <div className="basic-contact__item">
              <h4>Phone</h4>
              <p><a href={`tel:${profile.phone_number}`}>{profile.phone_number}</a></p>
            </div>
          )}

          {hasEmail && (
            <div className="basic-contact__item">
              <h4>Email</h4>
              <p><a href={`mailto:${profile.email || profile.email_alt}`}>{profile.email || profile.email_alt}</a></p>
            </div>
          )}

          {profile.service_area && (
            <div className="basic-contact__item">
              <h4>Service Area</h4>
              <p>{profile.service_area}</p>
            </div>
          )}
        </div>

        {hasBookingLink && (
          <a href={profile.booking_link} className="basic-btn" target="_blank" rel="noopener noreferrer">
            Book Now
          </a>
        )}

        {hasSocials && (
          <div className="basic-social-links">
            {profile.instagram_link && (
              <a href={profile.instagram_link} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                IG
              </a>
            )}
            {profile.facebook_link && (
              <a href={profile.facebook_link} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                FB
              </a>
            )}
            {profile.twitter_link && (
              <a href={profile.twitter_link} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                TW
              </a>
            )}
            {profile.tiktok_link && (
              <a href={profile.tiktok_link} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                TK
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
