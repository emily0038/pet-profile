'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TemplateEditor from '@/components/editor/TemplateEditor';
import { proTemplateConfig } from '@/lib/templates/editorConfig';
import { createClient } from '@/utils/supabase/client';
import { updateTemplateId } from '@/app/actions/editor';
import { getProfilePath } from '@/utils/url';

export default function ProEditorPage() {
  const router = useRouter();
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isPublishing, setIsPublishing] = useState(false);

  // Fetch the user's current published template_id
  useEffect(() => {
    async function fetchTemplateId() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('template_id, domain')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setCurrentTemplateId(profile.template_id || null);
        setUsername(profile.domain);
      }
    }

    fetchTemplateId();
  }, []);

  const handleBack = () => {
    router.push('/editor');
  };

  const handlePreview = async () => {
    const editorTemplate = 'pro';

    // If the editor template differs from published template, update it
    if (currentTemplateId !== editorTemplate) {
      setIsPublishing(true);
      try {
        const result = await updateTemplateId(editorTemplate);
        setCurrentTemplateId(editorTemplate);
        // Navigate to the published page
        router.push(getProfilePath(result.username));
      } catch (error) {
        console.error('Failed to publish template:', error);
        alert('Failed to publish template. Please try again.');
      } finally {
        setIsPublishing(false);
      }
    } else {
      // Just navigate to the published page
      router.push(getProfilePath(username));
    }
  };

  // Determine button text
  const buttonText = isPublishing
    ? 'Publishing...'
    : currentTemplateId === 'pro'
      ? 'View Page'
      : 'Publish';

  return (
    <TemplateEditor
      config={proTemplateConfig}
      onBack={handleBack}
      onPreview={handlePreview}
      previewButtonText={buttonText}
    />
  );
}
