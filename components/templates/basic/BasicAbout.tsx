import Image from 'next/image';
import { GalleryPhoto } from '@/lib/templates/types';

interface BasicAboutProps {
  businessName: string;
  aboutBusiness?: string;
  aboutPhoto?: GalleryPhoto;
}

export default function BasicAbout({ businessName, aboutBusiness, aboutPhoto }: BasicAboutProps) {
  if (!aboutBusiness && !aboutPhoto) {
    return null;
  }

  // Split about text into paragraphs
  const paragraphs = aboutBusiness?.split('\n').filter(p => p.trim()) || [];

  return (
    <section className="basic-about">
      <div className="basic-about__wrapper">
        <div className="basic-about__content">
          <h2 className="basic-about__title">About {businessName}</h2>
          <div className="basic-about__text">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {aboutPhoto && (
          <div className="basic-about__image">
            <Image
              src={aboutPhoto.photo_url}
              alt={`About ${businessName}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
