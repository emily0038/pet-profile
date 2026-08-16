import BubblyTemplate from '@/components/templates/bubbly/BubblyTemplate';
import { TemplateData } from '@/lib/templates/types';

const placeholderLogo = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b9d;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ffc93c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='48' fill='url(%23g)' stroke='white' stroke-width='4'/%3E%3Ctext x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='48'%3E🐾%3C/text%3E%3C/svg%3E`;

const previewData: TemplateData = {
  profile: {
    id: 'preview', user_id: 'preview', email: 'hello@pawsandplay.com', email_alt: 'hello@pawsandplay.com',
    domain: 'preview', first_name: 'Andrea', last_name: 'Ye', phone_number: '(555) 123-4567', phone_number_alt: '',
    business_name: 'Paws & Play Daycare', display_name: 'Andrea Y.',
    profile_photo_url: 'https://cdn.pixabay.com/photo/2021/07/10/17/51/woman-6401957_1280.jpg', logo_url: placeholderLogo,
    about_me: "Hi! I’m the founder of Paws & Play. I’m a lifelong dog lover who left a corporate careers to build the daycare I always wished existed for my own pups. With a background in canine behavior, first aid, and facility management, I focus on calm leadership, positive reinforcement, and clear communication with pet parents.\n\nMy goal is to create a daycare that feels warm, professional, and transparent. I know trusting someone with your dog is a big deal, and I take that responsibility seriously every single day.",
    personal_tagline: 'A lifelong dog lover with a passion for enrichment and play',
    tagline: 'A pup-centered daycare where dogs are treated like family',
    about_business: "Paws & Play Daycare is a women-owned, community-focused dog daycare built around safety, structure, and genuine love for dogs. Our experienced team provides supervised play, calm rest periods, and enrichment activities designed for every energy level.\n\nWe believe great care comes from understanding each dog as an individual—not just part of a pack. With small group sizes, transparent communication, and a clean, secure facility, pet parents can head to work knowing their dogs are happy, stimulated, and cared for like our own. At Paws & Play, your dog’s well-being always comes first.",
    service_area: 'Serving pets across Berkeley, CA',
    address: '2111 San Pablo Ave, Berkeley, CA 94702',
    accepts_cats: true, accepts_dogs: true, max_weight: 80,
    booking_link: '', instagram_link: 'https://instagram.com', facebook_link: 'https://facebook.com',
    tiktok_link: '', twitter_link: '', google_business_link: '',
    template_id: 'bubbly', theme: '', google_measurement_id: '', llms_txt_content: null, custom_section_heading: '', custom_section_body: '',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  services: [
    {
      id: '1', profile_id: 'preview', type: 'Dog Daycare',
      description: "Structured, supervised play with rest breaks and enrichment activities.",
      photo_url: '',
      menu_items: [
        { id: '1-1', service_id: '1', name: 'Half Day (up to 5 hours)', price: '45', is_add_on_only: false },
        { id: '1-2', service_id: '1', name: 'Full Day (up to 10 hours)', price: '65', is_add_on_only: false },
        { id: '1-3', service_id: '1', name: 'Extra Pup (Half Day)', price: '20', is_add_on_only: true },
        { id: '1-4', service_id: '1', name: 'Extra Pup (Full Day)', price: '30', is_add_on_only: true },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: '2', profile_id: 'preview', type: 'Puppy Daycare',
      description: "Gentle socialization for dogs under 1 year (can be kept separate from dogs upon request).",
      photo_url: '',
      menu_items: [
        { id: '2-1', service_id: '2', name: 'Half Day', price: '60', is_add_on_only: false },
        { id: '2-2', service_id: '2', name: 'Full Day', price: '80', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: '3', profile_id: 'preview', type: 'Boarding',
      description: 'Attentive overnight care for when pet parents are away.',
      photo_url: '',
      menu_items: [
        { id: '3-1', service_id: '3', name: 'Overnight - Over 1 year', price: '80', is_add_on_only: false },
        { id: '3-2', service_id: '3', name: 'Overnight - Puppy', price: '100', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
  ],
  galleryPhotos: [
    { id: '1', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2015/05/30/19/53/playing-puppies-790638_1280.jpg', pet_details: 'Happy Golden Retriever', review: '', owner: '', category: 'hero', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2022/03/15/14/10/dog-7070424_1280.jpg', pet_details: 'Cute Tabby Cat', review: '', owner: '', category: 'hero', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2020/05/16/01/18/dog-toys-5175628_1280.jpg', pet_details: 'Playful Puppy', review: '', owner: '', category: 'hero', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2023/10/26/15/33/dog-training-8342962_1280.jpg', pet_details: 'Day to day activities', review: '', owner: '', category: 'about', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  faqs: [
    { id: '1', profile_id: 'preview', question: 'Do you require a temperament test?', answer: 'Yes, all dogs complete a complimentary trial day to ensure a safe group fit.', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', question: 'Are dogs separated by size?', answer: 'Yes, playgroups are carefully matched by size, age, and play style.', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', question: 'Do you send photo updates during the day?', answer: 'Absolutely! We send photos everyday so you know your pet is happy and healthy. You can also check in with our live camera feed.', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', question: 'Are you insured and bonded?', answer: 'Yes! Paws & Play is fully insured and bonded through Pet Care Insurance (PCI).', order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  policies: [
    { id: '1', profile_id: 'preview', title: 'Meet & Greet', description: 'All new dogs must complete a scheduled meet & greet and trial daycare day before enrolling. This allows our team to assess temperament, play style, stress levels, and group compatibility. Trial days are required for the safety of all dogs and help ensure your dog feels comfortable in our environment.', icon: '🤝', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', title: 'Payments', description: 'Payment is due at drop-off for single-day visits or in advance for multi-day packages. Packages must be used within the designated time period and are non-transferable. We accept all major credit cards and digital payments.', icon: '💳', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', title: 'Health & Safety', description: 'Dogs must be current on rabies, DHPP, and Bordetella vaccinations. Flea and tick prevention is required year-round. We reserve the right to refuse care to any dog showing signs of illness, injury, or contagious conditions to protect the group.', icon: '🏥', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  serviceAreas: [
    { id: '1', profile_id: 'preview', name: 'Downtown', description: 'Primary service area', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', name: 'Midtown', description: '', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', name: 'Riverside', description: '', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  reviews: [
    { id: '1', profile_id: 'preview', pet_name: 'Maxwell, Australian Shepherd', photo_url: 'https://cdn.pixabay.com/photo/2017/02/22/18/58/dog-2090313_1280.jpg', owner_name: 'Jennifer S.', review: 'Paws & Play is amazing! Max absolutely loves it and gets so excited when I bring him.', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', pet_name: 'Milo, Frenchie', photo_url: 'https://cdn.pixabay.com/photo/2020/05/27/16/36/big-eyes-5227954_1280.jpg', owner_name: 'Mike C.', review: 'Paws & Play is the only daycare I trust. The staff truly knows Milo’s personality and needs. He comes home happy but calm—not overstimulated. I love the updates and how intentional they are about safety.', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', pet_name: 'Pepper, Chihuahua', photo_url: 'https://cdn.pixabay.com/photo/2014/09/05/18/45/chihuahua-436528_1280.jpg', owner_name: 'Emily R.', review: "This place feels more like a second home than a daycare. The team is kind, professional, and incredibly knowledgeable. Pepper gets excited the moment we pull up.", order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
};

export default function BubblyPublicPreview() {
  return <BubblyTemplate data={previewData} />;
}
