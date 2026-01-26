import * as React from 'react';

interface InquiryEmailProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
  serviceType?: string;
}

export function InquiryEmailTemplate({ firstName, lastName, phoneNumber, message, serviceType }: InquiryEmailProps) {
    const lastInitial = lastName.substring(0,1) + ".";
  return (
    <div>
      <p>You have a new message from {`${firstName} ${lastInitial}. - ${phoneNumber}`}.</p>
      {serviceType && <p><strong>Service interested in:</strong> {serviceType}</p>}
      {message && <p><strong>Message:</strong> {message}</p>}
    </div>
  );
}