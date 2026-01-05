import * as React from 'react';

interface InquiryEmailProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
}

export function InquiryEmailTemplate({ firstName, lastName, phoneNumber, message }: InquiryEmailProps) {
    const lastInitial = lastName.substring(0,1) + ".";
  return (
    <div>
      <p>You have a new message from {`${firstName} ${lastInitial}. - ${phoneNumber}:`}.</p>
      <p>{message}</p>
    </div>
  );
}