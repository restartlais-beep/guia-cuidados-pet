'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { setProfile, completeOnboarding } = useApp();

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      setProfile({
        tutor: { id: '', name: '' },
        pets: [],
      });
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-slate-800 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Configurações</h1>
            <p className="text-sm text-gray-300">Gerencie o aplicativo</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* About */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre o App</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">Nome:</span> Cuidados Pet - Guia Inteligente</p>
            <p><span className="font-semibold">Versão:</span> 1.0.0</p>
            <p className="pt-2 text-gray-600">
              Assistente inteligente para tutores de cães e gatos, fornecendo orientações 
              diárias de cuidados, treinamento, higiene, sinais de alerta, primeiros socorros 
              e suporte imediato por IA.
            </p>
          </div>
        </Card>

        {/* Premium */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">✨ Versão Premium</h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Desbloqueie recursos exclusivos:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Consultas ilimitadas com a IA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Vídeos e guias avançados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Múltiplos pets cadastrados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Lembretes automáticos por notificação</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Suporte prioritário</span>
              </li>
            </ul>
            <div className="pt-4 space-y-2">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Assinar Mensal - R$ 19,90/mês
              </Button>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                Assinar Anual - R$ 179,90/ano (25% OFF)
              </Button>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gerenciar Dados</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Seus dados são armazenados localmente no seu dispositivo. 
              Você pode apagar todos os dados a qualquer momento.
            </p>
            <Button
              onClick={handleClearData}
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Apagar Todos os Dados
            </Button>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-900">
              <p className="font-semibold mb-2">⚠️ AVISO IMPORTANTE</p>
              <p>
                Este aplicativo fornece orientações gerais e não substitui consultas 
                veterinárias. Em caso de emergência ou dúvida sobre a saúde do seu pet, 
                sempre procure um veterinário profissional. As informações fornecidas 
                são apenas para fins educacionais e não constituem diagnóstico médico.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contato & Suporte</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">E-mail:</span> suporte@cuidadospet.com</p>
            <p><span className="font-semibold">WhatsApp:</span> (11) 99999-9999</p>
            <p className="pt-2 text-gray-600">
              Estamos aqui para ajudar! Entre em contato se tiver dúvidas ou sugestões.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
