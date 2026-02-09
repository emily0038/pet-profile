import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, html } = body;

    if (!subject || !html) {
      return Response.json(
        { error: 'Missing required fields: subject, html' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Pets Friendz <no-reply@petsfriendz.com>',
      to: ['emily@petsfriendz.com'],
      subject,
      html,
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