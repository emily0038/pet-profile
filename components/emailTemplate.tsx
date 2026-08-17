import * as React from 'react';

interface InquiryEmailProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  message: string;
  serviceType?: string;
  foundVia?: string;
}

export function InquiryEmailTemplate({ firstName, lastName, phoneNumber, email, message, serviceType, foundVia }: InquiryEmailProps) {
    const lastInitial = lastName.substring(0,1) + ".";
  return (
    <div>
      <p>You have a new message from {`${firstName} ${lastInitial}. - ${phoneNumber}`}.</p>
      {email && <p><strong>Email:</strong> {email}</p>}
      {serviceType && <p><strong>Service interested in:</strong> {serviceType}</p>}
      {foundVia && <p><strong>How they found you:</strong> {foundVia}</p>}
      {message && <p><strong>Message:</strong> {message}</p>}
      {email && <p style={{ color: '#666', fontSize: '13px' }}>Reply directly to this email to respond to {firstName} at {email}.</p>}
    </div>
  );
}