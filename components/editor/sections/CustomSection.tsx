'use client';

import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { updateCustomSection } from '@/app/actions/editor';
import { createClient } from '@/utils/supabase/client';
import { useSaveStatus } from '@/hooks/useSaveStatus';

const HEADING_MAX_LENGTH = 100;
const BODY_MAX_LENGTH = 2000;

interface CustomSectionProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function CustomSection({ onSaveStatusChange }: CustomSectionProps) {
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [originalHeading, setOriginalHeading] = useState('');
  const [originalBody, setOriginalBody] = useState('');
  const [loading, setLoading] = useState(true);
  const saveStatus = useSaveStatus();

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('custom_section_heading, custom_section_body')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const headingValue = profile.custom_section_heading || '';
        const bodyValue = profile.custom_section_body || '';
        setHeading(headingValue);
        setBody(bodyValue);
        setOriginalHeading(headingValue);
        setOriginalBody(bodyValue);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const hasChanges = heading !== originalHeading || body !== originalBody;

  useEffect(() => {
    if (hasChanges) {
      saveStatus.markUnsaved();
    }
  }, [hasChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onSaveStatusChange?.({ status: saveStatus.status, lastSaved: saveStatus.lastSaved });
  }, [saveStatus.status, saveStatus.lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveChanges = async () => {
    try {
      await saveStatus.saveWithStatus(async () => {
        await updateCustomSection({
          custom_section_heading: heading,
          custom_section_body: body,
        });
      });
      setOriginalHeading(heading);
      setOriginalBody(body);
    } catch (error) {
      console.error('Failed to save custom section:', error);
    }
  };

  const cancelChanges = () => {
    setHeading(originalHeading);
    setBody(originalBody);
    saveStatus.markSaved();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{
        fontSize: '14px',
        color: '#6B7280',
        marginBottom: '20px',
        lineHeight: 1.5,
      }}>
        Add a section of your own — it appears just below Services on your page. Leave both fields blank to hide it.
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Heading
        </label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          maxLength={HEADING_MAX_LENGTH}
          placeholder="e.g. Why Choose Us"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '15px',
            fontFamily: "'Roboto Flex', sans-serif",
          }}
        />
        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '6px' }}>
          {heading.length}/{HEADING_MAX_LENGTH} characters
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Body text
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={BODY_MAX_LENGTH}
          rows={8}
          placeholder="Write a paragraph or two. Line breaks are preserved."
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '15px',
            fontFamily: "'Roboto Flex', sans-serif",
            resize: 'vertical',
          }}
        />
        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '6px' }}>
          {body.length}/{BODY_MAX_LENGTH} characters
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '1px solid #E5E7EB'
      }}>
        <button
          onClick={saveChanges}
          disabled={!hasChanges || saveStatus.status === 'saving'}
          className="btn-save"
        >
          {saveStatus.status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={cancelChanges}
          disabled={!hasChanges}
          className="btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
