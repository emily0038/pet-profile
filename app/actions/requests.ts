'use server'

import { createClient } from '@/utils/supabase/server'
import { Resend } from 'resend'
import { RequestEmail, InquiryEmailTemplate } from '@/components/emailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ServiceRequest {
  serviceType: string
  menuItem: string
  isAddOn: boolean
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  pickupSpot: string
}

interface SubmitRequestData {
  profileId: string
  services: ServiceRequest[]
  petDetails: string
  firstName: string
  lastName: string
  phoneNumber: string
  message: string
}

export async function submitServiceRequest(data: SubmitRequestData) {
  const supabase = await createClient()

  try {
    // Get profile owner's email from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, email, first_name, last_name')
      .eq('user_id', data.profileId)
      .single()

    if (profileError || !profile || !profile.email) {
      throw new Error('Profile not found or email missing')
    }

    // Insert main request record
    const { data: requestRecord, error: requestError } = await supabase
      .from('service_requests')
      .insert({
        profile_id: data.profileId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        pet_details: data.petDetails,
        message: data.message || null,
      })
      .select()
      .single()

    if (requestError || !requestRecord) {
      throw new Error('Failed to create service request')
    }

    // Insert service request items
    const serviceItems = data.services.map(service => ({
      request_id: requestRecord.id,
      service_type: service.serviceType,
      menu_item: service.menuItem,
      start_date: service.startDate || null,
      start_time: service.startTime || null,
      end_date: service.endDate || null,
      end_time: service.endTime || null,
      pickup_spot: service.pickupSpot || null,
    }))

    const { error: itemsError } = await supabase
      .from('service_request_items')
      .insert(serviceItems)

    if (itemsError) {
      // Rollback: delete the main request if items fail
      await supabase
        .from('service_requests')
        .delete()
        .eq('id', requestRecord.id)

      throw new Error('Failed to create service request items')
    }

    // Format services for email
    const requestedServices = data.services.map(service => ({
      serviceType: service.serviceType,
      menuItem: service.menuItem,
      startDate: service.startDate,
      startTime: service.startTime,
      endDate: service.endDate,
      endTime: service.endTime,
      pickupSpot: service.pickupSpot,
    }))

    // Send email notification
    const { error: emailError } = await resend.emails.send({
      from: 'Pets Friendz <no-reply@petsfriendz.com>',
      to: [profile.email],
      subject: `New Service Request from ${data.firstName} ${data.lastName}`,
      react: RequestEmail({
        requestedServices,
        petDetails: data.petDetails,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        message: data.message,
      }),
    })

    if (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the request if email fails - request is still saved
    }

    return { success: true }
  } catch (error) {
    console.error('Error submitting service request:', error)
    throw error
  }
}

interface SubmitInquiryData {
  profileId: string
  firstName: string
  lastName: string
  phoneNumber: string
  message: string
}

export async function submitInquiry(data: SubmitInquiryData) {
  const supabase = await createClient()

  try {
    // Get profile owner's email from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, email, first_name, last_name')
      .eq('user_id', data.profileId)
      .single()

    if (profileError || !profile || !profile.email) {
      throw new Error('Profile not found or email missing')
    }

    // Insert inquiry record
    const { error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        profile_id: data.profileId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        message: data.message,
      })

    if (inquiryError) {
      throw new Error('Failed to create inquiry')
    }

    // Send email notification
    const { error: emailError } = await resend.emails.send({
      from: 'Pets Friendz <no-reply@petsfriendz.com>',
      to: [profile.email],
      subject: `New Inquiry from ${data.firstName} ${data.lastName}`,
      react: InquiryEmailTemplate({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        message: data.message,
      }),
    })

    if (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the inquiry if email fails - inquiry is still saved
    }

    return { success: true }
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    throw error
  }
}
