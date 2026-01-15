import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { getTemplateComponent } from '@/lib/templates/registry'
import { TemplateData } from '@/lib/templates/types'
import { getProfileUrl } from '@/utils/url'

interface PageProps {
    params: {
        username: string;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const supabase = await createClient()
    const domain = params.username

    const { data: profile } = await supabase
        .from('profiles')
        .select('business_name, tagline, logo_url, domain')
        .eq('domain', domain)
        .single()

    if (!profile) {
        return {
            title: 'Profile Not Found',
        }
    }

    const canonicalUrl = getProfileUrl(profile.domain)

    return {
        title: profile.business_name || 'Pet Care Services',
        description: profile.tagline || 'Professional pet care services',
        icons: profile.logo_url ? {
            icon: profile.logo_url,
            apple: profile.logo_url,
        } : undefined,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: profile.business_name || 'Pet Care Services',
            description: profile.tagline || 'Professional pet care services',
            url: canonicalUrl,
            images: profile.logo_url ? [profile.logo_url] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: profile.business_name || 'Pet Care Services',
            description: profile.tagline || 'Professional pet care services',
            images: profile.logo_url ? [profile.logo_url] : [],
        },
    }
}

export default async function PublicProfilePage({ params }: PageProps) {
    const supabase = await createClient()

    // Use domain directly from params
    const domain = params.username;

    // Get current logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    // Load profile by domain (public access, no auth required)
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('domain', domain)
        .single()

    // Show 404 if profile not found
    if (profileError || !profile) {
        notFound()
    }

    // Check if the logged-in user is viewing their own profile
    const isViewMode = user && user.id === profile.user_id;

    // Show 404 if page is not published (template_id is null) and user is not the owner
    if (!profile.template_id && !isViewMode) {
        notFound()
    }

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

    // Load FAQs
    const { data: faqs } = await supabase
        .from('faqs')
        .select('*')
        .eq('profile_id', profile.id)
        .order('"order"', { ascending: true })

    // Load policies
    const { data: policies } = await supabase
        .from('policies')
        .select('*')
        .eq('profile_id', profile.id)
        .order('"order"', { ascending: true })

    // Load service areas
    const { data: serviceAreas } = await supabase
        .from('service_areas')
        .select('*')
        .eq('profile_id', profile.id)
        .order('"order"', { ascending: true })

    // Load reviews
    const { data: reviews } = await supabase
        .from('reviews')
        .select('*')
        .eq('profile_id', profile.id)
        .order('"order"', { ascending: true })

    // Get the template ID
    const templateId = profile.template_id;

    // Show 404 if no template is selected (must choose a template to publish)
    if (!templateId) {
        notFound();
    }

    // Get the template component
    const TemplateComponent = getTemplateComponent(templateId);

    // Show 404 if template doesn't exist
    if (!TemplateComponent) {
        notFound();
    }

    // Prepare template data
    const templateData: TemplateData = {
        profile,
        services: services || [],
        galleryPhotos: galleryPhotos || [],
        faqs: faqs || [],
        policies: policies || [],
        serviceAreas: serviceAreas || [],
        reviews: reviews || [],
    };

    return <TemplateComponent data={templateData} />;
}
