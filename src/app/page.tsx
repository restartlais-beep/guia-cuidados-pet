'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { PawPrint, Sparkles } from 'lucide-react';

export default function WelcomePage() {
  const { isOnboarded } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isOnboarded) {
      router.push('/home');
    }
  }, [isOnboarded, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo/Ícone */}
        <div className="flex justify-center animate-in fade-in zoom-in duration-700">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-full shadow-2xl">
              <PawPrint className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Título */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Cuidados Pet
          </h1>
          <p className="text-xl text-emerald-600 font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Guia Inteligente
          </p>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          Seu assistente inteligente para cuidar do seu melhor amigo. 
          Orientações personalizadas, primeiros socorros e suporte 24h.
        </p>

        {/* Benefícios */}
        <div className="space-y-3 text-left bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-in fade-in slide-in-from-bottom duration-700 delay-400">
          <div className="flex items-start gap-3 transition-all duration-300 hover:translate-x-2">
            <div className="bg-emerald-100 rounded-full p-2 mt-1">
              <PawPrint className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Assistente IA 24h</h3>
              <p className="text-sm text-gray-600">Tire dúvidas a qualquer momento</p>
            </div>
          </div>
          <div className="flex items-start gap-3 transition-all duration-300 hover:translate-x-2">
            <div className="bg-teal-100 rounded-full p-2 mt-1">
              <PawPrint className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Primeiros Socorros</h3>
              <p className="text-sm text-gray-600">Orientações em emergências</p>
            </div>
          </div>
          <div className="flex items-start gap-3 transition-all duration-300 hover:translate-x-2">
            <div className="bg-cyan-100 rounded-full p-2 mt-1">
              <PawPrint className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Cuidados Personalizados</h3>
              <p className="text-sm text-gray-600">Rotinas adaptadas ao seu pet</p>
            </div>
          </div>
        </div>

        {/* Botão */}
        <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <Button
            onClick={() => router.push('/onboarding')}
            size="lg"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg py-6 hover:scale-105"
          >
            Começar Agora
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 italic animate-in fade-in duration-700 delay-600">
          * Este aplicativo não substitui consultas veterinárias
        </p>
      </div>
    </div>
  );
}
