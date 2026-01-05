'use client';

import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { createClient } from '@/utils/supabase/client';
import { savePolicy } from '@/app/actions/editor';
import styles from '../editor.module.css';

// Policy type (matching database schema)
interface Policy {
  id?: string;
  profile_id?: string;
  title: string;
  description: string;
  icon: string;
  created_at?: string;
  updated_at?: string;
}

interface PoliciesSectionProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function PoliciesSection({
  config,
  onSaveStatusChange
}: PoliciesSectionProps) {
  const [savedPolicies, setSavedPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const isEditingAnyPolicy = editingPolicy !== null;

  // Load policies on mount
  useEffect(() => {
    async function loadPolicies() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Get profile id
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        setLoading(false);
        return;
      }

      // Get policies
      const { data: policies } = await supabase
        .from('policies')
        .select('*')
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: true });

      if (policies) {
        setSavedPolicies(policies);
      }

      setLoading(false);
    }

    loadPolicies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status (policies save immediately, so always 'saved')
  useEffect(() => {
    onSaveStatusChange?.({
      status: 'saved',
      lastSaved: null
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handler functions for policies
  const handleEditPolicy = (template: { id: string; title: string; emoji: string }) => {
    // Find existing policy or create new one
    const existingPolicy = savedPolicies.find(p => p.icon === template.id);
    if (existingPolicy) {
      setEditingPolicy({ ...existingPolicy });
    } else {
      setEditingPolicy({
        title: template.title,
        description: '',
        icon: template.id
      });
    }
  };

  const handleSavePolicy = async () => {
    if (!editingPolicy) return;

    try {
      // Save to database
      const result = await savePolicy({
        id: editingPolicy.id,
        title: editingPolicy.title,
        description: editingPolicy.description,
        icon: editingPolicy.icon
      });

      // Update local state
      const existingIndex = savedPolicies.findIndex(
        p => p.id === editingPolicy.id || p.icon === editingPolicy.icon
      );

      let newSavedPolicies: Policy[];
      if (existingIndex >= 0) {
        newSavedPolicies = [...savedPolicies];
        newSavedPolicies[existingIndex] = result.policy;
      } else {
        newSavedPolicies = [...savedPolicies, result.policy];
      }

      setSavedPolicies(newSavedPolicies);

      // Clear editing state
      setEditingPolicy(null);
    } catch (error: unknown) {
      console.error('Failed to save policy:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Failed to save policy: ${errorMessage}`);
    }
  };

  const handleCancelPolicy = () => {
    setEditingPolicy(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.sectionDescription}>
        Click on a policy to add or edit. Leave policies blank if they don&apos;t apply to your business.
      </div>

      <div className={styles.itemList}>
        {config.policies.templates.map((template) => {
          const isThisPolicyEditing = editingPolicy?.icon === template.id;
          const savedPolicy = savedPolicies.find(p => p.icon === template.id);
          const hasContent = savedPolicy && savedPolicy.description.trim().length > 0;

          // If this policy is being edited, show the edit form
          if (isThisPolicyEditing && editingPolicy) {
            return (
              <div key={template.id} className={styles.editCard}>
                {/* Header with emoji and title */}
                <div className={styles.emojiHeader}>
                  <div className={styles.emojiBox}>
                    {template.emoji}
                  </div>
                  <div className={styles.emojiHeader + ' title'}>
                    {template.title}
                  </div>
                </div>

                {/* Content textarea */}
                <textarea
                  value={editingPolicy.description}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, description: e.target.value })}
                  placeholder={`Describe your ${template.title.toLowerCase()} policy...`}
                  className={styles.textarea}
                  style={{ minHeight: '120px' }}
                />

                {/* Action buttons */}
                <div className={styles.buttonGroup}>
                  <button
                    onClick={handleCancelPolicy}
                    className={styles.secondaryButton}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePolicy}
                    className={styles.primaryButton}
                  >
                    Save
                  </button>
                </div>
              </div>
            );
          }

          // Otherwise show the condensed saved/empty card
          const cardClassName = hasContent ? styles.displayCard : styles.emptyCard;
          const disabledClass = isEditingAnyPolicy && !isThisPolicyEditing ? ' ' + styles.disabled : '';

          return (
            <div
              key={template.id}
              onClick={() => !isEditingAnyPolicy && handleEditPolicy(template)}
              className={cardClassName + disabledClass}
            >
              {/* Emoji icon */}
              <div className={hasContent ? styles.emojiBox : `${styles.emojiBox} ${styles.empty}`}>
                {template.emoji}
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <div className={hasContent ? styles.cardTitle : `${styles.cardTitle} ${styles.empty}`}>
                  {template.title}
                </div>
                {hasContent && savedPolicy ? (
                  <p className={styles.previewText}>
                    {savedPolicy.description}
                  </p>
                ) : (
                  <p className={styles.placeholderText}>
                    Click to add policy
                  </p>
                )}
              </div>

              {/* Edit button (only shown if has content) */}
              {hasContent && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isEditingAnyPolicy) {
                      handleEditPolicy(template);
                    }
                  }}
                  disabled={isEditingAnyPolicy}
                  className={styles.editButton}
                >
                  Edit
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
