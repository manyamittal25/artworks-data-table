import React, { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface SelectionOverlayProps {
  onSelect: (count: number) => void;
  trigger: React.ReactNode;
}

export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({ onSelect, trigger }) => {
  const overlayRef = useRef<OverlayPanel>(null);
  const [count, setCount] = useState<number>(0);

  const handleSelect = () => {
    if (count > 0) {
      onSelect(count);
      setCount(0);
      overlayRef.current?.hide();
    }
  };

  return (
    <>
      <div onClick={(e) => overlayRef.current?.toggle(e)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>
      <OverlayPanel ref={overlayRef} style={{ borderRadius: '12px', padding: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem', 
          minWidth: '280px' 
        }}>
          <div>
            <label 
              htmlFor="rowCount" 
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#495057',
              }}
            >
              Select Number of Rows
            </label>
            <InputNumber
              id="rowCount"
              value={count}
              onValueChange={(e) => setCount(e.value ?? 0)}
              min={0}
              showButtons
              style={{ width: '100%' }}
              inputStyle={{ 
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #dee2e6',
              }}
            />
          </div>
          <Button 
            label="Apply Selection" 
            onClick={handleSelect}
            disabled={count === 0}
            style={{
              background: count > 0 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : '#e9ecef',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
      </OverlayPanel>
    </>
  );
};
