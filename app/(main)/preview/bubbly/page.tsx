'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import BubblyTemplate from '@/components/templates/bubbly/BubblyTemplate';
import { TemplateData } from '@/lib/templates/types';

// Placeholder logo SVG (gradient circle with paw emoji)
const placeholderLogo = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b9d;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ffc93c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='48' fill='url(%23g)' stroke='white' stroke-width='4'/%3E%3Ctext x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='48'%3E🐾%3C/text%3E%3C/svg%3E`;

// Placeholder data for the Bubbly template preview
const placeholderData: TemplateData = {
  profile: {
    id: 'preview',
    user_id: 'preview',
    email: 'hello@pawfectcare.com',
    email_alt: 'hello@pawfectcare.com',
    domain: 'preview',
    first_name: 'Sarah',
    last_name: 'Johnson',
    phone_number: '(555) 123-4567',
    phone_number_alt: '',
    business_name: 'Pawfect Pet Care',
    display_name: 'Sarah Johnson',
    profile_photo_url: '',
    logo_url: placeholderLogo,
    about_me: "Hi there! I've been caring for pets professionally for over 8 years. I grew up with dogs, cats, rabbits, and even a parrot—so I've seen it all!\n\nI'm certified in pet CPR and first aid, and I absolutely love what I do. There's nothing better than seeing a wagging tail or hearing a happy purr. I can't wait to meet you and your furry friend!",
    personal_tagline: 'Certified Pet Sitter since 2015',
    tagline: 'The Best Pet Care for Your Furry Friend',
    about_business: "We're not just pet sitters—we're pet parents too! With years of experience caring for dogs, cats, and small animals, we understand that leaving your furry family member is never easy.\n\nThat's why we go above and beyond to provide personalized, loving care that keeps your pet happy, healthy, and entertained while you're away. From daily walks to overnight stays, we treat every pet like our own.\n\nOur goal is simple: give you complete peace of mind knowing your best friend is in the best hands.",
    service_area: 'Serving downtown and surrounding neighborhoods',
    address: '123 Pet Street, San Francisco, CA',
    accepts_cats: true,
    accepts_dogs: true,
    max_weight: 80,
    booking_link: '',
    instagram_link: 'https://instagram.com',
    facebook_link: 'https://facebook.com',
    tiktok_link: '',
    twitter_link: '',
    google_business_link: '',
    template_id: 'bubbly',
    theme: '',
    google_measurement_id: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  services: [
    {
      id: '1',
      profile_id: 'preview',
      type: 'Dog Walking',
      description: 'Daily walks tailored to your dog\'s energy level and needs. Perfect for busy pet parents!',
      photo_url: '',
      menu_items: [
        { id: '1-1', service_id: '1', name: '30 Minute Walk', price: '25', is_add_on_only: false },
        { id: '1-2', service_id: '1', name: '60 Minute Walk', price: '40', is_add_on_only: false },
        { id: '1-3', service_id: '1', name: 'Extra Pup', price: '10', is_add_on_only: true },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      type: 'Pet Sitting',
      description: 'In-home care while you\'re away. Includes feeding, playtime, and lots of cuddles!',
      photo_url: '',
      menu_items: [
        { id: '2-1', service_id: '2', name: 'Overnight Stay', price: '75', is_add_on_only: false },
        { id: '2-2', service_id: '2', name: 'Daily Visit (30 min)', price: '30', is_add_on_only: false },
        { id: '2-3', service_id: '2', name: 'Extended Visit (60 min)', price: '45', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      type: 'Cat Care',
      description: 'Specialized care for your feline friends. Daily visits, feeding, and play sessions.',
      photo_url: '',
      menu_items: [
        { id: '3-1', service_id: '3', name: 'Daily Visit', price: '25', is_add_on_only: false },
        { id: '3-2', service_id: '3', name: 'Twice Daily Visits', price: '45', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  galleryPhotos: [
    {
      id: '1',
      profile_id: 'preview',
      photo_url: '',
      pet_details: 'Happy Golden Retriever',
      review: '',
      owner: '',
      category: 'hero',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      photo_url: '',
      pet_details: 'Cute Tabby Cat',
      review: '',
      owner: '',
      category: 'hero',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      photo_url: '',
      pet_details: 'Playful Puppy',
      review: '',
      owner: '',
      category: 'hero',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      photo_url: '',
      pet_details: 'Day to day activities',
      review: '',
      owner: '',
      category: 'about',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  faqs: [
    {
      id: '1',
      profile_id: 'preview',
      question: 'What areas do you serve?',
      answer: 'We serve downtown and all surrounding neighborhoods within a 10-mile radius.',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      question: 'Are you insured and bonded?',
      answer: 'Yes! We are fully insured and bonded for your peace of mind.',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      question: 'Do you provide updates?',
      answer: 'Absolutely! We send photos and updates after every visit so you know your pet is happy and healthy.',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  policies: [
    {
      id: '1',
      profile_id: 'preview',
      title: 'Cancellation Policy',
      description: '24-hour notice required for cancellations. Last-minute cancellations may incur a fee.',
      icon: '📅',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      title: 'Payment',
      description: 'Payment is due at the time of service. We accept cash, Venmo, and all major credit cards.',
      icon: '💳',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  serviceAreas: [
    {
      id: '1',
      profile_id: 'preview',
      name: 'Downtown',
      description: 'Primary service area',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      name: 'Midtown',
      description: '',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      name: 'Riverside',
      description: '',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  reviews: [
    {
      id: '1',
      profile_id: 'preview',
      pet_name: 'Max',
      photo_url: '',
      owner_name: 'Jennifer Smith',
      review: 'Sarah is amazing! Max absolutely loves her and gets so excited when she arrives. I feel completely at ease leaving him in her care.',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      pet_name: 'Luna',
      photo_url: '',
      owner_name: 'Mike Chen',
      review: 'Best pet sitter ever! Luna can be picky about who she trusts, but she warmed up to Sarah immediately. Highly recommend!',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      pet_name: 'Bella',
      photo_url: '',
      owner_name: 'Emily Rodriguez',
      review: 'We\'ve been using Sarah for over a year now and couldn\'t be happier. She sends the cutest photo updates and Bella is always so happy!',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

export default function BubblyPreviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F9FAFB',
      }}>
        <div style={{ fontSize: '18px', color: '#6B7280' }}>Loading preview...</div>
      </div>
    );
  }

  return <BubblyTemplate data={placeholderData} />;
}
