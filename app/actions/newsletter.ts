'use server'

import { createClient } from '@/utils/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(email: string) {
  try {
    const supabase = await createClient()

    // Insert email into database
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })

    if (dbError) {
      // Check if email already exists
      if (dbError.code === '23505') {
        return { success: false, message: 'This email is already subscribed!' }
      }
      throw dbError
    }

    // Send confirmation email via Resend
    try {
      await resend.emails.send({
        from: 'Pets Friendz <noreply@petsfriendz.com>', // Update with your verified domain
        to: email,
        subject: 'Welcome to Pets Friendz Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll be the first to know about:</p>
            <ul>
              <li>Platform updates and new features</li>
              <li>Pet sitting tips and best practices</li>
              <li>Success stories from our community</li>
              <li>Special offers and promotions</li>
            </ul>
            <p>We're excited to have you in our community!</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you didn't subscribe to this newsletter, you can safely ignore this email.
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      // Log email error but don't fail the subscription
      console.error('Failed to send confirmation email:', emailError)
      // Subscription still succeeded, just email failed
    }

    return { success: true, message: 'Thanks for subscribing!' }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
