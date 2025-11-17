import Link from 'next/link'
import Header from '@/components/header'
import UploadProfilePhoto from '@/components/uploadProfilePhoto'
import PortfolioGallery from '@/components/uploadGallery'
import AboutMe from '@/components/aboutMe'
import AcceptedClients from '@/components/acceptedClients'
import Neighborhood from '@/components/neighborhood'
import ServicesOffered from '@/components/servicesOffered'
import DisplayName from '@/components/displayName'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { updateProfilePhoto, addGalleryPhotos, deleteGalleryPhoto, updateAboutMe, updateAcceptedClients, updateNeighborhood, saveService, deleteService, updateDisplayName } from '@/app/actions/profile'

export default async function Page() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Load user's profile - should also load aboutMe and acceptedClients
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Load user's gallery photos
  const { data: galleryPhotos } = await supabase
    .from('gallery_photos')
    .select('*')
    .eq('profile_id', profile?.id)
    .order('"order"', { ascending: true })

  // Load user's services with menu items
    const { data: services } = await supabase
    .from('services')
    .select(`
      *,
      menu_items:service_menu_items(*)
    `)
    .eq('profile_id', profile?.id)
    .order('created_at', { ascending: true })

  return (
    <div>
      <Header title="Editor" />
      <div className="px-8 py-8 space-y-4 mt-16">
        <div className="space-y-2">
          <h1>Profile photo</h1>
          <h2>Share a photo of yourself for prospective clients</h2>
          <UploadProfilePhoto
            initialPhoto={profile?.profile_photo_url}
            onPhotoSave={updateProfilePhoto}
          />
        </div>
        <div className="space-y-2">
          <h1>Display Name</h1>
          <h2>Choose how your name appears on your profile</h2>
          <DisplayName
            onTextSave={updateDisplayName}
            initialText={profile?.display_name}
          />
        </div>
        <div className="space-y-2">
          <h1>Portfolio</h1>
          <h2>Showcase your space and happy clients</h2>
          <PortfolioGallery
            initialPhotos={galleryPhotos || []}
            onPhotosSave={async (photoUrls) => {
              'use server'
              if (profile?.id) {
                await addGalleryPhotos(profile.id, photoUrls)
              }
            }}
            onPhotoDelete={deleteGalleryPhoto}
          />
        </div>
        <div className="space-y-2">
          <h1>About Me</h1>
          <h2>Tell clients about yourself, your experience, and what makes you stand out</h2>
          <AboutMe 
            onTextSave={updateAboutMe}
            initialText={profile?.about_me}/>
        </div>
        <div className="space-y-2">
          <h1>Accepted Clients</h1>
          <AcceptedClients
            onSave={updateAcceptedClients}
            initialData={{
              acceptsCats: profile?.accepts_cats ?? false,
              acceptsDogs: profile?.accepts_dogs ?? false,
              maxWeight: profile?.max_weight ?? 40,
            }}
          />
        </div>
        <div className="space-y-2">
          <h1>Neighborhood(s)</h1>
          <Neighborhood
            onTextSave={updateNeighborhood}
            initialText={profile?.neighborhood}
          />
        </div>
        <div className="space-y-2">
          <h1>Services Offered</h1>
          <h2>List the services you provide with pricing options</h2>
          <ServicesOffered
            onSave={saveService}
            onDelete={deleteService}
            initialServices={services || []}
          />
        </div>
        <Link href="/profile"><button className="bg-[#9185FF] rounded-md py-2 w-full hover:bg-[#5B4FC6]">View Profile</button></Link>
      </div>
    </div>
  )
}