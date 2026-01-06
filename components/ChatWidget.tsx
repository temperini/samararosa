import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Bot } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  options?: { label: string; action: string }[];
}

export const ChatWidget: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Olá! Eu sou a Samy, o clone virtual da Samara Rosa. Como posso ajudar você hoje a transformar seu negócio?',
      options: [
        { label: 'Fazer Diagnóstico Gratuito', action: 'diagnostic' },
        { label: 'Ver Mentorias', action: 'services' },
        { label: 'Falar com Humano', action: 'human' }
      ]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleOptionClick = (option: { label: string; action: string }) => {
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: option.label };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let botResponse: Message;

      switch (option.action) {
        case 'diagnostic':
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: 'Ótima escolha! O diagnóstico é o primeiro passo para a mudança. Vou te levar para lá agora.',
          };
          setTimeout(() => {
             onNavigate('diagnostic');
             setIsOpen(false);
          }, 1500);
          break;
        case 'services':
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: 'Temos opções desde mentorias rápidas até consultorias presenciais. Vou rolar a página para você ver as ofertas.',
          };
          setTimeout(() => {
             const element = document.getElementById('servicos');
             element?.scrollIntoView({ behavior: 'smooth' });
             setIsOpen(false);
          }, 1500);
          break;
        case 'human':
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: 'Entendi. Para falar com a equipe real, clique no botão abaixo para abrir o WhatsApp.',
            options: [{ label: 'Abrir WhatsApp', action: 'whatsapp' }]
          };
          break;
        case 'whatsapp':
          window.open('https://wa.me/5585986150696', '_blank');
          botResponse = {
             id: (Date.now() + 1).toString(),
             sender: 'bot',
             text: 'Abri o WhatsApp para você em outra aba. Algo mais?'
          };
          break;
        default:
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: 'Posso ajudar com mais alguma coisa?'
          };
      }
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div 
          className="mb-4 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up"
          role="dialog"
          aria-label="Assistente Virtual Samy"
        >
          <div className="bg-brand-dark p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                <Bot size={18} className="text-brand-dark" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Fale com a Samy</h3>
                <span className="text-xs text-gray-300">Assistente Virtual (IA)</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-brand-gold transition-colors"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-stone/30">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-brand-action text-white rounded-br-none' 
                      : 'bg-white border border-gray-100 text-brand-dark rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
             {messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].options && (
                <div className="flex flex-col gap-2 mt-2">
                  {messages[messages.length - 1].options!.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="text-sm bg-white border border-brand-action text-brand-action hover:bg-brand-action hover:text-white py-2 px-3 rounded-full transition-colors self-start shadow-sm font-semibold"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
             )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-brand-dark hover:bg-brand-action text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 focus:ring-4 focus:ring-brand-gold"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat com assistente virtual"}
      >
        <span className={`max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold ${isOpen ? 'hidden' : 'block'}`}>
          Fale com a Samy
        </span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};