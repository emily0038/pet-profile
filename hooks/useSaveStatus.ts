import { useState, useCallback, useRef, useEffect } from 'react';

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

interface UseSaveStatusReturn {
  status: SaveStatus;
  lastSaved: Date | null;
  markUnsaved: () => void;
  markSaving: () => void;
  markSaved: () => void;
  markError: () => void;
  saveWithStatus: <T>(saveFunction: () => Promise<T>) => Promise<T>;
}

export function useSaveStatus(autoSaveDelay: number = 2000): UseSaveStatusReturn {
  const [status, setStatus] = useState<SaveStatus>('saved');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const markUnsaved = useCallback(() => {
    setStatus('unsaved');
  }, []);

  const markSaving = useCallback(() => {
    setStatus('saving');
  }, []);

  const markSaved = useCallback(() => {
    setStatus('saved');
    setLastSaved(new Date());
  }, []);

  const markError = useCallback(() => {
    setStatus('error');
  }, []);

  const saveWithStatus = useCallback(async <T,>(saveFunction: () => Promise<T>): Promise<T> => {
    try {
      setStatus('saving');
      const result = await saveFunction();
      setStatus('saved');
      setLastSaved(new Date());
      return result;
    } catch (error) {
      setStatus('error');
      throw error;
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    status,
    lastSaved,
    markUnsaved,
    markSaving,
    markSaved,
    markError,
    saveWithStatus,
  };
}
