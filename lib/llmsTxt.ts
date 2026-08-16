import { Profile, Service, ServiceArea } from '@/lib/templates/types';

/**
 * Generates an llms.txt document (per the llmstxt.org convention) from a
 * profile's existing data. Used as the default served at /llms.txt when the
 * owner hasn't provided a custom override.
 */
export function generateLlmsTxt(
  profile: Profile,
  services: Service[],
  serviceAreas: ServiceArea[],
  siteUrl: string
): string {
  const lines: string[] = [];

  const title = profile.business_name || profile.display_name || 'Pet Care Services';
  lines.push(`# ${title}`);
  lines.push('');

  const summary = profile.tagline || profile.about_business || 'Professional pet care services.';
  lines.push(`> ${summary}`);
  lines.push('');

  if (profile.about_business && profile.about_business !== summary) {
    lines.push(profile.about_business);
    lines.push('');
  }

  if (services.length > 0) {
    lines.push('## Services');
    for (const service of services) {
      const menuSummary = service.menu_items?.length
        ? ` (${service.menu_items.map((item) => `${item.name}${item.price ? ` – ${item.price}` : ''}`).join(', ')})`
        : '';
      lines.push(`- ${service.type}${service.description ? `: ${service.description}` : ''}${menuSummary}`);
    }
    lines.push('');
  }

  if (serviceAreas.length > 0) {
    lines.push('## Service Areas');
    for (const area of serviceAreas) {
      lines.push(`- ${area.name}${area.description ? `: ${area.description}` : ''}`);
    }
    lines.push('');
  }

  const contactLines: string[] = [];
  if (profile.phone_number) contactLines.push(`- Phone: ${profile.phone_number}`);
  if (profile.email) contactLines.push(`- Email: ${profile.email}`);
  if (profile.booking_link) contactLines.push(`- Booking: ${profile.booking_link}`);
  if (contactLines.length > 0) {
    lines.push('## Contact');
    lines.push(...contactLines);
    lines.push('');
  }

  lines.push('## More');
  lines.push(`- [Full profile](${siteUrl})`);

  return lines.join('\n');
}
