import Header from '@/components/header'
import Image from 'next/image';
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import GallerySwiper from '@/components/gallerySwiper'

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

    

    return (
        <div>
            <Header title="Emily's Profile" />
            <div className="px-4 py-8 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="space-y-4 order-0 max-w-[50%] min-w-[200px]">
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
                            <p><b>Service area:</b> {profile.neighborhood}</p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap items-start gap-2 order-1 max-w-[33%] min-w-[100px]">
                        {services?.map((service) => (
                            <div key={service.id} className="rounded-lg px-2 py-1 border border-[#9185FF] bg-[#E4E1FF] text-[#878787] text-sm font-bold whitespace-nowrap">{service.type}</div>
                        ))}
                    </div>
                    <div className="space-y-2 min-w-[100px] order-2 ml-4">
                        {profile.accepts_cats && (
                            <div className="flex items-center gap-2 p-1">
                                <Image
                                src="/cat-icon.svg"
                                width={32}
                                height={32}
                                alt="Cat"
                                />
                                <span className="text-[#9185FF] font-medium">Cats</span>
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
                                <span className="text-[#9185FF] font-medium">
                                Dogs {profile.max_weight !== null && `under ${profile.max_weight} lbs`}
                                </span>
                            </div>
                        )}
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
                                        <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center">
                                            <div className="min-w-0">
                                                <div className="break-words">
                                                    <span className="font-medium">{item.name}</span>
                                                    {item.is_add_on_only && (
                                                        <span className="ml-2 text-xs">(Add-on only)</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center min-w-[60px]">
                                                {item.price && (
                                                    <span>${item.price}</span>
                                                )}
                                            </div>
                                            <div>
                                                <button className="rounded-sm px-2 py-1 border border-[#9185FF] bg-[#E4E1FF] text-[#878787] text-sm font-bold whitespace-nowrap">Request</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <p>Got any questions, or want to chat before you book?</p>
                    <button className="rounded-sm px-4 py-2 bg-[#9185FF] font-semibold">Get In Touch</button>
                </div>
            </div>
        </div>
    );
}