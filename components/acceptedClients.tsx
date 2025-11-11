'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AcceptedClientsData {
  acceptsCats: boolean;
  acceptsDogs: boolean;
  maxWeight: number | null; // null = no size limit
}

interface AcceptedClientsProps {
  onSave?: (data: AcceptedClientsData) => void;
  initialData?: AcceptedClientsData;
}

const DEFAULT_DATA: AcceptedClientsData = {
  acceptsCats: false,
  acceptsDogs: false,
  maxWeight: 40,
};

export default function AcceptedClients({ onSave, initialData = DEFAULT_DATA }: AcceptedClientsProps) {
  const [savedData, setSavedData] = useState<AcceptedClientsData>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  
  // Editing state (only used when in edit mode)
  const [acceptsCats, setAcceptsCats] = useState(initialData.acceptsCats);
  const [acceptsDogs, setAcceptsDogs] = useState(initialData.acceptsDogs);
  const [maxWeight, setMaxWeight] = useState<number | null>(initialData.maxWeight);

  const handleEdit = () => {
    // Load saved data into editing state
    setAcceptsCats(savedData.acceptsCats);
    setAcceptsDogs(savedData.acceptsDogs);
    setMaxWeight(savedData.maxWeight);
    setIsEditing(true);
  };

  const handleCatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptsCats(e.target.checked);
  };

  const handleDogsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptsDogs(e.target.checked);
    if (!e.target.checked) {
      setMaxWeight(40); // Reset to default when unchecking dogs
    }
  };

  const handleNoSizeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setMaxWeight(null); // null = no size limit
    } else {
      setMaxWeight(40); // Reset to default weight when unchecking
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseInt(e.target.value);
    setMaxWeight(newWeight);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    const data: AcceptedClientsData = {
      acceptsCats,
      acceptsDogs,
      maxWeight,
    };

    setSavedData(data);
    setIsEditing(false);

    if (onSave) {
      onSave(data);
    }

    // NOTE: When connected to database, save here:
    // await database.profiles.update({
    //   accepts_cats: data.acceptsCats,
    //   accepts_dogs: data.acceptsDogs,
    //   max_weight: data.maxWeight  // null = no size limit
    // });
  };

  // Check if anything is selected
  const hasSelections = savedData.acceptsCats || savedData.acceptsDogs;

  return (
    <div>
      {isEditing ? (
        // Edit Mode
        <div className="space-y-4">
          {/* Cats Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cats"
              checked={acceptsCats}
              onChange={handleCatsChange}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="cats" className="ml-3 text-gray-700 cursor-pointer">
              Cats
            </label>
          </div>

          {/* Dogs Checkbox */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dogs"
                checked={acceptsDogs}
                onChange={handleDogsChange}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="dogs" className="ml-3 text-gray-700 cursor-pointer">
                Dogs
              </label>
            </div>

            {/* Dog Size Options */}
            {acceptsDogs && (
              <div className="ml-8 mt-3 space-y-4 p-4">
                {/* No Size Limit Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="noSizeLimit"
                    checked={maxWeight === null}
                    onChange={handleNoSizeLimitChange}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="noSizeLimit" className="ml-3 text-gray-700 cursor-pointer">
                    No size limit
                  </label>
                </div>

                {/* Maximum Weight Slider */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Maximum weight
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="80"
                      step="5"
                      value={maxWeight ?? 40}
                      onChange={handleWeightChange}
                      disabled={maxWeight === null}
                      className={`flex-1 h-2 bg-[#E4E1FF] rounded-lg appearance-none cursor-pointer
                        ${maxWeight === null ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-[#5B4FC6]
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-purple-[#5B4FC6]
                        [&::-moz-range-thumb]:border-0
                        [&::-moz-range-thumb]:cursor-pointer`}
                    />
                    <span className={`text-gray-700 font-medium min-w-[50px] ${maxWeight === null ? 'opacity-50' : 'opacity-100'}`}>
                      {maxWeight ?? 40} lbs
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
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
          {hasSelections ? (
            <div className="space-y-3">
              {/* Display saved selections */}
              {savedData.acceptsCats && (
                <div className="flex items-center gap-3 p-1">
                  <Image
                    src="/cat-icon.svg"
                    width={32}
                    height={32}
                    alt="Cat"
                   />
                  <span className="text-[#9185FF] font-medium">Cats</span>
                </div>
              )}
              
              {savedData.acceptsDogs && (
                <div className="flex items-center gap-3 p-1">
                  <Image
                    src="/dog-icon.svg"
                    width={32}
                    height={32}
                    alt="Dog"
                   />
                  <span className="text-[#9185FF] font-medium">
                    Dogs {savedData.maxWeight !== null && `under ${savedData.maxWeight} lbs`}
                  </span>
                </div>
              )}

              <button
                onClick={handleEdit}
                className="mt-2 text-sm text-[#878787] hover:text-[#9185FF]"
              >
                Edit accepted clients
              </button>
            </div>
          ) : (
            <div
              onClick={handleEdit}
              className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors text-center"
            >
              <span className="text-gray-400">Click to select accepted clients</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Example usage in editor page:
function EditorExample() {
  const handleSave = (data: AcceptedClientsData) => {
    console.log('Accepted clients saved:', data);
    // Save to database
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-2">Accepted Clients</h2>
      <AcceptedClients onSave={handleSave} />
    </div>
  );
}