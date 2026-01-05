interface PlaceholderLogoProps {
  size?: number;
  gradientColors?: [string, string];
  emoji?: string;
}

export default function PlaceholderLogo({
  size = 40,
  gradientColors = ['#ff6b9d', '#ffc93c'],
  emoji = '🐾'
}: PlaceholderLogoProps) {
  const gradientId = `logo-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: gradientColors[0], stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: gradientColors[1], stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={`url(#${gradientId})`}
        stroke="white"
        strokeWidth="4"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="48"
      >
        {emoji}
      </text>
    </svg>
  );
}
