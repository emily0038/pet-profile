'use client';

import { useRouter } from 'next/navigation';
import TemplateSelector from '@/components/editor/TemplateSelector';

export default function EditorPage() {
  const router = useRouter();

  const handleSelectTemplate = (templateId: string) => {
    // Navigate to the template-specific editor
    router.push(`/editor/${templateId}`);
  };

  return <TemplateSelector onSelectTemplate={handleSelectTemplate} />;
}
