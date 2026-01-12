'use client';

import { useState, useEffect } from 'react';
import { TemplateEditorConfig } from '@/lib/templates/editorConfig';
import { createClient } from '@/utils/supabase/client';
import { saveReview, deleteReview } from '@/app/actions/editor';
import * as Bytescale from "@bytescale/sdk";
import PhotoUploadModal from '../PhotoUploadModal';
import styles from '../editor.module.css';

// Initialize Bytescale upload manager
const uploadManager = new Bytescale.UploadManager({
  apiKey: "public_223k2RMDA3XCvtqA2sr4V7rKhoHU"
});

// Review type (matching database schema)
interface Review {
  id?: string;
  profile_id?: string;
  pet_name: string;
  photo_url?: string;
  owner_name: string;
  review: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

interface ReviewsSectionProps {
  config: TemplateEditorConfig;
  onSaveStatusChange?: (status: { status: 'saved' | 'saving' | 'unsaved' | 'error'; lastSaved: Date | null }) => void;
}

export default function ReviewsSection({
  config,
  onSaveStatusChange
}: ReviewsSectionProps) {
  const [savedReviews, setSavedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewPhotoFileToUpload, setReviewPhotoFileToUpload] = useState<File | null>(null);
  const [reviewPhotoPreviewUrl, setReviewPhotoPreviewUrl] = useState<string | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const isEditingReview = editingReview !== null;

  // Load reviews on mount
  useEffect(() => {
    async function loadReviews() {
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

      // Get reviews
      const { data: reviews } = await supabase
        .from('reviews')
        .select('*')
        .eq('profile_id', profile.id)
        .order('order', { ascending: true });

      if (reviews) {
        setSavedReviews(reviews);
      }

      setLoading(false);
    }

    loadReviews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Report save status (reviews save immediately, so always 'saved')
  useEffect(() => {
    onSaveStatusChange?.({
      status: 'saved',
      lastSaved: null
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditReview = (review: Review) => {
    setEditingReview({ ...review });
  };

  const handleSaveReview = async () => {
    if (!editingReview) return;

    try {
      // Upload photo to Bytescale if there's a new file
      let photoUrl = editingReview.photo_url;
      if (reviewPhotoFileToUpload) {
        const { fileUrl } = await uploadManager.upload({ data: reviewPhotoFileToUpload });
        photoUrl = fileUrl;
      }

      // Save to database
      const result = await saveReview({
        id: editingReview.id,
        pet_name: editingReview.pet_name,
        photo_url: photoUrl,
        owner_name: editingReview.owner_name,
        review: editingReview.review,
        order: editingReview.order
      });

      // Update local state
      const existingIndex = savedReviews.findIndex(r => r.id === editingReview.id);
      if (existingIndex >= 0) {
        const newSavedReviews = [...savedReviews];
        newSavedReviews[existingIndex] = result.review;
        setSavedReviews(newSavedReviews);
      } else {
        setSavedReviews([...savedReviews, result.review]);
      }

      // Clear editing state
      setEditingReview(null);
      setReviewPhotoFileToUpload(null);
      if (reviewPhotoPreviewUrl) {
        URL.revokeObjectURL(reviewPhotoPreviewUrl);
        setReviewPhotoPreviewUrl(null);
      }
    } catch (error) {
      console.error('Failed to save review:', error);
      alert('Failed to save review. Please try again.');
    }
  };

  const handleCancelReview = () => {
    setEditingReview(null);
    setReviewPhotoFileToUpload(null);
    if (reviewPhotoPreviewUrl) {
      URL.revokeObjectURL(reviewPhotoPreviewUrl);
      setReviewPhotoPreviewUrl(null);
    }
  };

  const handleDeleteReview = async () => {
    if (!editingReview?.id) return;

    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(editingReview.id);
        setSavedReviews(savedReviews.filter(r => r.id !== editingReview.id));
        setEditingReview(null);
      } catch (error) {
        console.error('Failed to delete review:', error);
        alert('Failed to delete review. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const addNewReview = () => {
    const newReview: Review = {
      pet_name: '',
      photo_url: '',
      owner_name: '',
      review: '',
      order: savedReviews.length
    };
    setEditingReview(newReview);
  };

  const renderEditForm = () => (
    <>
      {config.reviews.showPetPhoto && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '12px',
            backgroundColor: (editingReview?.photo_url || reviewPhotoPreviewUrl) ? 'transparent' : 'white',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            marginBottom: '12px',
            transition: 'border-color 0.2s',
            backgroundImage: editingReview?.photo_url && !reviewPhotoPreviewUrl ? `url(${editingReview.photo_url})` :
                           reviewPhotoPreviewUrl ? `url(${reviewPhotoPreviewUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => setIsPhotoModalOpen(true)}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = config.colors.primary}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
          >
            {!editingReview?.photo_url && !reviewPhotoPreviewUrl && (
              <span style={{ fontSize: '60px' }}>🐕</span>
            )}
          </div>
          <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>
            Click to {(editingReview?.photo_url || reviewPhotoPreviewUrl) ? 'change' : 'upload'} pet photo
          </div>
        </div>
      )}

      {config.reviews.showPetNameBreed && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Pet name and breed {config.reviews.petNameBreedRequired && <span style={{ color: '#EF4444' }}>*</span>}
          </label>
          <input
            type="text"
            value={editingReview?.pet_name || ''}
            onChange={(e) => setEditingReview({ ...editingReview!, pet_name: e.target.value })}
            placeholder="e.g., Frankie, toy poodle"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: config.fonts.body,
            }}
          />
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: 600,
          color: '#000000',
          marginBottom: '8px',
        }}>
          Review (max {config.reviews.reviewMaxLength} characters)
        </label>
        <textarea
          value={editingReview?.review || ''}
          onChange={(e) => {
            if (e.target.value.length <= config.reviews.reviewMaxLength) {
              setEditingReview({ ...editingReview!, review: e.target.value });
            }
          }}
          placeholder="The review from the client..."
          maxLength={config.reviews.reviewMaxLength}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            fontSize: '15px',
            fontFamily: config.fonts.body,
            minHeight: '120px',
            resize: 'vertical',
          }}
        />
        <div style={{
          fontSize: '13px',
          color: '#6B7280',
          marginTop: '6px',
        }}>
          {editingReview?.review.length || 0}/{config.reviews.reviewMaxLength}
        </div>
      </div>

      {config.reviews.showOwnerName && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '15px',
            fontWeight: 600,
            color: '#000000',
            marginBottom: '8px',
          }}>
            Owner / reviewer name {config.reviews.ownerNameRequired && <span style={{ color: '#EF4444' }}>*</span>}
          </label>
          <input
            type="text"
            value={editingReview?.owner_name || ''}
            onChange={(e) => setEditingReview({ ...editingReview!, owner_name: e.target.value })}
            placeholder="e.g., Lisa P."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '15px',
              fontFamily: config.fonts.body,
            }}
          />
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Saved Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {savedReviews.map((review) => {
          const isThisReviewEditing = editingReview?.id === review.id;

          // If this review is being edited, show the edit form in place
          if (isThisReviewEditing && editingReview) {
            return (
              <div key={review.id} style={{
                padding: '24px',
                border: `2px solid ${config.colors.primary}`,
                borderRadius: '12px',
                background: 'white'
              }}>
                {renderEditForm()}

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  {editingReview.id && (
                    <button
                      onClick={handleDeleteReview}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={handleCancelReview}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveReview}
                    className="btn-save"
                  >
                    Save
                  </button>
                </div>
              </div>
            );
          }

          // Otherwise show the saved review card
          return (
            <div key={review.id} style={{
              padding: '20px',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              background: 'white',
              display: 'flex',
              gap: '20px'
            }}>
              {/* Photo */}
              {config.reviews.showPetPhoto && review.photo_url && (
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundImage: `url(${review.photo_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
              )}

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#000000',
                      marginBottom: '4px'
                    }}>
                      {review.pet_name}
                    </h3>
                    <div style={{
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      {review.owner_name}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditReview(review)}
                    disabled={isEditingReview}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                </div>
                <p style={{
                  fontSize: '15px',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {review.review}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit form for new review (no ID yet) */}
      {editingReview && !editingReview.id && (
        <div style={{
          padding: '24px',
          border: `2px solid ${config.colors.primary}`,
          borderRadius: '12px',
          background: 'white',
          marginTop: '16px'
        }}>
          {renderEditForm()}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleCancelReview}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveReview}
              className="btn-save"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Add New Review Button */}
      {!isEditingReview && (
        <button
          onClick={addNewReview}
          className={`${styles.addButton} ${savedReviews.length > 0 ? styles.hasMargin : ''}`}
        >
          <span style={{ fontSize: '18px' }}>+</span>
          <span>Add Review</span>
        </button>
      )}

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onUpload={(file, preview) => {
          setReviewPhotoFileToUpload(file);
          setReviewPhotoPreviewUrl(preview);
          setIsPhotoModalOpen(false);
        }}
        aspectRatio="1/1"
        maxSizeMB={5}
      />
    </>
  );
}
