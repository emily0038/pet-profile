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
        service_type: data.serviceType,
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
        serviceType: data.serviceType,
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
