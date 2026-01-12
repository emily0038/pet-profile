'use client';

import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { createClient } from '@/utils/supabase/client';
import { saveFaq, deleteFaq } from '@/app/actions/editor';
import styles from '../editor.module.css';

// FAQ type (matching database schema)
interface FAQ {
  id?: string;
  profile_id?: string;
  question: string;
  answer: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

interface FaqsSectionProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function FaqsSection({
  onSaveStatusChange
}: FaqsSectionProps) {
  const [savedFaqs, setSavedFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  const isEditingFaq = editingFaq !== null;

  // Load FAQs on mount
  useEffect(() => {
    async function loadFaqs() {
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

      // Get FAQs
      const { data: faqs } = await supabase
        .from('faqs')
        .select('*')
        .eq('profile_id', profile.id)
        .order('order', { ascending: true });

      if (faqs) {
        setSavedFaqs(faqs);
      }

      setLoading(false);
    }

    loadFaqs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status (FAQs save immediately, so always 'saved')
  useEffect(() => {
    onSaveStatusChange?.({
      status: 'saved',
      lastSaved: null
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq({ ...faq });
  };

  const handleSaveFaq = async () => {
    if (!editingFaq) return;

    try {
      // Save to database
      const result = await saveFaq({
        id: editingFaq.id,
        question: editingFaq.question,
        answer: editingFaq.answer,
        order: editingFaq.order
      });

      // Update local state
      const existingIndex = savedFaqs.findIndex(f => f.id === editingFaq.id);
      if (existingIndex >= 0) {
        const newSavedFaqs = [...savedFaqs];
        newSavedFaqs[existingIndex] = result.faq;
        setSavedFaqs(newSavedFaqs);
      } else {
        setSavedFaqs([...savedFaqs, result.faq]);
      }

      // Clear editing state
      setEditingFaq(null);
    } catch (error) {
      console.error('Failed to save FAQ:', error);
      alert('Failed to save FAQ. Please try again.');
    }
  };

  const handleCancelFaq = () => {
    setEditingFaq(null);
  };

  const handleDeleteFaq = async () => {
    if (!editingFaq?.id) return;

    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteFaq(editingFaq.id);
        setSavedFaqs(savedFaqs.filter(f => f.id !== editingFaq.id));
        setEditingFaq(null);
      } catch (error) {
        console.error('Failed to delete FAQ:', error);
        alert('Failed to delete FAQ. Please try again.');
      }
    }
  };

  const addNewFaq = () => {
    const newFaq: FAQ = {
      question: '',
      answer: '',
      order: savedFaqs.length
    };
    setEditingFaq(newFaq);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderEditForm = () => (
    <>
      <div className={styles.field}>
        <label className={styles.label}>
          Question <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          value={editingFaq?.question || ''}
          onChange={(e) => setEditingFaq({ ...editingFaq!, question: e.target.value })}
          placeholder="e.g., How do I book a service?"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Answer <span className={styles.required}>*</span>
        </label>
        <textarea
          value={editingFaq?.answer || ''}
          onChange={(e) => setEditingFaq({ ...editingFaq!, answer: e.target.value })}
          placeholder="Provide the answer..."
          className={styles.textarea}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Saved FAQs List */}
      <div className={styles.itemList}>
        {savedFaqs.map((faq) => {
          const isThisFaqEditing = editingFaq?.id === faq.id;

          // If this FAQ is being edited, show the edit form in place
          if (isThisFaqEditing && editingFaq) {
            return (
              <div key={faq.id} className={styles.editCard}>
                {renderEditForm()}

                {/* Action buttons */}
                <div className={styles.buttonGroup}>
                  {editingFaq.id && (
                    <button
                      onClick={handleDeleteFaq}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={handleCancelFaq}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFaq}
                    className="btn-save"
                  >
                    Save
                  </button>
                </div>
              </div>
            );
          }

          // Otherwise show the saved FAQ card
          return (
            <div key={faq.id} style={{
              padding: '20px',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              background: 'white',
              display: 'flex',
              gap: '16px',
              alignItems: 'start'
            }}>
              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#000000',
                  marginBottom: '12px',
                  lineHeight: '1.4'
                }}>
                  {faq.question}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
                  {faq.answer}
                </p>
              </div>

              {/* Edit button */}
              <button
                onClick={() => handleEditFaq(faq)}
                disabled={isEditingFaq}
                className={styles.editButton}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit form for new FAQ (no ID yet) */}
      {editingFaq && !editingFaq.id && (
        <div className={styles.editCard} style={{ marginTop: '16px' }}>
          {renderEditForm()}

          {/* Action buttons */}
          <div className={styles.buttonGroup}>
            <button
              onClick={handleCancelFaq}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveFaq}
              className="btn-save"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Add New FAQ Button */}
      {!isEditingFaq && (
        <button
          onClick={addNewFaq}
          className={`${styles.addButton} ${savedFaqs.length > 0 ? styles.hasMargin : ''}`}
        >
          <span style={{ fontSize: '18px' }}>+</span>
          <span>Add FAQ</span>
        </button>
      )}
    </>
  );
}
