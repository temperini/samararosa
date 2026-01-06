import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS, OFFERS } from '../constants';
import { DiagnosticResult, ServiceOffer } from '../types';
import { ArrowRight, Check, RefreshCw, Trophy, TrendingUp, Star, Rocket, Target, ShieldCheck } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SAMARA_PHOTO = "https://temperini.github.io/samara-consult/foto_samara_rosa_consultora_pme_oticas_ceo_5_estrelas.jpg";

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export const DiagnosticWizard: React.FC<Props> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [DIAGNOSTIC_QUESTIONS[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    let totalScore = 0;
    const maxScore = DIAGNOSTIC_QUESTIONS.length * 3;
    Object.values(finalAnswers).forEach(val => totalScore += val);
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let level: DiagnosticResult['level'] = 'Iniciante';
    let tips: string[] = [];
    let recommendedIds: string[] = [];
    
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
    A: Math.round(value as number),
    fullMark: 100,
  })) : [];

  const handleContract = (serviceTitle: string) => {
    const phoneNumber = "5585986150686";
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
                    src={SAMARA_PHOTO} 
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
                    {service.installment && (
                      <p className="text-xs text-gray-300 font-bold mt-1">{service.installment}</p>
                    )}
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