import Image from 'next/image';
import { GalleryPhoto } from '@/lib/templates/types';

interface ProAboutProps {
  businessName: string;
  aboutBusiness?: string;
  dayToDayPhotos: GalleryPhoto[];
  ownerName?: string;
  ownerTitle?: string;
  ownerBio?: string;
  profilePhotoUrl?: string;
}

export default function ProAbout({
  businessName,
  aboutBusiness,
  dayToDayPhotos,
  ownerName,
  ownerTitle,
  ownerBio,
  profilePhotoUrl,
}: ProAboutProps) {
  const hasOwnerSection = ownerName || ownerBio || profilePhotoUrl;

  if (!aboutBusiness && dayToDayPhotos.length === 0 && !hasOwnerSection) {
    return null; // Don't render if no content
  }

  // Get up to 4 day-to-day photos for about section
  const photos = dayToDayPhotos.slice(0, 4);

  return (
    <>
      {/* Why Choose Section */}
      {(aboutBusiness || photos.length > 0) && (
        <section id="about" className="section section-bg-cream">
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: photos.length > 0 ? '1fr 1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>
              {photos.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      style={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 30px var(--shadow)',
                        background: '#ddd',
                        aspectRatio: '4/5',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={photo.photo_url}
                        alt={photo.pet_details || 'Pet care'}
                        fill
                        sizes="(max-width: 968px) 50vw, 300px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  Why Choose {businessName}?
                </h2>
                {aboutBusiness && (
                  <div style={{ color: 'var(--text-light)', fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
                    {aboutBusiness.split('\n\n').map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '1.5rem' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Owner Profile Section */}
      {hasOwnerSection && (
        <section id="owner" className="section section-bg-white">
          <div className="section-container">
            <div style={{ display: 'grid', gridTemplateColumns: profilePhotoUrl ? '350px 1fr' : '1fr', gap: '4rem', alignItems: 'start', maxWidth: '1200px', margin: '0 auto' }}>
              {profilePhotoUrl && (
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 40px var(--shadow)',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={profilePhotoUrl}
                      alt={ownerName || 'Owner'}
                      fill
                      sizes="350px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {ownerName ? `Meet ${ownerName}` : 'Meet the Owner'}
                </h2>
                {ownerTitle && (
                  <span style={{
                    display: 'inline-block',
                    color: 'var(--accent)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '2rem',
                    borderBottom: '2px solid var(--accent)',
                    paddingBottom: '0.5rem'
                  }}>
                    {ownerTitle}
                  </span>
                )}
                {ownerBio && (
                  <div style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.8, marginTop: '2rem', whiteSpace: 'pre-line' }}>
                    {ownerBio.split('\n\n').map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '1.5rem' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
