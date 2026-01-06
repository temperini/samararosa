export type ViewState = 'home' | 'diagnostic' | 'results';

export interface AccessibilityState {
  highContrast: boolean;
  fontSize: number; // 1 = normal, 1.15 = large, 1.3 = extra large
  dyslexicFont: boolean;
  grayscale: boolean;
  readingGuide: boolean;
  lineHeight: number; // 1 = normal, 1.5 = wide, 2 = extra wide
}

export interface ServiceOffer {
  id: string;
  title: string;
  priceDisplay: string;
  originalPrice?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface Question {
  id: number;
  category: 'Gestão' | 'Vendas' | 'Operações' | 'Liderança' | 'Financeiro';
  text: string;
  options: { value: number; label: string }[];
}

export interface DiagnosticResult {
  score: number; // 0-100
  categoryScores: Record<string, number>;
  level: 'Iniciante' | 'Em Crescimento' | 'CEO 5 Estrelas';
  tips: string[];
  recommendedServiceIds: string[];
}