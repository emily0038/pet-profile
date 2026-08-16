import FriendlyTemplate from '@/components/templates/friendly/FriendlyTemplate';
import { TemplateData } from '@/lib/templates/types';

const placeholderLogo = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FFF8F0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='48' fill='url(%23g)' stroke='white' stroke-width='4'/%3E%3Ctext x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='48'%3E🐾%3C/text%3E%3C/svg%3E`;

const previewData: TemplateData = {
  profile: {
    id: 'preview', user_id: 'preview', email: 'hello@cozycrittercare.com', email_alt: '',
    domain: 'preview', first_name: 'Sarah', last_name: 'Morrison', phone_number: '(555) 123-4567', phone_number_alt: '',
    business_name: 'Cozy Critter Care', display_name: 'Sarah M.',
    profile_photo_url: 'https://cdn.pixabay.com/photo/2020/10/03/10/56/girl-5623207_1280.jpg', logo_url: placeholderLogo,
    about_me: 'Hi! I’m Sarah, the sole sitter behind Cozy Critter Care. I’ve been caring for dogs and cats professionally for over 8 years and specialize in anxious pets and multi-pet households. I treat every home with respect and every pet like a member of my own family. I believe consistency, patience, and communication are the keys to great care— and I love building long-term relationships with both pets and their humans.',
    personal_tagline: 'Calm, dependable care— just like you’d give',
    tagline: 'In-home care that keeps pets calm and comfortable',
    about_business: "Cozy Critter Care provides personalized, in-home pet care designed to keep your pets relaxed and routines intact. Whether you need daily walks, overnight boarding, or house sitting while you travel, I focus on one-on-one attention and a calm environment.\n\nI intentionally take on a limited number of clients so every pet gets thoughtful, reliable care. With clear communication, photo updates, and respect for your home, Cozy Critter Care offers peace of mind while you’re away.",
    service_area: 'Serving clients across the Madison, WI area',
    address: '',
    accepts_cats: true, accepts_dogs: true, max_weight: 100,
    booking_link: '', instagram_link: 'https://instagram.com', facebook_link: 'https://facebook.com',
    tiktok_link: '', twitter_link: 'https://twitter.com', google_business_link: '',
    template_id: 'friendly', theme: '', google_measurement_id: '', llms_txt_content: null, custom_section_heading: '', custom_section_body: '',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  services: [
    {
      id: '1', profile_id: 'preview', type: 'Dog Walking',
      description: 'Daily walks from 20-60 minutes. Perfect for keeping your pup active, healthy, and socialized.',
      photo_url: 'https://cdn.pixabay.com/photo/2019/06/08/05/32/dog-4259565_1280.jpg',
      menu_items: [
        { id: '1-1', service_id: '1', name: '20 Minute Walk', price: '25', is_add_on_only: false },
        { id: '1-2', service_id: '1', name: '60 Minute Walk', price: '50', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: '2', profile_id: 'preview', type: 'Pet Sitting',
      description: "In-home care and companionship. Your pets stay comfortable in their own environment.",
      photo_url: 'https://cdn.pixabay.com/photo/2021/08/18/22/42/australian-shepherd-6556697_1280.jpg',
      menu_items: [
        { id: '2-1', service_id: '2', name: 'Daily Rate', price: '150', is_add_on_only: false },
        { id: '2-2', service_id: '2', name: 'Constant Care', price: '175', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: '3', profile_id: 'preview', type: 'Yard Clean Up',
      description: 'Complete yard cleaning service to keep your outdoor space fresh and tidy.',
      photo_url: 'https://cdn.pixabay.com/photo/2021/07/30/22/11/dog-6510806_1280.jpg',
      menu_items: [
        { id: '3-1', service_id: '3', name: 'Small Yard', price: '30', is_add_on_only: false },
        { id: '3-2', service_id: '3', name: 'Large Yard', price: '50', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: '4', profile_id: 'preview', type: 'Special Care',
      description: 'Medication administration and special needs care for senior pets or those with medical conditions.',
      photo_url: 'https://cdn.pixabay.com/photo/2013/02/15/15/21/dog-81934_1280.jpg',
      menu_items: [],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
  ],
  galleryPhotos: [
    { id: '1', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2026/01/12/11/26/dog-10064150_1280.jpg', pet_details: 'Happy dog with toy', review: '', owner: '', category: 'hero', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2017/04/07/14/25/cat-2211076_1280.jpg', pet_details: 'Cat looking at camera', review: '', owner: '', category: 'hero', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2022/10/24/14/21/puppy-7543571_1280.jpg', pet_details: 'Dog playing outside', review: '', owner: '', category: 'hero', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2020/10/03/11/08/girl-5623231_1280.jpg', pet_details: 'Pet sitter with happy dogs', review: '', owner: '', category: 'about', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  faqs: [
    { id: '1', profile_id: 'preview', question: 'Do you stay overnight?', answer: 'Yes! Both my daily rate and constant care include overnights in your home.', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', question: 'Do you care for cats?', answer: 'Absolutely!', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', question: 'What if my pet has special needs or medical conditions?', answer: "I'm experienced in caring for pets with special needs and medical conditions. I can administer medications, follow special dietary requirements, and provide the extra attention your pet needs. Contact me to discuss your pet's specific needs.", order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  policies: [
    { id: '1', profile_id: 'preview', title: 'Meet & Greet', description: 'A complimentary meet & greet is required before any first booking. This allows time to review routines, medical needs, home access instructions, and ensure a good fit for both pets and owner.', icon: '🤝', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', title: 'Payments', description: 'Payment is due at booking confirmation to reserve dates. Extended stays may require a deposit. Accepted payment methods include credit cards and digital payments.', icon: '💳', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', title: 'Health & Safety', description: 'All dogs must be up to date on core vaccinations for boarding services. Pets must be free of contagious illness at the time of care. Medication can be administered with clear written instructions.', icon: '🏥', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', title: 'Inclement Weather', description: 'Walks may be shortened or adjusted during extreme weather, but care will continue as scheduled. House sitting services are unaffected by weather unless travel becomes unsafe.', icon: '🌧️', order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  serviceAreas: [
    { id: '1', profile_id: 'preview', name: 'Downtown Madison', description: '', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', name: 'Near West Side', description: '', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', name: 'Near East Side', description: '', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', name: 'Atwood', description: '', order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  reviews: [
    { id: '1', profile_id: 'preview', pet_name: 'Whiskers & Mittens', photo_url: 'https://cdn.pixabay.com/photo/2022/04/18/16/20/animal-7140980_1280.jpg', owner_name: 'Peter V.', review: "I've only been in San Francisco for a few months but the service is super easy to use and our sitter could not be nicer, more professional or more prompt. I receive updates about how the kitties are doing each day!", order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', pet_name: 'Max', photo_url: 'https://cdn.pixabay.com/photo/2020/05/03/13/09/puppy-5124947_1280.jpg', owner_name: 'Jennifer M.', review: 'Sarah is amazing! Our dog Max absolutely loves her. She sends us photos every day and we can tell he\'s having a great time. The peace of mind knowing he\'s in good hands is priceless.', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', pet_name: 'Buddy & Cooper', photo_url: 'https://cdn.pixabay.com/photo/2019/05/27/09/52/two-dog-4232337_1280.jpg', owner_name: 'Mike & Lisa T.', review: 'Professional, reliable, and genuinely cares about animals. Sarah has been walking our two dogs for over a year and we couldn\'t be happier. Highly recommended!', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
};

export default function FriendlyPreviewPage() {
  return <FriendlyTemplate data={previewData} />;
}
