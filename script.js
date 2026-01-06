import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, Star, ArrowRight, BarChart, Users, Target, CheckCircle, Check, 
  Award, ShieldCheck, Store, Unlock, Settings, DollarSign, MessageCircle,
  RefreshCw, TrendingUp, Rocket, Package, Handshake, UserPlus, Briefcase, Truck, Megaphone, Cpu, Info
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// --- CONSTANTS ---

const SAMARA_PHOTO = "/samara-rosa.jpg";

const OFFERS = [
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
    highlight: false,
    badge: 'Mais Popular'
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
    cta: 'ENTRAR NA LISTA',
    highlight: false,
    badge: 'Em Breve'
  },
  {
    id: 'jornada-presencial',
    title: 'Jornada Completa CEO 5 Estrelas',
    priceDisplay: 'R$ 6.999',
    originalPrice: 'R$ 8.999',
    features: [
      'Consultoria completa',
      'Realizada pela própria Samara Rosa',
      'Acompanhamento de 06 meses',
      'Avaliações mensais de evolução'
    ],
    cta: 'Aplicar para Consultoria',
    highlight: true,
    badge: 'Premium'
  },
  {
    id: 'specialized',
    title: 'Eventos, Palestras e Projetos Especiais',
    priceDisplay: 'Sob Consulta',
    features: [
      'Atuação em Conselhos para PME',
      {
        text: 'Palestra + Workshop: CEO 5 Estrelas: De empreendedora à empresária - a real transformação',
        tooltip: 'O caminho estratégico para deixar de "apagar incêndios" e assumir, com excelência a governança do seu negócio.'
      },
      {
        text: 'Palestra: Pé na Estrada: Mulher, Filha, Mãe Atípica, Motociclista e CEO',
        tooltip: 'Motivação, resiliência, equilíbrio e a força da liderança feminina em múltiplas facetas.'
      },
      {
        text: 'Workshop: Venda e Entregue Como Nunca',
        tooltip: 'Alta performance para times de vendas, comerciais, empresários, SAC e Sucesso do Cliente.'
      }
    ],
    cta: 'Solicitar Orçamento',
    highlight: false,
    badge: 'Personalizado'
  }
];

