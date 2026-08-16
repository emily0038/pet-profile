'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Upload a photo to Supabase Storage and return the public URL
 */
export async function uploadPhoto(file: FormData, bucket: string = 'profile-photos') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const fileData = file.get('file') as File
  if (!fileData) {
    throw new Error('No file provided')
  }

  // Create a unique filename
  const fileExt = fileData.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${fileExt}`

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, fileData, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error('Failed to upload photo: ' + error.message)
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrl
}

/**
 * Update business logo
 */
export async function updateBusinessLogo(logoUrl: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      logo_url: logoUrl,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update logo: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Update business name
 */
export async function updateBusinessName(businessName: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      business_name: businessName,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update business name: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Update header section (logo + business name)
 */
export async function updateHeaderSection(data: {
  logo_url?: string
  business_name?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const updateData: Record<string, string> = {
    updated_at: new Date().toISOString()
  }

  if (data.logo_url !== undefined) {
    updateData.logo_url = data.logo_url
  }

  if (data.business_name !== undefined) {
    updateData.business_name = data.business_name
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update header: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Save a gallery photo with category and order
 */
export async function saveGalleryPhoto(data: {
  photoUrl: string
  category: string
  order: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's profile ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  // Check if a photo already exists for this category and order
  const { data: existingPhoto } = await supabase
    .from('gallery_photos')
    .select('id')
    .eq('profile_id', profile.id)
    .eq('category', data.category)
    .eq('"order"', data.order)
    .maybeSingle()

  if (existingPhoto) {
    // Update existing photo
    const { error } = await supabase
      .from('gallery_photos')
      .update({
        photo_url: data.photoUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingPhoto.id)

    if (error) {
      throw new Error('Failed to update gallery photo: ' + error.message)
    }
  } else {
    // Insert new photo
    const { error } = await supabase
      .from('gallery_photos')
      .insert({
        profile_id: profile.id,
        photo_url: data.photoUrl,
        category: data.category,
        order: data.order,
        created_at: new Date().toISOString()
      })

    if (error) {
      throw new Error('Failed to insert gallery photo: ' + error.message)
    }
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Delete a gallery photo by category and order
 */
export async function deleteGalleryPhoto(data: {
  category: string
  order: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's profile ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  const { error } = await supabase
    .from('gallery_photos')
    .delete()
    .eq('profile_id', profile.id)
    .eq('category', data.category)
    .eq('"order"', data.order)

  if (error) {
    throw new Error('Failed to delete gallery photo: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Update hero section (tagline only - images go to gallery_photos with category='hero')
 */
export async function updateHeroSection(data: {
  tagline?: string
  featured_image_1?: string
  featured_image_2?: string
  featured_image_3?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's profile ID for saving photos
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  // Update tagline in profiles table
  if (data.tagline !== undefined) {
    const { error } = await supabase
      .from('profiles')
      .update({
        tagline: data.tagline,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)

    if (error) {
      throw new Error('Failed to update tagline: ' + error.message)
    }
  }

  // Save images to gallery_photos with category='hero'
  const images = [
    { url: data.featured_image_1, order: 1 },
    { url: data.featured_image_2, order: 2 },
    { url: data.featured_image_3, order: 3 }
  ]

  for (const img of images) {
    if (img.url !== undefined) {
      await saveGalleryPhoto({
        photoUrl: img.url,
        category: 'hero',
        order: img.order
      })
    }
  }

  revalidatePath('/editor')

  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Update about section (about_business only - images go to gallery_photos with category='about')
 */
export async function updateAboutSection(data: {
  business_pitch?: string
  day_to_day_image_1?: string
  day_to_day_image_2?: string
  day_to_day_image_3?: string
  day_to_day_image_4?: string
  day_to_day_image_5?: string
  day_to_day_image_6?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's profile ID for saving photos
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  // Update about_business in profiles table
  if (data.business_pitch !== undefined) {
    const { error } = await supabase
      .from('profiles')
      .update({
        about_business: data.business_pitch,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)

    if (error) {
      throw new Error('Failed to update about business: ' + error.message)
    }
  }

  // Save images to gallery_photos with category='about'
  const images = [
    { url: data.day_to_day_image_1, order: 1 },
    { url: data.day_to_day_image_2, order: 2 },
    { url: data.day_to_day_image_3, order: 3 },
    { url: data.day_to_day_image_4, order: 4 },
    { url: data.day_to_day_image_5, order: 5 },
    { url: data.day_to_day_image_6, order: 6 }
  ]

  for (const img of images) {
    if (img.url !== undefined) {
      await saveGalleryPhoto({
        photoUrl: img.url,
        category: 'about',
        order: img.order
      })
    }
  }

  revalidatePath('/editor')

  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Update personal section
 */
export async function updatePersonalSection(data: {
  profile_photo_url?: string
  personal_tagline?: string
  bio?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const updateData: Record<string, string> = {
    updated_at: new Date().toISOString()
  }

  if (data.profile_photo_url !== undefined) {
    updateData.profile_photo_url = data.profile_photo_url
  }

  if (data.personal_tagline !== undefined) {
    updateData.personal_tagline = data.personal_tagline
  }

  if (data.bio !== undefined) {
    updateData.about_me = data.bio
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update personal section: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Update contact section
 */
export async function updateContactSection(data: {
  phone?: string
  email?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const updateData: Record<string, string> = {
    updated_at: new Date().toISOString()
  }

  if (data.phone !== undefined) {
    updateData.phone_number_alt = data.phone
  }

  if (data.email !== undefined) {
    updateData.email_alt = data.email
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update contact section: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Update custom section (free-text heading + body)
 */
export async function updateCustomSection(data: {
  custom_section_heading?: string
  custom_section_body?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const updateData: Record<string, string> = {
    updated_at: new Date().toISOString()
  }

  if (data.custom_section_heading !== undefined) {
    updateData.custom_section_heading = data.custom_section_heading
  }

  if (data.custom_section_body !== undefined) {
    updateData.custom_section_body = data.custom_section_body
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update custom section: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Update service areas section
 */
export async function updateServiceAreasSection(data: {
  service_area?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const updateData: Record<string, string> = {
    updated_at: new Date().toISOString()
  }

  if (data.service_area !== undefined) {
    updateData.service_area = data.service_area
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update service areas: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Create or update a review
 */
export async function saveReview(data: {
  id?: string
  pet_name: string
  photo_url?: string
  owner_name: string
  review: string
  order: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's profile ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  const reviewData = {
    profile_id: profile.id,
    pet_name: data.pet_name,
    photo_url: data.photo_url || null,
    owner_name: data.owner_name,
    review: data.review,
    order: data.order,
    updated_at: new Date().toISOString()
  }

  let result
  if (data.id) {
    // Update existing review
    const { data: updated, error } = await supabase
      .from('reviews')
      .update(reviewData)
      .eq('id', data.id)
      .select()
      .single()

    if (error) {
      throw new Error('Failed to update review: ' + error.message)
    }
    result = updated
  } else {
    // Insert new review
    const { data: inserted, error } = await supabase
      .from('reviews')
      .insert({ ...reviewData, created_at: new Date().toISOString() })
      .select()
      .single()

    if (error) {
      throw new Error('Failed to create review: ' + error.message)
    }
    result = inserted
  }

  revalidatePath('/editor')

  return { success: true, review: result }
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  if (error) {
    throw new Error('Failed to delete review: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Service types
 */
interface ServiceMenuItem {
  id?: string;
  service_id?: string;
  name: string;
  price: string;
  is_add_on_only: boolean;
}

interface ServiceWithItems {
  id?: string;
  profile_id?: string;
  type: string;
  description?: string;
  photo_url?: string;
  menu_items: ServiceMenuItem[];
}

/**
 * Create or update a service with its menu items
 */
export async function saveService(service: ServiceWithItems) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get the user's profile_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  // Check if service exists by type
  const { data: existingService } = await supabase
    .from('services')
    .select('id')
    .eq('profile_id', profile.id)
    .eq('type', service.type)
    .maybeSingle()

  let serviceId: string

  if (existingService) {
    // Update existing service
    const { error } = await supabase
      .from('services')
      .update({
        description: service.description,
        photo_url: service.photo_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingService.id)

    if (error) {
      throw new Error('Failed to update service: ' + error.message)
    }

    serviceId = existingService.id
  } else {
    // Insert new service
    const { data: newService, error } = await supabase
      .from('services')
      .insert({
        profile_id: profile.id,
        type: service.type,
        description: service.description,
        photo_url: service.photo_url
      })
      .select('id')
      .single()

    if (error || !newService) {
      throw new Error('Failed to create service: ' + error?.message)
    }

    serviceId = newService.id
  }

  // Handle menu items - delete all and re-insert
  if (service.menu_items.length > 0) {
    const menuItemsToSave = service.menu_items
      .filter(item => item.name.trim() !== '')
      .map(item => ({
        service_id: serviceId,
        name: item.name,
        price: item.price,
        is_add_on_only: item.is_add_on_only
      }))

    // Delete all existing menu items for this service
    if (existingService) {
      await supabase
        .from('service_menu_items')
        .delete()
        .eq('service_id', serviceId)
    }

    // Insert all menu items
    if (menuItemsToSave.length > 0) {
      const { error } = await supabase
        .from('service_menu_items')
        .insert(menuItemsToSave)

      if (error) {
        throw new Error('Failed to save menu items: ' + error.message)
      }
    }
  } else if (existingService) {
    // If no menu items provided but service exists, delete all menu items
    await supabase
      .from('service_menu_items')
      .delete()
      .eq('service_id', serviceId)
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Delete a service
 */
export async function deleteService(serviceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Delete the service - CASCADE will automatically delete menu items
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', serviceId)

  if (error) {
    throw new Error('Failed to delete service: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Create or update a FAQ
 */
export async function saveFaq(data: {
  id?: string
  question: string
  answer: string
  order: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's profile ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  const faqData = {
    profile_id: profile.id,
    question: data.question,
    answer: data.answer,
    order: data.order,
    updated_at: new Date().toISOString()
  }

  let result
  if (data.id) {
    // Update existing FAQ
    const { data: updated, error } = await supabase
      .from('faqs')
      .update(faqData)
      .eq('id', data.id)
      .select()
      .single()

    if (error) {
      throw new Error('Failed to update FAQ: ' + error.message)
    }
    result = updated
  } else {
    // Insert new FAQ
    const { data: inserted, error } = await supabase
      .from('faqs')
      .insert({ ...faqData, created_at: new Date().toISOString() })
      .select()
      .single()

    if (error) {
      throw new Error('Failed to create FAQ: ' + error.message)
    }
    result = inserted
  }

  revalidatePath('/editor')

  return { success: true, faq: result }
}

/**
 * Delete a FAQ
 */
export async function deleteFaq(faqId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', faqId)

  if (error) {
    throw new Error('Failed to delete FAQ: ' + error.message)
  }

  revalidatePath('/editor')

  return { success: true }
}

/**
 * Save or update a policy
 */
export async function savePolicy(data: {
  id?: string
  title: string
  description: string
  icon: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's profile ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    throw new Error('Profile not found')
  }

  const policyData = {
    profile_id: profile.id,
    title: data.title,
    description: data.description,
    icon: data.icon,
    updated_at: new Date().toISOString()
  }

  // Always use upsert to handle both insert and update cases
  const { data: result, error } = await supabase
    .from('policies')
    .upsert(
      {
        ...(data.id && { id: data.id }),
        ...policyData,
        created_at: new Date().toISOString()
      },
      { onConflict: 'profile_id,title' }
    )
    .select()
    .maybeSingle()

  if (error) {
    throw new Error('Failed to save policy: ' + error.message)
  }

  if (!result) {
    throw new Error('Failed to save policy: No data returned')
  }

  revalidatePath('/editor')

  return { success: true, policy: result }
}

/**
 * Update the published template for the current user's profile
 */
export async function updateTemplateId(templateId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get the user's profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, domain')
    .eq('user_id', user.id)
    .single()

  if (profileError || !profile) {
    throw new Error('Profile not found')
  }

  // Update the template_id
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ template_id: templateId })
    .eq('id', profile.id)

  if (updateError) {
    throw new Error('Failed to update template: ' + updateError.message)
  }

  // Revalidate the user's public profile page
  revalidatePath(`/${profile.domain}`)
  revalidatePath('/editor')

  return { success: true, username: profile.domain }
}

/**
 * Update profile theme
 */
export async function updateTheme(theme: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, domain')
    .eq('user_id', user.id)
    .single()

  if (profileError || !profile) {
    throw new Error('Profile not found')
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      theme: theme || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', profile.id)

  if (updateError) {
    throw new Error('Failed to update theme: ' + updateError.message)
  }

  revalidatePath(`/${profile.domain}`)
  revalidatePath('/editor')

  return { success: true }
}
