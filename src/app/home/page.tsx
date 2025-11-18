'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Heart, Calendar, BookOpen, User, Settings, PawPrint, Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { currentPet, profile } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento inicial
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const mainFeatures = [
    {
      icon: MessageSquare,
      title: 'Assistente IA',
      description: 'Tire dúvidas 24h',
      color: 'from-emerald-500 to-teal-600',
      route: '/chat',
    },
    {
      icon: Heart,
      title: 'Primeiros Socorros',
      description: 'Orientações de emergência',
      color: 'from-red-500 to-rose-600',
      route: '/first-aid',
    },
    {
      icon: BookOpen,
      title: 'Cuidados Diários',
      description: 'Rotinas personalizadas',
      color: 'from-blue-500 to-indigo-600',
      route: '/daily-care',
    },
    {
      icon: Calendar,
      title: 'Lembretes',
      description: 'Vacinas e consultas',
      color: 'from-purple-500 to-pink-600',
      route: '/reminders',
    },
  ];

  const getTipOfDay = () => {
    if (!currentPet) return 'Cadastre seu pet para receber dicas personalizadas!';
    
    switch (currentPet.ageGroup) {
      case 'puppy':
        return 'Filhotes precisam de socialização! Exponha seu pet a diferentes ambientes, pessoas e sons de forma gradual e positiva.';
      case 'adult':
        return 'Mantenha a rotina de exercícios! Atividades físicas regulares são essenciais para a saúde física e mental do seu pet.';
      case 'senior':
        return 'Pets idosos precisam de check-ups mais frequentes. Agende consultas veterinárias a cada 6 meses para monitorar a saúde.';
      default:
        return 'Cuide bem do seu pet com amor e atenção!';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full animate-pulse">
                  <div className="w-6 h-6 bg-white/30 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-white/30 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-gray-200 rounded-full" />
              <div className="h-8 w-24 bg-gray-200 rounded-full" />
              <div className="h-8 w-20 bg-gray-200 rounded-full" />
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6 bg-white/80 backdrop-blur-sm animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <PawPrint className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Olá, {profile?.tutor.name}!</h1>
                {currentPet && (
                  <p className="text-emerald-100 text-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Cuidando de {currentPet.name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 animate-in fade-in slide-in-from-right duration-500">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/profile')}
                className="text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                title="Perfil"
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/settings')}
                className="text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                title="Configurações"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Pet Info Card */}
        {currentPet && (
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentPet.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                    {currentPet.species === 'dog' ? '🐕 Cão' : '🐱 Gato'}
                  </span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                    {currentPet.breed}
                  </span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                    {currentPet.ageGroup === 'puppy' ? '🐾 Filhote' : currentPet.ageGroup === 'adult' ? '🦴 Adulto' : '🎖️ Idoso'}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                    ⚖️ {currentPet.weight}kg
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/profile')}
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Ver Perfil
              </Button>
            </div>
          </Card>
        )}

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.route}
                className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => router.push(feature.route)}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 animate-in fade-in slide-in-from-bottom duration-500 delay-500">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Dica do Dia</h3>
              <p className="text-gray-700 leading-relaxed">
                {getTipOfDay()}
              </p>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 italic animate-in fade-in duration-700 delay-700">
          * Este aplicativo não substitui consultas veterinárias. Em caso de emergência, procure um veterinário imediatamente.
        </p>
      </div>
    </div>
  );
}
