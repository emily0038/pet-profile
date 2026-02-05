'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ProTemplate from '@/components/templates/pro/ProTemplate';
import { TemplateData } from '@/lib/templates/types';

const placeholderLogo = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232d5f4f;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23a8c5ba;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='48' fill='url(%23g)' stroke='white' stroke-width='4'/%3E%3Ctext x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='48'%3E🐾%3C/text%3E%3C/svg%3E`;

// Placeholder data for the Pro template preview
const placeholderData: TemplateData = {
  profile: {
    id: 'preview',
    user_id: 'preview',
    email: 'contact@elitepetcare.com',
    email_alt: 'contact@elitepetcare.com',
    domain: 'preview',
    first_name: 'Michael',
    last_name: 'Anderson',
    phone_number: '(555) 987-6543',
    phone_number_alt: '',
    business_name: 'Elite Pet Care Services',
    display_name: 'Michael Anderson',
    profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    logo_url: placeholderLogo,
    about_me: "With over 12 years of professional pet care experience, I've dedicated my career to ensuring the health, happiness, and well-being of pets throughout our community.\n\nI hold certifications in Pet First Aid, CPR, and Animal Behavior, and I'm committed to ongoing education in the latest pet care practices. Every pet deserves individualized attention and care, and that's exactly what I provide.\n\nWhen I'm not caring for your pets, you'll find me volunteering at the local animal shelter or hiking with my two rescue dogs, Charlie and Luna.",
    personal_tagline: 'Professional Pet Care Specialist',
    tagline: 'Professional Pet Care You Can Trust',
    about_business: "Elite Pet Care Services has been the premier choice for discerning pet owners since 2012. We specialize in providing comprehensive, professional care that goes beyond basic pet sitting.\n\nOur approach combines expertise, compassion, and reliability. Every member of our team is thoroughly vetted, insured, and trained in pet first aid and CPR. We understand that your pets are family, and we treat them with the same love and attention we give our own.\n\nWhether you need daily dog walking, extended pet sitting, or specialized care for senior pets or those with medical needs, we're here to help. Our commitment to excellence has earned us a 5-star reputation and countless happy clients throughout the area.",
    service_area: 'Proudly serving the greater metropolitan area',
    address: '456 Professional Plaza, Boston, MA',
    accepts_cats: true,
    accepts_dogs: true,
    max_weight: 100,
    booking_link: '',
    instagram_link: '',
    facebook_link: '',
    tiktok_link: '',
    twitter_link: '',
    google_business_link: '',
    template_id: 'pro',
    theme: '',
    google_measurement_id: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  services: [
    {
      id: '1',
      profile_id: 'preview',
      type: 'Professional Dog Walking',
      description: 'Structured walks designed to meet your dog\'s exercise needs while reinforcing positive behaviors.',
      photo_url: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=400&h=400&fit=crop',
      menu_items: [
        { id: '1-1', service_id: '1', name: 'Standard Walk (30 min)', price: '30', is_add_on_only: false },
        { id: '1-2', service_id: '1', name: 'Extended Walk (60 min)', price: '50', is_add_on_only: false },
        { id: '1-3', service_id: '1', name: 'Adventure Walk (90 min)', price: '70', is_add_on_only: false },
        { id: '1-4', service_id: '1', name: 'Additional Dog', price: '15', is_add_on_only: true },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      type: 'Premium Pet Sitting',
      description: 'Comprehensive in-home care including feeding, medication administration, and companionship.',
      photo_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
      menu_items: [
        { id: '2-1', service_id: '2', name: 'Overnight Care', price: '95', is_add_on_only: false },
        { id: '2-2', service_id: '2', name: 'Drop-in Visit (30 min)', price: '35', is_add_on_only: false },
        { id: '2-3', service_id: '2', name: 'Extended Visit (60 min)', price: '55', is_add_on_only: false },
        { id: '2-4', service_id: '2', name: 'Medication Administration', price: '10', is_add_on_only: true },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      type: 'Cat Care Specialist',
      description: 'Specialized services for feline friends, including playtime, feeding, and litter maintenance.',
      photo_url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop',
      menu_items: [
        { id: '3-1', service_id: '3', name: 'Daily Visit (30 min)', price: '30', is_add_on_only: false },
        { id: '3-2', service_id: '3', name: 'Multiple Cats', price: '10', is_add_on_only: true },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      type: 'Senior Pet Care',
      description: 'Gentle, specialized care for older pets with mobility issues or special medical needs.',
      photo_url: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=400&fit=crop',
      menu_items: [
        { id: '4-1', service_id: '4', name: 'Senior Care Visit (45 min)', price: '45', is_add_on_only: false },
        { id: '4-2', service_id: '4', name: 'Medical Monitoring', price: '15', is_add_on_only: true },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  galleryPhotos: [
    {
      id: '1',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop',
      pet_details: 'Professional dog walking',
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
      photo_url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&h=500&fit=crop',
      pet_details: 'Quality pet care',
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
      photo_url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=500&fit=crop',
      pet_details: 'Day to day care',
      review: '',
      owner: '',
      category: 'about',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=500&fit=crop',
      pet_details: 'Professional service',
      review: '',
      owner: '',
      category: 'about',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=500&fit=crop',
      pet_details: 'Caring service',
      review: '',
      owner: '',
      category: 'about',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      profile_id: 'preview',
      photo_url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=500&fit=crop',
      pet_details: 'Expert handling',
      review: '',
      owner: '',
      category: 'about',
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  faqs: [
    {
      id: '1',
      profile_id: 'preview',
      question: 'What qualifications do you have?',
      answer: 'All our staff members are certified in Pet First Aid and CPR, background checked, and carry comprehensive liability insurance. We also have ongoing training in animal behavior and care best practices.',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      question: 'Do you handle pets with special needs?',
      answer: 'Yes! We specialize in caring for senior pets, those with medical conditions, and pets requiring medication administration. We work closely with your veterinarian to ensure proper care.',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      question: 'What is your cancellation policy?',
      answer: 'We require 48 hours notice for cancellations to avoid fees. Emergency situations are handled on a case-by-case basis.',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      question: 'How do I get started?',
      answer: 'Simply contact us to schedule a complimentary meet-and-greet. We\'ll discuss your pet\'s needs, answer any questions, and ensure we\'re the right fit for your family.',
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  policies: [
    {
      id: '1',
      profile_id: 'preview',
      title: 'Professional Standards',
      description: 'All services are provided by trained, insured professionals who adhere to the highest industry standards.',
      icon: '⭐',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      title: 'Safety First',
      description: 'Your pet\'s safety is our top priority. We maintain detailed care notes and emergency protocols for every client.',
      icon: '🛡️',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      title: 'Communication',
      description: 'We provide photo updates and detailed reports after every visit, so you always know how your pet is doing.',
      icon: '📱',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  serviceAreas: [
    {
      id: '1',
      profile_id: 'preview',
      name: 'Back Bay',
      description: 'Full service coverage',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      name: 'Beacon Hill',
      description: 'Full service coverage',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      name: 'South End',
      description: 'Full service coverage',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      profile_id: 'preview',
      name: 'Cambridge',
      description: 'Limited availability',
      order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  reviews: [
    {
      id: '1',
      profile_id: 'preview',
      pet_name: 'Duke',
      photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop',
      owner_name: 'David Thompson',
      review: 'Elite Pet Care has been caring for Duke for three years now. Their professionalism and genuine love for animals is unmatched. I trust them completely.',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      profile_id: 'preview',
      pet_name: 'Mittens',
      photo_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
      owner_name: 'Rachel Green',
      review: 'My cat Mittens requires daily medication, and Michael handles it perfectly. The detailed updates give me peace of mind when I travel.',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      profile_id: 'preview',
      pet_name: 'Buddy',
      photo_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop',
      owner_name: 'James Wilson',
      review: 'Our senior dog Buddy needs special care, and Elite Pet Care provides exactly that. Their expertise with senior pets is outstanding.',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

export default function ProPreviewPage() {
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

  return <ProTemplate data={placeholderData} />;
}
