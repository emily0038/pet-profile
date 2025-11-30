import Header from '@/components/header'
import Image from 'next/image';
import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import GallerySwiper from '@/components/gallerySwiper'
import RequestButton from '@/components/requestButton'
import InquiryButton from '@/components/inquiryButton'
import MeetGreetButton from '@/components/meetGreetButton'

interface MenuItem {
    id: string;
    name: string;
    price: string;
    is_add_on_only: boolean;
}

interface PageProps {
    params: {
        username: string;
    }
}

export default async function PublicProfilePage({ params }: PageProps) {
    const supabase = await createClient()

    // Use username directly from params
    const username = params.username;

    // Get current logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    // Load profile by username (public access, no auth required)
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

    // Show 404 if profile not found
    if (profileError || !profile) {
        notFound()
    }

    // Check if the logged-in user is viewing their own profile
    const isViewMode = user && user.id === profile.user_id;

    // Load gallery photos
    const { data: galleryPhotos } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('profile_id', profile.id)
        .order('"order"', { ascending: true })

    // Load services with menu items
    const { data: services } = await supabase
        .from('services')
        .select(`
            *,
            menu_items:service_menu_items(*)
        `)
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: true })

    // Create default name from first name + last initial
    const lastInitial = profile?.last_name?.[0] || '';
    const defaultName = profile?.first_name
        ? `${profile.first_name} ${lastInitial}${lastInitial ? '.' : ''}`
        : "User Profile";

    const displayName = profile?.display_name || defaultName;

    // Format service types for the RequestButton modal
    const serviceTypes = services?.map(service => ({
        type: service.type,
        items: service.menu_items || [],
    })) || [];

    return (
        <div>
            <Header title={displayName} isViewMode={!!isViewMode} />
            <div className="px-4 py-8 space-y-6">
                <div className="flex flex-wrap items-center gap-4 bg-cover bg-center bg-no-repeat px-4 py-6 mx-[-1rem] mt-8 border-b border-[#9185FF]" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
                    <div className="space-y-4 flex-shrink-0 max-w-[200px] lg:max-w-none">
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
                        ) : (
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#9185FF]">
                                <Image
                                    src={"/person.svg"}
                                    width={192}
                                    height={192}
                                    alt="Default"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {profile.neighborhood && (
                            <p>
                                <span className="bg-[#9185FF] text-white button-style px-2 py-1 rounded box-decoration-clone">
                                    {profile.neighborhood}
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Nested flex container for Services and Meet & Greet Button */}
                    <div className="flex flex-col gap-4 items-start flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row flex-wrap items-start gap-2">
                            {services?.map((service) => (
                                <div key={service.id} className="rounded-lg px-2 py-1 bg-[#9185FF] text-white text-sm button-style whitespace-nowrap">{service.type}</div>
                            ))}
                        </div>
                        <MeetGreetButton
                            profileId={profile.user_id}
                            serviceTypes={services?.map(s => ({ type: s.type })) || []}
                        />
                    </div>
                </div>
                <div>
                    {profile.about_me && (
                        <p className="whitespace-pre-line">{profile.about_me}</p>
                    )}
                </div>
                <h2 className="text-xl font-bold">Previous Clients</h2>
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
                                        <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center">
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
                                                        profileId={profile.user_id}
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
                <div className="flex flex-col justify-center items-center text-center space-y-4 text-white">
                    <p>Got any questions, or want to chat before you book?</p>
                    <InquiryButton profileId={profile.user_id} />
                </div>
            </div>
        </div>
    );
}
