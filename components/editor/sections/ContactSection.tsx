'use client';

import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { createClient } from '@/utils/supabase/client';
import { updateContactSection } from '@/app/actions/editor';
import { useSaveStatus } from '@/hooks/useSaveStatus';

interface ContactSectionProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function ContactSection({
  config,
  onSaveStatusChange
}: ContactSectionProps) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [originalPhone, setOriginalPhone] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const [useAccountPhone, setUseAccountPhone] = useState(false);
  const [useAccountEmail, setUseAccountEmail] = useState(false);
  const [customPhone, setCustomPhone] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  // Account-level data for "use account" checkboxes
  const [accountPhone, setAccountPhone] = useState('');
  const [accountEmail, setAccountEmail] = useState('');

  const contactSaveStatus = useSaveStatus();

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Load account email
      setAccountEmail(user.email || '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('phone_number_alt, email_alt, phone_number')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const phoneValue = profile.phone_number_alt || '';
        const emailValue = profile.email_alt || '';

        setPhone(phoneValue);
        setEmail(emailValue);
        setOriginalPhone(phoneValue);
        setOriginalEmail(emailValue);

        // Load account phone
        setAccountPhone(profile.phone_number || '');
      }

      setLoading(false);
    }

    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect if contact has unsaved changes
  const hasContactChanges = phone !== originalPhone || email !== originalEmail;

  // Mark contact as unsaved when changes are detected
  useEffect(() => {
    if (hasContactChanges) {
      contactSaveStatus.markUnsaved();
    }
  }, [hasContactChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status changes to parent
  useEffect(() => {
    onSaveStatusChange?.({
      status: contactSaveStatus.status,
      lastSaved: contactSaveStatus.lastSaved
    });
  }, [contactSaveStatus.status, contactSaveStatus.lastSaved]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save contact changes
  const saveContactChanges = async () => {
    try {
      await contactSaveStatus.saveWithStatus(async () => {
        await updateContactSection({
          phone: phone,
          email: email
        });
      });

      setOriginalPhone(phone);
      setOriginalEmail(email);
    } catch (error) {
      console.error('Failed to save contact:', error);
    }
  };

  // Cancel contact changes
  // CHANGE - need to revert the checkbox back to the original; maybe we need to add a field for each checkbox
  const cancelContactChanges = () => {
    setPhone(originalPhone);
    setEmail(originalEmail);
    contactSaveStatus.markSaved();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {config.contact.showPhone && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Phone Number
          </label>
          <input
            type="text"
            value={useAccountPhone ? accountPhone : phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            disabled={useAccountPhone}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: config.fonts.body,
              background: useAccountPhone ? '#F9FAFB' : 'white',
              cursor: useAccountPhone ? 'not-allowed' : 'text',
            }}
            onFocus={(e) => !useAccountPhone && (e.currentTarget.style.borderColor = config.colors.primary)}
            onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
          />
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="use-account-phone"
                checked={useAccountPhone}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setUseAccountPhone(checked);
                  if (checked) {
                    setCustomPhone(phone); // Save current custom value
                    setPhone(accountPhone); // Set to account phone
                  } else {
                    setPhone(customPhone); // Restore custom value
                  }
                }}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: config.colors.primary,
                }}
              />
              <label htmlFor="use-account-phone" style={{
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
              }}>
                Use phone number from my account
              </label>
            </div>
          </div>
        </div>
      )}

      {config.contact.showEmail && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Email Address
          </label>
          <input
            type="text"
            value={useAccountEmail ? accountEmail : email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            disabled={useAccountEmail}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: config.fonts.body,
              background: useAccountEmail ? '#F9FAFB' : 'white',
              cursor: useAccountEmail ? 'not-allowed' : 'text',
            }}
            onFocus={(e) => !useAccountEmail && (e.currentTarget.style.borderColor = config.colors.primary)}
            onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
          />
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="use-account-email"
                checked={useAccountEmail}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setUseAccountEmail(checked);
                  if (checked) {
                    setCustomEmail(email); // Save current custom value
                    setEmail(accountEmail); // Set to account email
                  } else {
                    setEmail(customEmail); // Restore custom value
                  }
                }}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: config.colors.primary,
                }}
              />
              <label htmlFor="use-account-email" style={{
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
              }}>
                Use email from my account
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Save/Cancel buttons */}
      {hasContactChanges && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={cancelContactChanges}
            style={{
              flex: 1,
              padding: '10px 24px',
              background: 'white',
              color: '#374151',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Cancel
          </button>
          <button
            onClick={saveContactChanges}
            style={{
              flex: 1,
              padding: '10px 24px',
              background: config.colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = config.colors.hover}
            onMouseLeave={(e) => e.currentTarget.style.background = config.colors.primary}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}
