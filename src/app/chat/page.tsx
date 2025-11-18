'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, AlertTriangle, Info, AlertCircle, Sparkles, Mic, Image as ImageIcon } from 'lucide-react';
import { ChatMessage, RiskLevel } from '@/lib/types';
import { toast } from 'sonner';

export default function ChatPage() {
  const router = useRouter();
  const { currentPet } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Olá! Sou o assistente inteligente do Cuidados Pet. Estou aqui para ajudar com dúvidas sobre ${currentPet?.name || 'seu pet'}.\n\nPosso orientar sobre:\n• Comportamento e treinamento\n• Alimentação e nutrição\n• Sintomas e sinais de alerta\n• Primeiros socorros\n• Cuidados diários\n\nComo posso ajudar você hoje?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeRisk = (message: string): RiskLevel => {
    const emergencyKeywords = ['convulsão', 'sangue', 'respirar', 'engasgo', 'veneno', 'intoxicação', 'desmaiou', 'inconsciente'];
    const alertKeywords = ['vômito', 'diarreia', 'febre', 'dor', 'ferimento', 'sangramento'];
    const mildKeywords = ['coceira', 'pulga', 'carrapato', 'tosse leve'];

    const lowerMessage = message.toLowerCase();

    if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'emergency';
    }
    if (alertKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'alert';
    }
    if (mildKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'mild';
    }
    return 'common';
  };

  const generateResponse = async (userMessage: string, risk: RiskLevel): Promise<string> => {
    // Simula resposta da IA baseada no risco
    await new Promise(resolve => setTimeout(resolve, 1500));

    const petInfo = currentPet ? `${currentPet.name} (${currentPet.species === 'dog' ? 'cão' : 'gato'}, ${currentPet.breed}, ${currentPet.ageGroup === 'puppy' ? 'filhote' : currentPet.ageGroup === 'adult' ? 'adulto' : 'idoso'}, ${currentPet.weight}kg)` : 'seu pet';

    if (risk === 'emergency') {
      return `🚨 ATENÇÃO - EMERGÊNCIA DETECTADA\n\nIdentifiquei sinais que podem indicar uma situação de emergência para ${petInfo}.\n\n⚠️ AÇÃO IMEDIATA NECESSÁRIA:\n1. Mantenha a calma\n2. Procure um veterinário IMEDIATAMENTE\n3. Se possível, ligue antes para avisar que está chegando\n\nEnquanto se dirige ao veterinário:\n• Mantenha o pet calmo e confortável\n• Não dê medicamentos sem orientação\n• Observe e anote os sintomas\n\n📍 Esta é uma orientação preliminar. Um veterinário deve avaliar o pet o quanto antes.\n\n⚠️ LEMBRE-SE: Este aplicativo não substitui atendimento veterinário. Em emergências, sempre procure ajuda profissional imediatamente.`;
    }

    if (risk === 'alert') {
      return `⚠️ SINAL DE ALERTA\n\nIdentifiquei sintomas que merecem atenção para ${petInfo}.\n\nRECOMENDAÇÕES:\n• Monitore os sintomas de perto\n• Anote frequência e intensidade\n• Mantenha o pet hidratado\n• Evite automedicação\n\nQUANDO PROCURAR VETERINÁRIO:\n• Se os sintomas persistirem por mais de 24h\n• Se houver piora do quadro\n• Se o pet estiver apático ou sem apetite\n• Se for filhote ou idoso\n\nPosso fornecer mais orientações específicas sobre os sintomas. O que mais você gostaria de saber?\n\n⚠️ IMPORTANTE: Este aplicativo não substitui consultas veterinárias. Em caso de dúvida, sempre consulte um profissional.`;
    }

    if (risk === 'mild') {
      return `ℹ️ ORIENTAÇÃO\n\nVou ajudar você com essa questão sobre ${petInfo}.\n\nPara sintomas leves como esse, geralmente podemos:\n• Observar a evolução por 24-48h\n• Manter cuidados básicos de higiene\n• Garantir alimentação e hidratação adequadas\n\nSe você notar qualquer um destes sinais, procure um veterinário:\n• Piora dos sintomas\n• Perda de apetite\n• Letargia ou apatia\n• Novos sintomas aparecerem\n\nPosso dar mais detalhes sobre cuidados específicos. O que você gostaria de saber?`;
    }

    return `Entendo sua dúvida sobre ${petInfo}.\n\nVou ajudar você com orientações personalizadas. Baseado no perfil do seu pet:\n• Espécie: ${currentPet?.species === 'dog' ? 'Cão' : 'Gato'}\n• Idade: ${currentPet?.ageGroup === 'puppy' ? 'Filhote' : currentPet?.ageGroup === 'adult' ? 'Adulto' : 'Idoso'}\n• Raça: ${currentPet?.breed}\n\nPara te ajudar melhor, você poderia me dar mais detalhes sobre sua dúvida? Por exemplo:\n• Há quanto tempo isso está acontecendo?\n• Já tentou algo?\n• Há outros sintomas?\n\nAssim posso dar uma orientação mais precisa e personalizada! 😊`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const risk = analyzeRisk(input);
      
      // Mostra toast para emergências
      if (risk === 'emergency') {
        toast.error('Emergência detectada! Procure um veterinário imediatamente!', {
          duration: 5000,
        });
      }

      const response = await generateResponse(input, risk);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        riskLevel: risk,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Erro ao processar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const getRiskIcon = (risk?: RiskLevel) => {
    switch (risk) {
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'mild':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getRiskBg = (risk?: RiskLevel) => {
    switch (risk) {
      case 'emergency':
        return 'bg-red-50 border-red-200';
      case 'alert':
        return 'bg-orange-50 border-orange-200';
      case 'mild':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-emerald-50 border-emerald-200';
    }
  };

  const handleVoiceInput = () => {
    toast.info('Funcionalidade de áudio em breve!');
  };

  const handleImageInput = () => {
    toast.info('Funcionalidade de imagem em breve!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-white hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Assistente IA</h1>
            <p className="text-sm text-emerald-100">Suporte 24h para {currentPet?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceInput}
              className="text-white hover:bg-white/20 transition-all duration-200"
              title="Enviar áudio"
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleImageInput}
              className="text-white hover:bg-white/20 transition-all duration-200"
              title="Enviar imagem"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom duration-300`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card
              className={`max-w-[80%] p-4 transition-all duration-300 hover:shadow-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                  : `${getRiskBg(message.riskLevel)} border`
              }`}
            >
              {message.role === 'assistant' && message.riskLevel && (
                <div className="flex items-center gap-2 mb-2">
                  {getRiskIcon(message.riskLevel)}
                </div>
              )}
              <p className="text-sm whitespace-pre-line leading-relaxed">
                {message.content}
              </p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom duration-300">
            <Card className="max-w-[80%] p-4 bg-emerald-50 border-emerald-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="text-sm text-emerald-700 ml-2">Analisando...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white/80 backdrop-blur-sm p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua dúvida..."
            className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
