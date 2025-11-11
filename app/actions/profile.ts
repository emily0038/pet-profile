'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Types for services
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
  menu_items: ServiceMenuItem[];
}

export async function updateProfilePhoto(photoUrl: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Update the profile_photo_url in the profiles table
  const { error } = await supabase
    .from('profiles')
    .update({ profile_photo_url: photoUrl })
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update profile photo: ' + error.message)
  }

  // Refresh the page data
  revalidatePath('/editor')
  revalidatePath('/profile')
}

export async function updateAboutMe(text: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      about_me: text,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update about me: ' + error.message)
  }

  revalidatePath('/editor')
  revalidatePath('/profile')
}

export async function updateAcceptedClients(data: {
  acceptsCats: boolean
  acceptsDogs: boolean
  maxWeight: number | null
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      accepts_cats: data.acceptsCats,
      accepts_dogs: data.acceptsDogs,
      max_weight: data.maxWeight,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update accepted clients: ' + error.message)
  }

  revalidatePath('/editor')
  revalidatePath('/profile')
}

export async function addGalleryPhotos(profileId: string, photoUrls: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get current max order
  const { data: existingPhotos } = await supabase
    .from('gallery_photos')
    .select('"order"')
    .eq('profile_id', profileId)
    .order('"order"', { ascending: false })
    .limit(1)

  const startOrder = existingPhotos?.[0]?.order ?? 0

  // Insert new photos
  const photosToInsert = photoUrls.map((url, index) => ({
    profile_id: profileId,
    photo_url: url,
    order: startOrder + index + 1
  }))

  const { error } = await supabase
    .from('gallery_photos')
    .insert(photosToInsert)

  if (error) {
    throw new Error('Failed to add gallery photos: ' + error.message)
  }

  revalidatePath('/editor')
  revalidatePath('/profile')
}

export async function deleteGalleryPhoto(photoId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('gallery_photos')
    .delete()
    .eq('id', photoId)

  if (error) {
    throw new Error('Failed to delete photo: ' + error.message)
  }

  revalidatePath('/editor')
  revalidatePath('/profile')
}

export async function updateNeighborhood(text: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      neighborhood: text,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)

  if (error) {
    throw new Error('Failed to update neighborhood: ' + error.message)
  }

  revalidatePath('/editor')
  revalidatePath('/profile')
}

// Service actions - using SQL for efficient database operations
export async function saveService(service: ServiceWithItems) {
  let start = Date.now();

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  console.log("auth: ", Date.now() - start);
  start = Date.now();

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

  console.log("get profile: ", Date.now() - start);
  start = Date.now();

  // Check if service exists by type (using SQL WHERE clause, not JavaScript .find())
  const { data: existingService } = await supabase
    .from('services')
    .select('id')
    .eq('profile_id', profile.id)
    .eq('type', service.type)
    .maybeSingle()
  
  console.log("check existing service: ", Date.now() - start);
  start = Date.now();

  let serviceId: string

  if (existingService) {
    // UPDATE existing service (SQL handles the lookup)
    const { error } = await supabase
      .from('services')
      .update({
        description: service.description,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingService.id)

    if (error) {
      throw new Error('Failed to update service: ' + error.message)
    }

    serviceId = existingService.id
  } else {
    // INSERT new service
    const { data: newService, error } = await supabase
      .from('services')
      .insert({
        profile_id: profile.id,
        type: service.type,
        description: service.description
      })
      .select('id')
      .single()

    if (error || !newService) {
      throw new Error('Failed to create service: ' + error?.message)
    }

    serviceId = newService.id
  }

  // Handle menu items - delete all and re-insert (simpler approach)
  if (service.menu_items.length > 0) {
    const menuItemsToSave = service.menu_items
      .filter(item => item.name.trim() !== '') // Only save items with names
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

    // Insert all menu items (will get new IDs)
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
  revalidatePath('/profile')
}

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
  revalidatePath('/profile')
}