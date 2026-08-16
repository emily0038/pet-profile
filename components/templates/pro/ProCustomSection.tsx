interface ProCustomSectionProps {
  heading: string;
  body: string;
}

export default function ProCustomSection({ heading, body }: ProCustomSectionProps) {
  if (!heading?.trim() && !body?.trim()) {
    return null;
  }

  const paragraphs = (body || '').split('\n\n').filter((p) => p.trim());

  return (
    <section className="section section-bg-white">
      {/* Same container width as About/Personal (.section-container), rather
          than the narrower .section-header used for pre-grid intros */}
      <div className="section-container">
        {heading?.trim() && (
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--primary)', marginBottom: '1rem' }}>
            {heading}
          </h2>
        )}
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{
              color: 'var(--text-light)',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              marginBottom: index < paragraphs.length - 1 ? '1rem' : 0,
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
