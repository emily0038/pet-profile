'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryPhoto {
  id: string;
  photo_url: string;
  order: number;
}

interface GallerySwiperProps {
  photos: GalleryPhoto[];
}

export default function GallerySwiper({ photos }: GallerySwiperProps) {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
