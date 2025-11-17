import Header from '@/components/header'
import Image from 'next/image';
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import GallerySwiper from '@/components/gallerySwiper'
import RequestButton from '@/components/requestButton'
import InquiryButton from '@/components/inquiryButton'

interface MenuItem {
    id: string;
    name: string;
    price: string;
    is_add_on_only: boolean;
}

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



    const displayName = profile?.display_name || "My Profile";

    // Format service types for the RequestButton modal
    const serviceTypes = services?.map(service => ({
        type: service.type,
        items: service.menu_items || [],
    })) || [];

    return (
        <div>
            <Header title={displayName} />
            <div className="px-4 py-8 space-y-6 mt-16">
                <div className="flex flex-wrap items-center gap-4 bg-cover bg-center bg-no-repeat px-4 py-6 mx-[-1rem] mt-[-2rem] border-b border-[#9185FF]" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
                    <div className="space-y-4 flex-shrink-0 max-w-[200px]">
                        {profile.profile_photo_url ? (
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#9185FF]">
                                <Image
                                    src={profile.profile_photo_url}
                                    width={192}
                                    height={192}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )
                        : (
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#9185FF]">
                                <Image
                                    src={"person.svg"}
                                    width={192}
                                    height={192}
                                    alt="Default"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {profile.neighborhood && (
                            <p>
                                <span className="bg-[#9185FF] text-white px-2 py-1 font-bold rounded box-decoration-clone">
                                    {profile.neighborhood}
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Nested flex container for Services and Clients */}
                    <div className="flex flex-wrap gap-4 items-start flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row flex-wrap items-start gap-2">
                            {services?.map((service) => (
                                <div key={service.id} className="rounded-lg px-2 py-1 bg-[#9185FF] text-white text-sm font-bold whitespace-nowrap">{service.type}</div>
                            ))}
                        </div>
                        <div className="px-4 py-4 bg-white border border-[#9185FF] rounded-lg max-w-3xs">
                            <h2 className="text-[#9185FF] font-bold mb-2">Clients</h2>
                        {profile.accepts_cats && (
                            <div className="flex items-center gap-2 p-1">
                                <Image
                                src="/cat-icon.svg"
                                width={32}
                                height={32}
                                alt="Cat"
                                />
                                <span className="text-[#9185FF] font-medium text-sm">Cats</span>
                            </div>
                        )}
                        {profile.accepts_dogs && (
                            <div className="flex items-center gap-2 p-1">
                                <Image
                                src="/dog-icon.svg"
                                width={32}
                                height={32}
                                alt="Dog"
                                />
                                <span className="text-[#9185FF] font-medium text-sm">
                                Dogs {profile.max_weight !== null && `under ${profile.max_weight} lbs`}
                                </span>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
                <div>
                    {profile.about_me && (
                        <p>{profile.about_me}</p>
                    )}
                </div>
                <GallerySwiper photos={galleryPhotos || []} />
                <div className="space-y-6 py-4">
                    {services?.map((service) => (
                        <div key={service.id} className="space-y-2">
                            <h2 className="text-xl font-bold">{service.type}</h2>
                            {service.description && (
                                <p>{service.description}</p>
                            )}
                            {service.menu_items && service.menu_items.length > 0 && (
                                <div className="space-y-2">
                                    {service.menu_items?.map((item: MenuItem) => (
                                        <div key={item.id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center">
                                            <div className="min-w-0">
                                                <div className="break-words">
                                                    <span className="font-medium">{item.name}</span>
                                                    {item.is_add_on_only && (
                                                        <span className="ml-2 text-xs">(Add-on only)</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center w-[60px]">
                                                {item.price && (
                                                    <span>${item.price}</span>
                                                )}
                                            </div>
                                            <div className="w-[80px]">
                                                {!item.is_add_on_only && (
                                                    <RequestButton
                                                        profileId={user.id}
                                                        serviceTypes={serviceTypes}
                                                        prefilledServiceType={service.type}
                                                        prefilledService={item.name}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center space-y-4 text-white">
                    <p>Got any questions, or want to chat before you book?</p>
                    <InquiryButton profileId={user.id} />
                </div>
            </div>
        </div>
    );
}