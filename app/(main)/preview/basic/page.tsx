'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import BasicTemplate from '@/components/templates/basic/BasicTemplate';
import { TemplateData } from '@/lib/templates/types';

// Placeholder data for the Basic template preview
const placeholderData: TemplateData = {
  profile: {
    id: 'preview',
    user_id: 'preview',
    email: 'lisa@pawsitivecare.com',
    email_alt: '',
    domain: 'preview',
    first_name: 'Lisa',
    last_name: 'Mitchell',
    phone_number: '(555) 123-4567',
    phone_number_alt: '',
    business_name: 'Pawsitive Care Pet Sitting',
    display_name: 'Lisa Mitchell',
    profile_photo_url: '',
    logo_url: '',
    about_me: '',
    personal_tagline: '',
    tagline: "Hi! I'm Lisa, an experienced pet sitter based in Montpelier, Vermont.",
    about_business: "Welcome! I'm Lisa, and I've been providing professional pet sitting and dog walking services in the Montpelier area for over 8 years. My passion for animals started young, and I turned that love into a career dedicated to caring for your furry family members.\n\nI believe every pet deserves personalized attention and care. Whether your dog needs daily walks, your cat requires companionship while you're away, or your pets need overnight care, I'm here to help maintain their routine and keep them happy.\n\nI'm fully insured, bonded, and certified in pet first aid. Your pets' safety and wellbeing are my top priorities.",
    service_area: 'Greater Montpelier Area',
    address: '',
    accepts_cats: true,
    accepts_dogs: true,
    max_weight: 100,
    booking_link: '',
    instagram_link: 'https://instagram.com',
    facebook_link: 'https://facebook.com',
    tiktok_link: '',
    twitter_link: 'https://twitter.com',
    google_business_link: '',
    template_id: 'basic',
    google_measurement_id: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  services: [
    {
      id: '1',
      profile_id: 'preview',
      type: 'Dog Walking Services',
      description: 'Perfect for quick potty breaks and light exercise',
      photo_url: '',
      menu_items: [
        { id: '1-1', service_id: '1', name: 'Dog Walk (20 min)', price: '$20-$30', is_add_on_only: false },
        { id: '1-2', service_id: '1', name: 'Dog Walk (30 min)', price: '$30-$40', is_add_on_only: false },
        { id: '1-3', service_id: '1', name: 'Dog Walk (45 min)', price: '$40-$55', is_add_on_only: false },
        { id: '1-4', service_id: '1', name: 'Dog Walk (60 min)', price: '$60-$75', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      type: 'Pet Sitting & Care',
      description: 'In-home pet sitting and companionship services',
      photo_url: '',
      menu_items: [
        { id: '2-1', service_id: '2', name: 'Pet Sitter', price: '$150-$175', is_add_on_only: false },
        { id: '2-2', service_id: '2', name: 'Yard Poop Clean Up', price: '$30-$50', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  galleryPhotos: [
    {
      id: '1',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
      pet_details: 'Happy dog outdoors',
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
      photo_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=500&fit=crop',
      pet_details: 'About photo',
      review: '',
      owner: '',
      category: 'about',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=500&h=500&fit=crop',
      pet_details: 'Dog with bandana',
      review: '',
      owner: '',
      category: 'about',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop',
      pet_details: 'Cat',
      review: '',
      owner: '',
      category: 'about',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=500&fit=crop',
      pet_details: 'Golden retriever',
      review: '',
      owner: '',
      category: 'about',
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop',
      pet_details: 'Dog hiking',
      review: '',
      owner: '',
      category: 'about',
      order: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '7',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=500&fit=crop',
      pet_details: 'Cat looking',
      review: '',
      owner: '',
      category: 'about',
      order: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '8',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=500&fit=crop',
      pet_details: 'Dalmatian',
      review: '',
      owner: '',
      category: 'about',
      order: 7,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '9',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop',
      pet_details: 'Puppy',
      review: '',
      owner: '',
      category: 'about',
      order: 8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  faqs: [],
  policies: [],
  serviceAreas: [
    {
      id: '1',
      profile_id: 'preview',
      name: 'Downtown Montpelier',
      description: 'City center and surrounding neighborhoods',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      name: 'Berlin',
      description: 'Including Berlin Heights and Route 12',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      name: 'Barre',
      description: 'Barre City and Barre Town areas',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      name: 'East Montpelier',
      description: 'Rural routes and residential areas',
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      profile_id: 'preview',
      name: 'Middlesex',
      description: 'Route 2 corridor and surrounding areas',
      order: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      profile_id: 'preview',
      name: 'Calais',
      description: 'Including Adamant and Kent\'s Corner',
      order: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '7',
      profile_id: 'preview',
      name: 'Northfield',
      description: 'Town center and Route 12 area',
      order: 7,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '8',
      profile_id: 'preview',
      name: 'Waterbury',
      description: 'Village and surrounding communities',
      order: 8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  reviews: [
    {
      id: '1',
      profile_id: 'preview',
      pet_name: 'Max',
      photo_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop',
      owner_name: 'Jennifer M.',
      review: 'Lisa is amazing! Our dog Max absolutely loves her. She sends us photos every day and we can tell he\'s having a great time. Highly recommend!',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      pet_name: 'Buddy & Luna',
      photo_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=500&fit=crop',
      owner_name: 'Mike & Lisa T.',
      review: 'Professional, reliable, and genuinely cares about animals. Lisa has been walking our two dogs for over a year and we couldn\'t be happier.',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      pet_name: 'Whiskers',
      photo_url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop',
      owner_name: 'Amanda R.',
      review: 'Our cats can be finicky with strangers, but they warmed up to Lisa immediately. She\'s patient, kind, and sends great updates while we\'re away.',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      pet_name: 'Charlie',
      photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=500&fit=crop',
      owner_name: 'Sarah K.',
      review: 'Charlie gets so excited when Lisa comes to walk him. Best pet sitter we\'ve ever had!',
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      profile_id: 'preview',
      pet_name: 'Daisy',
      photo_url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=500&h=500&fit=crop',
      owner_name: 'Tom H.',
      review: 'Daisy is always happy and well-exercised after her walks with Lisa. Highly recommend!',
      order: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      profile_id: 'preview',
      pet_name: 'Mochi',
      photo_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=500&fit=crop',
      owner_name: 'Emily W.',
      review: 'Lisa takes amazing care of our cat Mochi. The daily photo updates are the best!',
      order: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '7',
      profile_id: 'preview',
      pet_name: 'Rocky',
      photo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=500&fit=crop',
      owner_name: 'David L.',
      review: 'Rocky can be a handful but Lisa handles him perfectly. So grateful for her services!',
      order: 7,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '8',
      profile_id: 'preview',
      pet_name: 'Cooper',
      photo_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop',
      owner_name: 'Jessica P.',
      review: 'We trust Lisa completely with Cooper. She\'s become part of our family!',
      order: 8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

export default function BasicPreviewPage() {
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

  return <BasicTemplate data={placeholderData} />;
}
