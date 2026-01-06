import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilityState } from '../types';

interface AccessibilityContextType extends AccessibilityState {
  toggleHighContrast: () => void;
  toggleDyslexicFont: () => void;
  toggleGrayscale: () => void;
  toggleReadingGuide: () => void;
  updateFontSize: (increment: boolean) => void;
  updateLineHeight: () => void;
  resetAll: () => void;
}

const STORAGE_KEY = 'samara_rosa_accessibility_v1';

const DEFAULT_STATE: AccessibilityState = {
  highContrast: false,
  fontSize: 1,
  dyslexicFont: false,
  grayscale: false,
  readingGuide: false,
  lineHeight: 1.5,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // Apply High Contrast
    document.body.classList.toggle('high-contrast', state.highContrast);
    
    // Apply Dyslexic Font
    document.body.classList.toggle('dyslexic-mode', state.dyslexicFont);
    
    // Apply Grayscale
    document.body.classList.toggle('grayscale-mode', state.grayscale);
    
    // Apply Reading Guide
    document.body.classList.toggle('guide-active', state.readingGuide);

    // Apply Font Size
    document.documentElement.style.fontSize = `${state.fontSize * 16}px`;

    // Apply Line Height
    document.body.style.lineHeight = state.lineHeight.toString();
  }, [state]);

  const toggleHighContrast = () => setState(p => ({ ...p, highContrast: !p.highContrast }));
  const toggleDyslexicFont = () => setState(p => ({ ...p, dyslexicFont: !p.dyslexicFont }));
  const toggleGrayscale = () => setState(p => ({ ...p, grayscale: !p.grayscale }));
  const toggleReadingGuide = () => setState(p => ({ ...p, readingGuide: !p.readingGuide }));
  
  const updateFontSize = (increment: boolean) => {
    setState(p => {
      let newSize = increment ? p.fontSize + 0.1 : p.fontSize - 0.1;
      newSize = Math.max(0.8, Math.min(1.5, newSize));
      return { ...p, fontSize: newSize };
    });
  };

  const updateLineHeight = () => {
    setState(p => {
      const heights = [1.5, 1.8, 2.2];
      const currentIndex = heights.indexOf(p.lineHeight);
      const nextIndex = (currentIndex + 1) % heights.length;
      return { ...p, lineHeight: heights[nextIndex] };
    });
  };

  const resetAll = () => setState(DEFAULT_STATE);

  return (
    <AccessibilityContext.Provider value={{ 
      ...state, 
      toggleHighContrast, 
      toggleDyslexicFont, 
      toggleGrayscale, 
      toggleReadingGuide, 
      updateFontSize,
      updateLineHeight,
      resetAll
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within Provider');
  return context;
};