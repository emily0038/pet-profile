import * as React from 'react';

interface serviceRequest {
  serviceType: string;
  menuItem: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  pickupSpot?: string;
}

interface RequestEmailProps {
  requestedServices: serviceRequest[];
  petDetails: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;

}

interface InquiryEmailProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;

}

export function RequestEmail({ requestedServices, petDetails, firstName, lastName, phoneNumber, message }: RequestEmailProps) {
    const lastInitial = lastName.substring(0,1) + ".";

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #9185FF', paddingBottom: '10px' }}>
        New Service Request
      </h2>

      <p style={{ fontSize: '16px', color: '#555' }}>
        You have a new request from <strong>{firstName} {lastInitial}</strong> - {phoneNumber}
      </p>

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h3 style={{ color: '#9185FF', marginTop: '0' }}>Requested Services:</h3>
        {requestedServices.map((service, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
            <p style={{ margin: '5px 0' }}>
              <strong>Service {index + 1}:</strong> {service.serviceType} - {service.menuItem}
            </p>
            {service.startDate && (
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Date/Time:</strong> {service.startDate} at {service.startTime}
                {service.endDate && ` → ${service.endDate} at ${service.endTime}`}
              </p>
            )}
            {service.pickupSpot && (
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Pickup Spot:</strong> {service.pickupSpot}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{ margin: '10px 0' }}>
          <strong>Pet Details:</strong> {petDetails}
        </p>
      </div>

      {message && (
        <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 10px 0' }}><strong>Message:</strong></p>
          <p style={{ margin: '0', color: '#666' }}>{message}</p>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e4e1ff', borderRadius: '8px' }}>
        <p style={{ margin: '5px 0' }}><strong>Contact Information:</strong></p>
        <p style={{ margin: '5px 0' }}>Name: {firstName} {lastName}</p>
        <p style={{ margin: '5px 0' }}>Phone: {phoneNumber}</p>
      </div>
    </div>
  );
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

interface MeetingTime {
  date: string;
  startTime: string;
  endTime: string;
}

interface MeetGreetEmailProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  selectedServices: string[];
  meetingTimes: MeetingTime[];
  meetingSpot: string;
  petDetails: string;
  message: string;
}

export function MeetGreetEmailTemplate({
  firstName,
  lastName,
  phoneNumber,
  selectedServices,
  meetingTimes,
  meetingSpot,
  petDetails,
  message
}: MeetGreetEmailProps) {
  const lastInitial = lastName.substring(0, 1) + ".";

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #9185FF', paddingBottom: '10px' }}>
        New Meet & Greet Request
      </h2>

      <p style={{ fontSize: '16px', color: '#555' }}>
        You have a new meet & greet request from <strong>{firstName} {lastInitial}</strong> - {phoneNumber}
      </p>

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h3 style={{ color: '#9185FF', marginTop: '0' }}>Services Interested In:</h3>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          {selectedServices.map((service, index) => (
            <li key={index} style={{ margin: '5px 0', color: '#666' }}>{service}</li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h3 style={{ color: '#9185FF', marginTop: '0' }}>Available Time Blocks:</h3>
        {meetingTimes.map((time, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
            <p style={{ margin: '0', color: '#666' }}>
              {time.date} from {time.startTime} to {time.endTime}
            </p>
          </div>
        ))}
      </div>

      {meetingSpot && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ margin: '10px 0' }}>
            <strong>Meeting Spot:</strong> {meetingSpot}
          </p>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <p style={{ margin: '10px 0' }}>
          <strong>Pet Details:</strong> {petDetails}
        </p>
      </div>

      {message && (
        <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 10px 0' }}><strong>Additional Message:</strong></p>
          <p style={{ margin: '0', color: '#666', whiteSpace: 'pre-line' }}>{message}</p>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e4e1ff', borderRadius: '8px' }}>
        <p style={{ margin: '5px 0' }}><strong>Contact Information:</strong></p>
        <p style={{ margin: '5px 0' }}>Name: {firstName} {lastName}</p>
        <p style={{ margin: '5px 0' }}>Phone: {phoneNumber}</p>
      </div>
    </div>
  );
}