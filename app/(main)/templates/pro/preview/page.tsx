import ProTemplate from '@/components/templates/pro/ProTemplate';
import { TemplateData } from '@/lib/templates/types';

const placeholderLogo = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232d5f4f;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23a8c5ba;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='48' fill='url(%23g)' stroke='white' stroke-width='4'/%3E%3Ctext x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='48'%3E🐾%3C/text%3E%3C/svg%3E`;

const previewData: TemplateData = {
  profile: {
    id: 'preview', user_id: 'preview', email: 'hello@tailsontrails.com', email_alt: 'hello@tailsontrails.com',
    domain: 'preview', first_name: 'Jake', last_name: 'Abbott', phone_number: '(555) 987-6543', phone_number_alt: '',
    business_name: 'Tails on Trails Adventure Walks', display_name: 'Jake A.',
    profile_photo_url: 'https://cdn.pixabay.com/photo/2022/01/28/10/40/iranian-man-6974337_1280.jpg',
    logo_url: placeholderLogo,
    about_me: "Hey, I’m Jake— an experienced dog walker, hiker, and lifelong outdoor enthusiast. I specialize in working with high-energy dogs who thrive in nature and structured pack settings. Over the years, I’ve trained reliable recall, practiced canine first aid, and logged hundreds of trail miles with dogs by my side. I keep groups small, stay alert, and treat every hike like a responsibility— not a free-for-all. My goal is simple: safe adventures and very tired, very happy dogs.",
    personal_tagline: 'Adventure guide for high-energy dogs',
    tagline: 'Off-leash hikes for dogs who love adventure',
    about_business: "Trail Tails Adventure Walks is built for dogs who need more than a sidewalk stroll. I take small groups on structured hikes through local trails, parks, and nature preserves— focusing on physical exercise, mental stimulation, and confident pack movement. Every hike is carefully planned with safety, recall, and terrain in mind. If your dog loves to run, explore, and come home happily exhausted, Trail Tails is for you. I prioritize trust, clear communication, and responsible off-leash practices so dogs can enjoy freedom safely.",
    service_area: 'Proudly serving the Boulder, CO metropolitan area',
    address: '1234 Pearl St, Boulder, CO 80302',
    accepts_cats: true, accepts_dogs: true, max_weight: 100,
    booking_link: '', instagram_link: '', facebook_link: '', tiktok_link: '', twitter_link: '', google_business_link: '',
    template_id: 'pro', theme: '', google_measurement_id: '',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  services: [
    {
      id: '1', profile_id: 'preview', type: 'Obedience Training',
      description: "Private sessions with a CPDT-KA-certified trainer, customized to your dog's needs.",
      photo_url: 'https://cdn.pixabay.com/photo/2012/12/11/21/28/trainer-69476_1280.jpg',
      menu_items: [
        { id: '1-1', service_id: '1', name: '60-Minute Session', price: '150', is_add_on_only: false },
        { id: '1-2', service_id: '1', name: '2-Hour Session', price: '250', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: '2', profile_id: 'preview', type: 'Adventure Hikes',
      description: 'Off-leash hikes with structured pack movement and recall checks.',
      photo_url: 'https://cdn.pixabay.com/photo/2023/03/19/09/20/animals-7862112_1280.jpg',
      menu_items: [
        { id: '2-1', service_id: '2', name: '90-Minute Group Hike', price: '55', is_add_on_only: false },
        { id: '2-2', service_id: '2', name: '2-Hour Extended Hike', price: '70', is_add_on_only: false },
        { id: '2-3', service_id: '2', name: '10-Hike Package', price: '520', is_add_on_only: false },
      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
    {
      id: '3', profile_id: 'preview', type: 'Private Conditioning Walks',
      description: 'On-leash fitness walks for training or recovery.',
      photo_url: 'https://cdn.pixabay.com/photo/2018/03/28/08/34/outdoors-3268637_1280.jpg',
      menu_items: [
        { id: '3-1', service_id: '3', name: '45-Minute Walk', price: '40', is_add_on_only: false },
        { id: '3-2', service_id: '3', name: '90-Minute Walk', price: '60', is_add_on_only: false },

      ],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    },
  ],
  galleryPhotos: [
    { id: '1', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2017/06/23/23/15/mans-best-friend-2436270_1280.jpg', pet_details: 'Professional dog walking', review: '', owner: '', category: 'hero', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2012/09/28/12/13/dog-58388_1280.jpg', pet_details: 'Quality pet care', review: '', owner: '', category: 'hero', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2022/08/26/20/58/river-7413263_1280.jpg', pet_details: 'Day to day care', review: '', owner: '', category: 'about', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2024/12/25/15/01/weimaraner-9290488_1280.jpg', pet_details: 'Professional service', review: '', owner: '', category: 'about', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '5', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2025/03/04/14/28/dog-9446378_1280.jpg', pet_details: 'Caring service', review: '', owner: '', category: 'about', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '6', profile_id: 'preview', photo_url: 'https://cdn.pixabay.com/photo/2019/11/07/08/40/dog-4608272_1280.jpg', pet_details: 'Expert handling', review: '', owner: '', category: 'about', order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  faqs: [
    { id: '1', profile_id: 'preview', question: 'Are hikes fully off-leash?', answer: 'Yes! Our hikes are fully off-leash and are conducted only in safe, permitted areas.', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', question: 'How many dogs will my pup be hiking with?', answer: 'Each hike accommodates up to a maximum of 6 dogs.', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', question: 'What is your cancellation policy?', answer: 'We require 48 hours notice for cancellations to avoid fees. Emergency situations are handled on a case-by-case basis.', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', question: 'How do I get started?', answer: "Simply contact us to schedule a complimentary meet-and-greet. We'll discuss your pet's needs and ensure we're the right fit.", order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  policies: [
    { id: '1', profile_id: 'preview', title: 'Meet & Greet', description: 'All dogs must complete a meet & greet and evaluation walk before joining group hikes. This assessment ensures reliable recall, comfort in a group setting, and appropriate energy levels. Dogs may be required to complete private walks before advancing to off-leash hikes.', icon: '🤝', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', title: 'Payment', description: 'Payment is required prior to each hike or through prepaid packages. Packages are non-refundable but may be rescheduled with appropriate notice. Digital payments are preferred.', icon: '💳', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', title: 'Health & Safety', description: 'Dogs must be up to date on vaccinations and flea/tick prevention. Dogs showing signs of illness or injury will not be permitted on hikes. Hikes are conducted in permitted areas only, with safety equipment and emergency supplies carried at all times.', icon: '🏥', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  serviceAreas: [
    { id: '1', profile_id: 'preview', name: 'Downtown Boulder', description: '', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', name: 'North Boulder', description: '', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', name: 'Table Mesa', description: '', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '4', profile_id: 'preview', name: 'Gunbarrel', description: '', order: 4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
  reviews: [
    { id: '1', profile_id: 'preview', pet_name: 'Atlas, German Shepherd', photo_url: 'https://cdn.pixabay.com/photo/2022/08/10/08/54/german-shepherd-7376655_1280.jpg', owner_name: 'Mark D.', review: 'Jake is incredible. Atlas needs serious exercise and structure, and these hikes have been a game-changer. He comes home calm and focused. You can tell Jake really knows what he’s doing.', order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '2', profile_id: 'preview', pet_name: 'Luna, Border Collie', photo_url: 'https://cdn.pixabay.com/photo/2020/11/23/18/14/dog-5770580_1280.jpg', owner_name: 'Emily S.', review: 'Tails on Trails is worth every penny. Luna lives for hike days. The communication and photos are great, and I fully trust the safety standards.', order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: '3', profile_id: 'preview', pet_name: 'Buddy, Golden Retriever', photo_url: 'https://cdn.pixabay.com/photo/2022/11/09/10/13/golden-retriever-7580233_1280.jpg', owner_name: 'James W.', review: 'Our senior dog Buddy needs special care, and Tails on Trails provides exactly that. Their expertise with senior pets is outstanding.', order: 3, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
};

export default function ProPublicPreview() {
  return <ProTemplate data={previewData} />;
}
