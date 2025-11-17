import { InquiryEmailTemplate } from '@/components/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Emily from Pets Friendz <no-reply@petsfriendz.com>',
      to: ['emilymoywong@gmail.com'],
      subject: 'Hello world',
      react: InquiryEmailTemplate({ firstName: 'Emily', lastName: 'Wong', phoneNumber: '5555555555', message: 'Hi! I am looking for a new dog walker and wanted to hear more about your services.' }),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return Response.json(data);
  } catch (error) {
    console.error('Caught error:', error);
    return Response.json({ error }, { status: 500 });
  }
}