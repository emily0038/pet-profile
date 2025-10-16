'use client';

import React, { useState } from 'react';

interface AboutMeProps {
  onTextSave?: (text: string) => void;
  initialText?: string;
}

export default function AboutMe({ onTextSave, initialText = '' }: AboutMeProps) {
  const [savedText, setSavedText] = useState<string>(initialText);
  const [editingText, setEditingText] = useState<string>(initialText);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const MAX_CHARS = 500;
  const remainingChars = MAX_CHARS - editingText.length;

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

    // Notify parent component
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
            placeholder="E.g. I'm a full-time pet sitter with a mini golden doodle of my own. I've been caring for pets professionally for 6 years."
            className="w-full p-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
            rows={8}
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
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
              className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors min-h-[120px] whitespace-pre-wrap"
            >
              {savedText}
            </div>
          ) : (
            <div
              onClick={handleEditClick}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors min-h-[120px] flex items-center justify-center"
            >
              <span className="text-gray-400">Add your bio</span>
            </div>
          )}
          
          {savedText && (
            <button
              onClick={handleEditClick}
              className="mt-2 text-sm text-purple-600 hover:text-purple-700"
            >
              Edit bio
            </button>
          )}
        </div>
      )}
    </div>
  );
}