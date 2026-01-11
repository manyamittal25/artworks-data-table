import React from 'react';

interface SelectedCountBadgeProps {
  count: number;
}

export const SelectedCountBadge: React.FC<SelectedCountBadgeProps> = ({ count }) => {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1.25rem',
      background: count > 0 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : '#f8f9fa',
      color: count > 0 ? '#ffffff' : '#6c757d',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '0.95rem',
      boxShadow: count > 0 
        ? '0 4px 12px rgba(102, 126, 234, 0.4)' 
        : '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: count > 0 ? 'none' : '1px solid #dee2e6',
    }}>
      <span style={{
        fontSize: '1.1rem',
        fontWeight: 700,
        minWidth: '2rem',
        textAlign: 'center',
        background: count > 0 ? 'rgba(255, 255, 255, 0.2)' : '#e9ecef',
        padding: '0.25rem 0.5rem',
        borderRadius: '8px',
        display: 'inline-block',
      }}>
        {count}
      </span>
      <span>
        {count === 1 ? 'Artwork Selected' : 'Artworks Selected'}
      </span>
    </div>
  );
};
