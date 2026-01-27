'use server'

import { createClient } from '@/utils/supabase/server'
import { Resend } from 'resend'
import { InquiryEmailTemplate } from '@/components/emailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SubmitInquiryData {
  profileId: string
  firstName: string
  lastName: string
  phoneNumber: string
  message: string
  serviceType?: string
}

export async function submitInquiry(data: SubmitInquiryData) {
  console.log('[submitInquiry] Starting with profileId:', data.profileId)

  const supabase = await createClient()
  console.log('[submitInquiry] Supabase client created')

  try {
    // Get profile owner's email from profiles table
    console.log('[submitInquiry] Fetching profile...')
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, email, first_name, last_name')
      .eq('user_id', data.profileId)
      .single()

    if (profileError) {
      console.error('[submitInquiry] Profile fetch error:', profileError)
      throw new Error(`Profile fetch failed: ${profileError.message}`)
    }

    if (!profile) {
      console.error('[submitInquiry] No profile found for user_id:', data.profileId)
      throw new Error('Profile not found')
    }

    if (!profile.email) {
      console.error('[submitInquiry] Profile has no email:', profile)
      throw new Error('Profile email missing')
    }

    console.log('[submitInquiry] Profile found, email:', profile.email)

    // Insert inquiry record
    console.log('[submitInquiry] Inserting inquiry...')
    const { error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        profile_id: data.profileId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        message: data.message,
        service_type: data.serviceType,
      })

    if (inquiryError) {
      console.error('[submitInquiry] Inquiry insert error:', inquiryError)
      throw new Error(`Failed to create inquiry: ${inquiryError.message}`)
    }

    console.log('[submitInquiry] Inquiry inserted successfully')

    // Send email notification
    console.log('[submitInquiry] Sending email to:', profile.email)
    const { error: emailError } = await resend.emails.send({
      from: 'Pets Friendz <no-reply@petsfriendz.com>',
      to: [profile.email],
      subject: `New Inquiry from ${data.firstName} ${data.lastName}`,
      react: InquiryEmailTemplate({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        message: data.message,
        serviceType: data.serviceType,
      }),
    })

    if (emailError) {
      console.error('[submitInquiry] Email send error:', emailError)
      // Don't fail the inquiry if email fails - inquiry is still saved
    } else {
      console.log('[submitInquiry] Email sent successfully')
    }

    console.log('[submitInquiry] Complete - success')
    return { success: true }
  } catch (error) {
    console.error('[submitInquiry] FAILED with error:', error)
    throw error
  }
}
