import type { Metadata } from 'next';
import BasicLandingContent from './BasicLandingContent';

export const metadata: Metadata = {
  title: 'Free Pet Website Templates | Pets Friendz',
  description: 'Build your pet care website with the free Basic template from Pets Friendz. Mobile-responsive, fast-loading, and SEO-optimized. Perfect for dog walkers, pet sitters, and groomers.',
};

export default function BasicTemplatePage() {
  return <BasicLandingContent />;
}
