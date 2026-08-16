interface FriendlyCustomSectionProps {
  heading: string;
  body: string;
}

export default function FriendlyCustomSection({ heading, body }: FriendlyCustomSectionProps) {
  if (!heading?.trim() && !body?.trim()) {
    return null;
  }

  const paragraphs = body?.split('\n').filter((p) => p.trim()) || [];

  return (
    <section className="friendly-owner">
      {/* Same content width as About (1200px) rather than the narrower
          900px .friendly-owner-wrapper normally uses */}
      <div className="friendly-owner-wrapper" style={{ textAlign: 'left', maxWidth: '1200px' }}>
        {heading?.trim() && <h2>{heading}</h2>}
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
