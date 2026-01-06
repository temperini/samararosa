import React from 'react';
import { ServiceOffer, Question } from './types';
import { CheckCircle, Award, TrendingUp, Users } from 'lucide-react';

export const OFFERS: ServiceOffer[] = [
  {
    id: 'mentoria-pratica',
    title: 'Mentoria Prática',
    priceDisplay: 'R$ 299',
    features: [
      '01 mentoria online de até 02 horas',
      'Relatório Diagnóstico (Método CEO 5 Estrelas)',
      'Plano de Trabalho Empreendedor co-criado',
      'Conclusão rápida em 2 semanas'
    ],
    cta: 'Contratar Mentoria Prática',
    highlight: false
  },
  {
    id: 'jornada-online',
    title: 'Jornada Online CEO Óptica',
    priceDisplay: 'R$ 499',
    originalPrice: 'R$ 699',
    features: [
      'Acesso a conteúdos gravados por 02 anos',
      '20 passos do Método CEO Óptica',
      'Aprenda no seu ritmo',
      'Certificado de conclusão'
    ],
    cta: 'Começar a Jornada',
    highlight: false
  },
  {
    id: 'jornada-presencial',
    title: 'Jornada Completa CEO 5 Estrelas',
    priceDisplay: 'R$ 4.999',
    originalPrice: 'R$ 5.999',
    features: [
      'Consultoria completa',
      'Realizada pela própria Samara Rosa',
      'Acompanhamento de 06 meses',
      'Avaliações mensais de evolução'
    ],
    cta: 'Aplicar para Consultoria',
    highlight: true
  },
  {
    id: 'specialized',
    title: 'Mentorias & Palestras',
    priceDisplay: 'Sob Consulta',
    features: [
      'Conselhos para PME',
      'Palestras: "De empreendedora à empresária"',
      'Workshops de Vendas e SAC',
      'Personalizado para sua empresa'
    ],
    cta: 'Solicitar Orçamento',
    highlight: false
  }
];

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Gestão',
    text: 'Como você define o controle dos indicadores da sua empresa hoje?',
    options: [
      { value: 1, label: 'Não acompanho indicadores, vou pelo feeling.' },
      { value: 2, label: 'Olho apenas o faturamento no final do mês.' },
      { value: 3, label: 'Tenho metas claras e acompanho semanalmente.' }
    ]
  },
  {
    id: 2,
    category: 'Vendas',
    text: 'Como é o processo de vendas da sua equipe?',
    options: [
      { value: 1, label: 'Cada vendedor faz do seu jeito.' },
      { value: 2, label: 'Temos um script básico, mas nem sempre é seguido.' },
      { value: 3, label: 'Processo padronizado, treinado e monitorado.' }
    ]
  },
  {
    id: 3,
    category: 'Financeiro',
    text: 'Você sabe exatamente qual é a margem de lucro de cada produto?',
    options: [
      { value: 1, label: 'Não sei, aplico um markup padrão.' },
      { value: 2, label: 'Sei dos principais produtos apenas.' },
      { value: 3, label: 'Sim, precificação estratégica baseada em custos reais.' }
    ]
  },
  {
    id: 4,
    category: 'Liderança',
    text: 'Com que frequência você dá feedback para seu time?',
    options: [
      { value: 1, label: 'Apenas quando algo dá muito errado.' },
      { value: 2, label: 'Tento fazer mensalmente, mas às vezes falho.' },
      { value: 3, label: 'Cultura de feedback constante e reuniões estruturadas.' }
    ]
  },
  {
    id: 5,
    category: 'Operações',
    text: 'Se você se ausentar por 15 dias, como a empresa funciona?',
    options: [
      { value: 1, label: 'O caos se instala, tudo depende de mim.' },
      { value: 2, label: 'Funciona, mas com alguns problemas operacionais.' },
      { value: 3, label: 'Roda perfeitamente, os processos são autônomos.' }
    ]
  }
];