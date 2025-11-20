'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ReviewTooltip from './reviewTooltip';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryPhoto {
  id: string;
  photo_url: string;
  order: number;
  pet_details?: string;
  review?: string;
  owner?: string;
}

interface GallerySwiperProps {
  photos: GalleryPhoto[];
}

export default function GallerySwiper({ photos }: GallerySwiperProps) {
  const [openReviewId, setOpenReviewId] = useState<string | null>(null);
  const buttonRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});

  if (!photos || photos.length === 0) {
    return null;
  }

  const handleIconClick = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setOpenReviewId(openReviewId === photoId ? null : photoId);
  };

  return (
    <>
      <div className="w-full">
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties}
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          className="rounded-lg"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <div className="relative w-full aspect-square rounded-lg">
                <Image
                  src={photo.photo_url}
                  alt="Gallery photo"
                  fill
                  className="object-cover rounded-lg"
                />
                {/* Review icon for photos with reviews */}
                {photo.review && (
                  <div className="absolute top-2 right-2">
                    <button
                      ref={(el) => {
                        if (el) {
                          buttonRefs.current[photo.id] = el;
                        }
                      }}
                      onClick={(e) => handleIconClick(e, photo.id)}
                      onMouseEnter={() => setOpenReviewId(photo.id)}
                      onMouseLeave={() => setOpenReviewId(null)}
                      className="rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-[#BCB5FF] transition-colors"
                    >
                      <Image
                        src="/review-read.png"
                        alt="View review"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Render tooltip outside swiper to avoid z-index issues */}
      {openReviewId && photos.find(p => p.id === openReviewId) && (
        <ReviewTooltip
          petDetails={photos.find(p => p.id === openReviewId)?.pet_details}
          review={photos.find(p => p.id === openReviewId)?.review}
          owner={photos.find(p => p.id === openReviewId)?.owner}
          onClose={() => setOpenReviewId(null)}
          buttonRef={buttonRefs.current[openReviewId]}
        />
      )}
    </>
  );
}
