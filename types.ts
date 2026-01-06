export type ViewState = 'home' | 'diagnostic' | 'results';

export type ServiceFeature = string | { text: string; tooltip: string };

export interface ServiceOffer {
  id: string;
  title: string;
  priceDisplay: string;
  originalPrice?: string;
  features: ServiceFeature[];
  cta: string;
  highlight?: boolean;
  isNew?: boolean;
  badge?: string;
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

export interface AccessibilityState {
  highContrast: boolean;
  fontSize: number;
  dyslexicFont: boolean;
  grayscale: boolean;
  readingGuide: boolean;
  lineHeight: number;
}