import { SaveStatus } from '@/hooks/useSaveStatus';

interface SaveStatusIndicatorProps {
  status: SaveStatus;
}

export default function SaveStatusIndicator({ status }: SaveStatusIndicatorProps) {
  // Only show indicator for unsaved, saving, and error states
  if (status === 'saved') {
    return null;
  }

  const getStatusDisplay = () => {
    switch (status) {
      case 'saving':
        return {
          icon: '⋯',
          text: 'Saving...',
          color: '#6B7280',
          bgColor: '#F3F4F6',
        };
      case 'unsaved':
        return {
          icon: '●',
          text: 'Unsaved changes',
          color: '#F59E0B',
          bgColor: '#FEF3C7',
        };
      case 'error':
        return {
          icon: '✕',
          text: 'Error saving',
          color: '#EF4444',
          bgColor: '#FEE2E2',
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '6px',
        backgroundColor: display.bgColor,
        fontSize: '12px',
        fontWeight: 500,
      }}
    >
      <span style={{ color: display.color, fontSize: '10px' }}>
        {display.icon}
      </span>
      <span style={{ color: display.color }}>
        {display.text}
      </span>
    </div>
  );
}