const DIAGNOSTIC_QUESTIONS = [
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

// --- COMPONENTS ---

const DiagnosticWizard = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [DIAGNOSTIC_QUESTIONS[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    let totalScore = 0;
    const maxScore = DIAGNOSTIC_QUESTIONS.length * 3;
    Object.values(finalAnswers).forEach(val => totalScore += val);
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let level = 'Iniciante';
    let tips = [];
    let recommendedIds = [];
    
    if (percentage < 50) {
      level = 'Iniciante';
      tips = [
        'Priorize a organização do fluxo de caixa imediatamente.',
        'Comece a registrar todos os processos básicos.',
        'Defina metas semanais simples para a equipe.'
      ];
      recommendedIds = ['mentoria-pratica'];
    } else if (percentage < 80) {
      level = 'Em Crescimento';
      tips = [
        'Invista em treinamento de liderança para seus gerentes.',
        'Implemente um CRM para gestão de vendas.',
        'Comece a delegar mais o operacional para focar no estratégico.'
      ];
      recommendedIds = ['mentoria-pratica', 'jornada-online'];
    } else if (percentage < 95) {
      level = 'CEO 5 Estrelas';
      tips = [
        'Foque em expansão e replicação do modelo de sucesso.',
        'Busque inovações tecnológicas para o setor.',
        'Fortaleça a cultura organizacional e governança.'
      ];
      recommendedIds = ['jornada-online', 'jornada-presencial'];
    } else {
      level = 'CEO 5 Estrelas'; 
      tips = [
        'Consolide sua autoridade no mercado regional.',
        'Prepare a empresa para sucessão ou venda estratégica.',
        'Expanda sua rede através de novas unidades ou franquias.'
      ];
      recommendedIds = ['specialized'];
    }

    const categoryScores = {
      'Gestão': finalAnswers[1] * 33.3,
      'Vendas': finalAnswers[2] * 33.3,
      'Financeiro': finalAnswers[3] * 33.3,
      'Liderança': finalAnswers[4] * 33.3,
      'Operações': finalAnswers[5] * 33.3,
    };

    setResult({
      score: percentage,
      categoryScores,
      level,
      tips,
      recommendedServiceIds: recommendedIds
    });
  };

  const chartData = result ? Object.entries(result.categoryScores).map(([name, value]) => ({
    subject: name,
    A: Math.round(value),
    fullMark: 100,
  })) : [];

  const handleContract = (serviceTitle) => {
    const phoneNumber = "5585986150696";
    let message = `Olá! Fiz o diagnóstico empresarial e gostaria de saber mais sobre: ${serviceTitle}`;

    if (result) {
        message += `\nMeu diagnóstico foi: ${result.level} (${result.score}%).`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (result) {
    const recommendedServices = OFFERS.filter(o => result.recommendedServiceIds.includes(o.id));

    return (
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-brand-dark p-10 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Seu Diagnóstico Executivo</h2>
            <div className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-6 py-2 rounded-full font-black text-xl mt-4 shadow-lg uppercase tracking-widest">
              <Star size={24} className="fill-brand-dark" />
              {result.score >= 95 ? 'Nível Top Performance' : result.level}
            </div>
            <p className="mt-6 text-gray-400 font-medium uppercase tracking-widest text-sm">Score de Maturidade: {result.score}%</p>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-brand-stone/30 p-6 rounded-3xl border border-brand-stone">
              <h3 className="text-xl font-bold text-brand-dark mb-8 flex items-center gap-3 font-serif">
                <TrendingUp className="text-brand-action" /> Desempenho por Pilar
              </h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#1C1C1C', fontSize: 12, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <Radar
                      name="Seu Negócio"
                      dataKey="A"
                      stroke="#B45C38"
                      fill="#B45C38"
                      fillOpacity={0.5}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-3 font-serif">
                <Target className="text-brand-gold" /> Estratégia Imediata
              </h3>
              <div className="space-y-4 mb-8">
                {result.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-brand-stone hover:border-brand-gold transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-brand-stone flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-colors">
                      <Check size={18} className="text-brand-dark" />
                    </div>
                    <p className="text-brand-dark font-semibold leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-brand-stone pt-16">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 rounded-full border-4 border-brand-gold overflow-hidden mb-4 shadow-xl bg-brand-stone">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" 
                    alt="Samara Rosa" 
                    className="w-full h-full object-cover object-top"
                  />
              </div>
              <span className="text-brand-action font-black uppercase tracking-[0.2em] text-xs">Recomendação da Samara</span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mt-2">Plano de Evolução Customizado</h3>
              <p className="text-gray-500 mt-2 font-medium">Com base no seu perfil, estes são os caminhos ideais para seu próximo salto:</p>
            </div>

            <div className={`grid gap-6 ${recommendedServices.length > 1 ? 'md:grid-cols-2' : 'max-w-md mx-auto'}`}>
              {recommendedServices.map((service) => (
                <div key={service.id} className="bg-brand-dark text-white rounded-3xl p-8 flex flex-col shadow-xl border border-brand-gold/20 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-gold/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10 mb-6">
                    {service.isNew && (
                        <span className="bg-white text-brand-action px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block mr-2">
                          NOVO
                        </span>
                    )}
                    <span className="bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                      Solução Indicada
                    </span>
                    <h4 className="text-xl font-bold font-serif mb-2">{service.title}</h4>
                    <p className="text-3xl font-bold text-brand-gold tracking-tighter">{service.priceDisplay}</p>
                  </div>

                  <ul className="flex-grow space-y-3 mb-8 relative z-10">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                        <ShieldCheck size={16} className="text-brand-gold shrink-0" />
                        <span>{typeof feat === 'string' ? feat : feat.text}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleContract(service.title)}
                    className="w-full bg-brand-action hover:bg-white hover:text-brand-action text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs relative z-10 shadow-lg"
                  >
                    Contratar Agora <Rocket size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-brand-stone/50 p-6 text-center border-t border-brand-stone">
            <button onClick={onBack} className="text-gray-400 hover:text-brand-action font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors">
                <RefreshCw size={14} /> Refazer Teste de Maturidade
            </button>
        </div>
      </div>
    );
  }

  const question = DIAGNOSTIC_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / DIAGNOSTIC_QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between text-xs font-black text-gray-400 uppercase tracking-widest">
        <span>Progresso: {Math.round(progress)}%</span>
        <button onClick={onBack} className="text-brand-action hover:text-brand-dark transition-colors">Interromper</button>
      </div>
      
      <div className="w-full bg-brand-stone rounded-full h-1.5 mb-12">
        <div className="bg-brand-action h-1.5 rounded-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-brand-stone animate-fade-in-up relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full"></div>
        
        <span className="inline-block bg-brand-stone text-brand-dark text-[10px] font-black px-4 py-1.5 rounded-full mb-8 uppercase tracking-[0.2em] border border-gray-100">
          {question.category}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-10 leading-tight font-serif">
          {question.text}
        </h3>

        <div className="space-y-5">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.currentTarget.blur();
                handleAnswer(option.value);
              }}
              className="w-full text-left p-6 rounded-2xl border-2 border-brand-stone hover:border-brand-action hover:bg-brand-stone/20 transition-all group flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              <span className="text-brand-dark font-bold text-lg group-hover:text-brand-action transition-colors pr-4">{option.label}</span>
              <div className="w-10 h-10 rounded-full border-2 border-brand-stone flex items-center justify-center shrink-0 group-hover:border-brand-action group-hover:bg-brand-action transition-all">
                <ArrowRight className="text-brand-stone group-hover:text-white transition-colors" size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const scroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100; // Adjust for header height + padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    if (view !== 'home') {
      setView('home');
      setTimeout(scroll, 100); // Wait for render
    } else {
      scroll();
    }
    setIsMenuOpen(false);
  };

  const openWhatsApp = (message) => {
    const phoneNumber = "5585986150696";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const Header = () => (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-40 transition-all border-b border-brand-stone">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="font-serif font-bold text-2xl text-brand-dark cursor-pointer tracking-tight group" 
          onClick={() => navigateTo('home')}
        >
          Samara<span className="text-brand-gold group-hover:text-brand-action transition-colors">.</span>Rosa
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('quem-sou')} className="text-brand-dark hover:text-brand-action font-semibold transition-colors">Quem Sou</button>
          <button onClick={() => scrollToSection('metodo')} className="text-brand-dark hover:text-brand-action font-semibold transition-colors">Método</button>
          <button onClick={() => scrollToSection('servicos')} className="text-brand-dark hover:text-brand-action font-semibold transition-colors">Serviços</button>
          <button 
            onClick={() => navigateTo('diagnostic')} 
            className="bg-brand-action hover:bg-brand-dark text-white px-6 py-2 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 uppercase text-xs tracking-widest"
          >
            <BarChart size={16} />
            Diagnóstico Gratuito
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 text-brand-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-brand-stone p-6 flex flex-col gap-4 animate-fade-in">
          <button onClick={() => scrollToSection('quem-sou')} className="py-2 text-lg font-bold text-brand-dark text-left">Quem Sou</button>
          <button onClick={() => scrollToSection('metodo')} className="py-2 text-lg font-bold text-brand-dark text-left">Método</button>
          <button onClick={() => scrollToSection('servicos')} className="py-2 text-lg font-bold text-brand-dark text-left">Serviços</button>
          <button 
             onClick={() => navigateTo('diagnostic')}
             className="w-full bg-brand-action text-white py-3 rounded-lg font-bold uppercase tracking-widest"
          >
            Fazer Diagnóstico
          </button>
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-4 tracking-tight">Samara Rosa</h3>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Transformando a gestão de pequenas e médias empresas com experiência, sustentabilidade e resultados práticos.
            </p>
            <div className="flex gap-4">
               <button 
                  onClick={() => openWhatsApp("Olá! Vim pelo site e gostaria de entrar em contato.")}
                  className="flex items-center gap-2 text-brand-gold hover:text-white transition-colors font-bold uppercase text-xs tracking-widest"
               >
                 <MessageCircle size={18} />
                 Falar no WhatsApp
               </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-4 text-brand-gold uppercase tracking-widest">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400 font-medium">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors text-left w-full">Início</button></li>
              <li><button onClick={() => scrollToSection('quem-sou')} className="hover:text-white transition-colors text-left w-full">Quem Sou</button></li>
              <li><button onClick={() => scrollToSection('metodo')} className="hover:text-white transition-colors text-left w-full">Jornada CEO 5 Estrelas</button></li>
              <li><button onClick={() => scrollToSection('servicos')} className="hover:text-white transition-colors text-left w-full">Serviços</button></li>
              <li><button onClick={() => navigateTo('diagnostic')} className="hover:text-white transition-colors text-left w-full">Diagnóstico</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium uppercase tracking-tighter">
          <p>© 2025 Samara Rosa. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Estratégias Avançadas para PMEs</p>
        </div>
      </div>
    </footer>
  );

  if (view === 'diagnostic') {
    return (
      <div className="min-h-screen flex flex-col bg-brand-stone">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
          <div className="text-center mb-12 animate-fade-in-down">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
              Diagnóstico Empresarial <span className="text-brand-action">Gratuito</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra em qual estágio de maturidade sua empresa está e receba dicas personalizadas.
            </p>
          </div>
          <DiagnosticWizard 
            onComplete={() => navigateTo('home')} 
            onBack={() => navigateTo('home')}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-stone">
      <Header />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 -skew-x-12 transform origin-top-right z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center gap-2 bg-brand-stone text-brand-dark px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-gray-100 uppercase tracking-widest">
                <Star size={14} className="fill-brand-gold text-brand-gold" />
                Autoridade em Gestão Óptica
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark leading-tight mb-8">
                Transforme Sua Empresa em um <span className="text-brand-action">Negócio 5 Estrelas</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                Consultoria especializada para Óticas e Pequenas & Médias Empresas (PMEs). Método comprovado que acelera seu crescimento com excelência.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigateTo('diagnostic')}
                  className="bg-brand-action hover:bg-brand-dark text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  Diagnóstico Gratuito <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => scrollToSection('servicos')}
                  className="bg-white border-2 border-brand-dark text-brand-dark hover:bg-brand-stone px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center uppercase tracking-wide"
                >
                  Ver Serviços
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in-right">
              <div className="relative z-10 mx-auto w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-brand-stone bg-brand-stone">
                <img 
                  src={SAMARA_PHOTO} 
                  alt="Samara Rosa - Retrato Profissional" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-dark/90 to-transparent p-8 pt-24 text-white">
                  <p className="font-serif text-2xl font-bold tracking-tight">Samara Rosa</p>
                  <p className="text-brand-gold font-bold uppercase tracking-widest text-xs mt-1">CEO 5 Estrelas e Fundadora das Óticas Sião</p>
                </div>
              </div>
              <div className="absolute top-10 -left-6 bg-white p-5 rounded-xl shadow-xl border-l-4 border-brand-gold max-w-[150px] z-20">
                <p className="text-3xl font-bold text-brand-dark">20</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-tight mt-1 leading-tight">Anos de Experiência Real</p>
              </div>
              <div className="absolute bottom-20 -right-6 bg-white p-5 rounded-xl shadow-xl border-l-4 border-brand-action max-w-[150px] z-20">
                <p className="text-3xl font-bold text-brand-dark">100%</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-tight mt-1 leading-tight">Método Prático e Testado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quem-sou" className="py-24 bg-brand-stone border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
                <div className="bg-brand-dark text-brand-gold p-3 rounded-2xl mb-6">
                    <Award size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Quem é Samara Rosa</h2>
                <p className="text-xl text-brand-action font-serif italic mb-8 font-bold">Líder por Natureza, Empresária por Vocação</p>
                
                <div className="w-20 h-1 bg-brand-gold rounded-full mb-10"></div>
                
                <p className="text-lg text-gray-600 leading-relaxed font-medium mb-12 max-w-2xl">
                  Samara Rosa é uma empresária experiente e consultora especializada em PMEs, com foco especial em óticas. Criadora do método prático que originou a <span className="text-brand-action font-bold">Jornada CEO 5 Estrelas</span>.
                </p>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-left mb-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-3xl">
                  {[
                    "Batedora de metas há 20 anos",
                    "Empresária há 10+ anos",
                    "Fundadora da rede Óticas Sião",
                    "Consultora especialista em PMEs",
                    "Administradora habilidosa",
                    "Ativa nas causas sociais"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-brand-gold shrink-0" />
                      <span className="font-bold text-brand-dark">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                  Sua trajetória é marcada pela superação e pela busca constante pela excelência. Hoje, ela dedica sua expertise a mentorar outros empreendedores que desejam sair da operação e assumir o papel estratégico de CEO.
                </p>
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" className="py-24 bg-brand-stone relative">
        <div className="container mx-auto px-4 relative z-10">
           <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                 <div className="flex text-brand-gold">
                   {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Método Exclusivo</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-tight">
                Jornada CEO 5 Estrelas
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                Acesse os passos práticos que ninguém ensina, e que vão te transformar em um(a) CEO de excelência, acelerando seu aprendizado e os resultados do seu negócio.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Store,
                  title: "Abertura de Empresa",
                  desc: "Estruturação estratégica para começar certo."
                },
                {
                  icon: BarChart,
                  title: "Gestão & Métricas",
                  desc: "Indicadores claros para tomada de decisão assertiva"
                },
                {
                  icon: Package,
                  title: "Estoque & Logística",
                  desc: "Controle rigoroso e fluxo otimizado."
                },
                {
                  icon: Users,
                  title: "Vendas & Experiência",
                  desc: "Encante clientes e aumente seu faturamento"
                },
                {
                  icon: Handshake,
                  title: "Negociação & Fornecedores",
                  desc: "Estratégias para compras inteligentes."
                },
                {
                  icon: Settings,
                  title: "Operações & Processos",
                  desc: "Eficiência operacional que libera seu tempo"
                },
                {
                  icon: UserPlus,
                  title: "Recrutamento & Seleção",
                  desc: "Contratação assertiva e retenção de talentos."
                },
                {
                  icon: Target,
                  title: "Pessoas & Liderança",
                  desc: "Time engajado e cultura de alta performance"
                },
                {
                  icon: DollarSign,
                  title: "Finanças & Precificação",
                  desc: "Margem saudável e crescimento sustentável"
                },
                {
                  icon: Truck,
                  title: "Base de Fornecedores",
                  desc: "Acesso à base de fornecedores estratégicos e parceiros."
                },
                {
                  icon: Megaphone,
                  title: "Marketing Digital",
                  desc: "Introdução ao uso de redes sociais e atendimento online",
                  isNew: true
                },
                {
                  icon: Cpu,
                  title: "Tecnologia & IA",
                  desc: "Introdução a sistemas e Inteligência Artificial",
                  isNew: true
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-white/50 group h-full flex flex-col items-center text-center relative overflow-hidden">
                   {item.isNew && (
                      <div className="absolute top-4 right-4 bg-brand-action text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-sm">
                        Novo
                      </div>
                   )}
                   <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                      <item.icon size={28} className="text-brand-gold group-hover:text-white transition-colors" />
                   </div>
                   <h3 className="font-serif font-bold text-brand-dark text-lg mb-4 leading-tight">{item.title}</h3>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
           
           <div className="mt-16 text-center">
              <button 
                onClick={() => navigateTo('diagnostic')}
                className="bg-brand-action text-white hover:bg-brand-dark px-10 py-5 rounded-full font-bold text-sm transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 uppercase tracking-widest inline-flex items-center gap-3"
              >
                Descubra como o Método pode te ajudar <ArrowRight size={20} />
              </button>
           </div>
        </div>
      </section>

      <section id="servicos" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">Escolha Seu Próximo Passo</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium mb-4">Mentorias focadas em transformar sua mentalidade e os números da sua empresa.</p>
            <button 
              onClick={() => navigateTo('diagnostic')} 
              className="text-brand-action font-bold hover:underline text-sm uppercase tracking-wide hover:text-brand-dark transition-colors"
            >
              Ainda não sabe o que é melhor pra você? Faça agora o Diagnóstico gratuito para descobrir.
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {OFFERS.map((offer) => (
              <div 
                key={offer.id} 
                className={`relative flex flex-col p-8 rounded-3xl bg-white shadow-sm border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                  offer.highlight ? 'border-brand-gold ring-8 ring-brand-gold/5' : 'border-brand-stone'
                }`}
              >
                {offer.badge && (
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-tighter shadow-sm ${
                    offer.highlight 
                      ? 'bg-brand-gold text-brand-dark' 
                      : 'bg-brand-dark text-white'
                  }`}>
                    {offer.badge}
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-brand-dark mb-6 min-h-[48px] font-serif leading-tight">{offer.title}</h3>
                
                <div className="mb-8">
                  {offer.originalPrice && (
                    <span className="text-xs text-gray-400 line-through block font-bold mb-1">{offer.originalPrice}</span>
                  )}
                  <span className="text-3xl font-bold text-brand-safe tracking-tighter">{offer.priceDisplay}</span>
                </div>

                <ul className="flex-grow space-y-4 mb-10">
                  {offer.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-gray-600 font-bold leading-relaxed">
                      <CheckCircle size={16} className="text-brand-gold shrink-0 mt-0.5" />
                      {typeof feat === 'string' ? (
                        <span>{feat}</span>
                      ) : (
                        <span className="group/item relative">
                           {feat.text}
                           <span className="inline-flex ml-1 align-middle text-brand-action cursor-help relative group/tooltip">
                              <Info size={14} />
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-brand-dark text-white text-[10px] rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none text-center leading-relaxed">
                                 {feat.tooltip}
                                 <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-dark"></span>
                              </span>
                           </span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleContract(service.title)}
                  className="w-full bg-brand-action hover:bg-white hover:text-brand-action text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs relative z-10 shadow-lg"
                  disabled={true}
                  style={{cursor: 'not-allowed', opacity: 0.5}}
                >
                  {offer.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-brand-stone p-8 rounded-3xl border border-gray-100 max-w-3xl mx-auto shadow-inner">
            <p className="font-bold text-brand-dark mb-4 uppercase tracking-widest text-sm">Garantia de Qualidade e Segurança</p>
            <div className="flex flex-wrap justify-center gap-8 text-xs font-black text-brand-safe">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"><Check size={14}/> PAGAMENTO SEGURO</span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"><Check size={14}/> SATISFAÇÃO GARANTIDA</span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"><Check size={14}/> SUPORTE VIP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-action text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-dark/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">Chega de trabalhar apenas para pagar boletos.</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto font-medium">
            Tire o peso do operacional das suas costas e assuma a cadeira de CEO do seu negócio. Comece pelo diagnóstico gratuito.
          </p>
          <button 
            onClick={() => navigateTo('diagnostic')}
            className="bg-white text-brand-action hover:bg-brand-dark hover:text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl transition-all uppercase tracking-widest"
          >
            Quero Ser CEO 5 Estrelas
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;