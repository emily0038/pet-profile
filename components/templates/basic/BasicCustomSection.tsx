interface BasicCustomSectionProps {
  heading: string;
  body: string;
}

export default function BasicCustomSection({ heading, body }: BasicCustomSectionProps) {
  if (!heading?.trim() && !body?.trim()) {
    return null;
  }

  const paragraphs = body?.split('\n').filter((p) => p.trim()) || [];

  return (
    <section className="basic-services">
      {heading?.trim() && (
        <div className="basic-section-title" style={{ textAlign: 'left' }}>
          <h2>{heading}</h2>
        </div>
      )}
      {paragraphs.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              style={{
                fontSize: '16px',
                color: '#4a4a4a',
                lineHeight: 1.8,
                marginBottom: '20px',
                fontWeight: 300,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
