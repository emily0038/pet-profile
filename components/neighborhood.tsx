'use client';

import React, { useState } from 'react';

interface NeighborhoodProps {
  onTextSave?: (text: string) => void;
  initialText?: string;
}

export default function Neighborhood({ onTextSave, initialText = '' }: NeighborhoodProps) {
  const [savedText, setSavedText] = useState<string>(initialText || '');
  const [editingText, setEditingText] = useState<string>(initialText || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const MAX_CHARS = 100;
  const remainingChars = MAX_CHARS - editingText?.length;

  const handleEditClick = () => {
    setEditingText(savedText);
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    // Only update if under character limit
    if (text.length <= MAX_CHARS) {
      setEditingText(text);
    }
  };

  const handleCancel = () => {
    setEditingText(savedText);
    setIsEditing(false);
  };

  const handleSave = () => {
    setSavedText(editingText);
    setIsEditing(false);

    // Notify parent component - FIND OUT WHAT THIS DOES
    if (onTextSave) {
      onTextSave(editingText);
    }

    // NOTE: When connected to database, save here:
    // await database.profiles.update({ bio: editingText });
  };

  return (
    <div>
      {isEditing ? (
        // Editing Mode
        <div>
          <textarea
            value={editingText}
            onChange={handleTextChange}
            placeholder="E.g. Upper East Side, Midtown East"
            className="w-full p-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
            rows={1}
            style={{ whiteSpace: 'pre-wrap' }} // Preserves spacing and line breaks
          />
          
          {/* Character Counter */}
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm ${remainingChars < 50 ? 'text-red-500' : 'text-gray-500'}`}>
              {remainingChars} characters remaining
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-[#9185FF] text-white rounded-lg hover:bg-[#5B4FC6] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        // Display Mode
        <div>
          {savedText ? (
            <div
              onClick={handleEditClick}
              className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#E4E1FF] transition-colors min-h-[60px] whitespace-pre-wrap"
            >
              {savedText}
            </div>
          ) : (
            <div
              onClick={handleEditClick}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#E4E1FF] transition-colors min-h-[60px] flex items-center justify-center"
            >
              <span className="text-gray-400">What neighborhoods do you work in?</span>
            </div>
          )}
          
          {savedText && (
            <button
              onClick={handleEditClick}
              className="mt-2 text-sm text-[#878787] hover:text-[#9185FF]"
            >
              Edit neighborhood
            </button>
          )}
        </div>
      )}
    </div>
  );
}