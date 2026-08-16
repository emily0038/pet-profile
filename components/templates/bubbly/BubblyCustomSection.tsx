interface BubblyCustomSectionProps {
  heading: string;
  body: string;
}

export default function BubblyCustomSection({ heading, body }: BubblyCustomSectionProps) {
  if (!heading?.trim() && !body?.trim()) {
    return null;
  }

  const paragraphs = (body || '').split('\n\n').filter((p) => p.trim());

  return (
    <section
      style={{
        padding: '100px 24px',
        background: 'var(--bubbly-cream)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        {heading?.trim() && (
          <h2
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(28px, 6vw, 42px)',
              fontWeight: 700,
              marginBottom: '24px',
              color: 'var(--bubbly-text-dark)',
            }}
          >
            {heading}
          </h2>
        )}
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{
              fontSize: 'clamp(16px, 4vw, 18px)',
              color: '#555',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              marginBottom: index < paragraphs.length - 1 ? '16px' : 0,
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
