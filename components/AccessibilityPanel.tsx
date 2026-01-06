import React, { useState } from 'react';
import { 
  Accessibility, X, Type, ZoomIn, ZoomOut, 
  Contrast, Eye, AlignLeft, RefreshCw, MousePointer2 
} from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const acc = useAccessibility();

  const handleToggle = () => setIsOpen(!isOpen);

  const ControlButton = ({ 
    icon: Icon, 
    label, 
    isActive, 
    onClick 
  }: { 
    icon: any, 
    label: string, 
    isActive?: boolean, 
    onClick: () => void 
  }) => (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2 h-24 ${
        isActive 
          ? 'bg-brand-action border-brand-action text-white shadow-md' 
          : 'bg-white border-brand-stone text-brand-dark hover:border-brand-gold'
      }`}
    >
      <Icon size={24} />
      <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">
        {label}
      </span>
    </button>
  );

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed left-6 bottom-6 z-[60] bg-brand-dark text-white p-4 rounded-full shadow-2xl hover:bg-brand-action transition-all transform hover:scale-110 focus:ring-4 focus:ring-brand-gold"
        aria-label="Menu de Acessibilidade"
        aria-expanded={isOpen}
      >
        <Accessibility size={28} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] animate-fade-in"
          onClick={handleToggle}
        />
      )}

      {/* Panel */}
      <div 
        className={`fixed left-0 top-0 bottom-0 w-full sm:w-[400px] bg-brand-stone z-[80] shadow-2xl transition-transform duration-300 transform p-8 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-label="Configurações de Acessibilidade"
      >
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-dark text-white rounded-lg">
              <Accessibility size={24} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-brand-dark">Acessibilidade</h2>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Inclusão & Conforto</p>
            </div>
          </div>
          <button 
            onClick={handleToggle}
            className="p-2 text-brand-dark hover:bg-white rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 space-y-8">
          {/* Section: Text */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Texto e Leitura</h3>
            <div className="grid grid-cols-2 gap-4">
              <ControlButton 
                icon={ZoomIn} 
                label="Aumentar Fonte" 
                onClick={() => acc.updateFontSize(true)} 
              />
              <ControlButton 
                icon={ZoomOut} 
                label="Diminuir Fonte" 
                onClick={() => acc.updateFontSize(false)} 
              />
              <ControlButton 
                icon={Type} 
                label="Fonte Dislexia" 
                isActive={acc.dyslexicFont}
                onClick={acc.toggleDyslexicFont} 
              />
              <ControlButton 
                icon={AlignLeft} 
                label="Espaçamento" 
                isActive={acc.lineHeight > 1.5}
                onClick={acc.updateLineHeight} 
              />
            </div>
          </div>

          {/* Section: Visual */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Visual e Cores</h3>
            <div className="grid grid-cols-2 gap-4">
              <ControlButton 
                icon={Contrast} 
                label="Alto Contraste" 
                isActive={acc.highContrast}
                onClick={acc.toggleHighContrast} 
              />
              <ControlButton 
                icon={Eye} 
                label="Preto e Branco" 
                isActive={acc.grayscale}
                onClick={acc.toggleGrayscale} 
              />
              <ControlButton 
                icon={MousePointer2} 
                label="Guia de Leitura" 
                isActive={acc.readingGuide}
                onClick={acc.toggleReadingGuide} 
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            onClick={acc.resetAll}
            className="w-full flex items-center justify-center gap-2 py-4 text-brand-dark hover:text-brand-action font-black uppercase tracking-widest text-[10px] transition-colors"
          >
            <RefreshCw size={14} /> Restaurar Padrões
          </button>
        </div>
      </div>
    </>
  );
};