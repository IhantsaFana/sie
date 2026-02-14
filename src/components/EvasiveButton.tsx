import React, { useState, useRef } from 'react';

interface EvasiveButtonProps {
  onInteract: () => void;
}

export const EvasiveButton: React.FC<EvasiveButtonProps> = ({ onInteract }) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'static',
  });
  const [isEvading, setIsEvading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sizeRef = useRef<{ width: number; height: number } | null>(null);

  const moveButton = () => {
    onInteract();
    
    const button = buttonRef.current;
    if (!button) return;

    if (!sizeRef.current) {
      sizeRef.current = {
        width: button.offsetWidth,
        height: button.offsetHeight
      };
    }

    const { innerWidth, innerHeight } = window;
    const btnWidth = sizeRef.current?.width || button.offsetWidth;
    const btnHeight = sizeRef.current?.height || button.offsetHeight;
    
    const margin = 50; // Bigger margin
    
    const maxLeft = innerWidth - btnWidth - margin;
    const maxTop = innerHeight - btnHeight - margin;
    
    const newLeft = Math.max(margin, Math.random() * maxLeft);
    const newTop = Math.max(margin, Math.random() * maxTop);

    if (!isEvading) {
      const rect = button.getBoundingClientRect();
      
      setStyle({
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${btnWidth}px`, 
        height: `${btnHeight}px`,
        transition: 'none',
        zIndex: 40,
      });
      
      setIsEvading(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStyle({
            position: 'fixed',
            left: `${newLeft}px`,
            top: `${newTop}px`,
            width: `${btnWidth}px`,
            height: `${btnHeight}px`,
            transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: 40,
            transform: `rotate(${Math.random() * 20 - 10}deg)`
          });
        });
      });
    } else {
      setStyle({
        position: 'fixed',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        width: `${btnWidth}px`,
        height: `${btnHeight}px`,
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        zIndex: 40,
        transform: `rotate(${Math.random() * 20 - 10}deg)`
      });
    }
  };

  return (
    <div 
      style={{ 
        width: isEvading && sizeRef.current ? sizeRef.current.width : 'auto',
        height: isEvading && sizeRef.current ? sizeRef.current.height : 'auto' 
      }}
      className="transition-all duration-300"
    >
      <button
        ref={buttonRef}
        onMouseEnter={moveButton}
        onTouchStart={moveButton}
        style={style}
        className="px-8 py-4 bg-white text-valentine-600 border-2 border-valentine-200 text-xl font-bold rounded-full shadow-sm hover:bg-valentine-50 focus:outline-none whitespace-nowrap transition-colors"
      >
        Non 💔
      </button>
    </div>
  );
};
