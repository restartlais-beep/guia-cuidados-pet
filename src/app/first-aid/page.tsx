'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { firstAidGuides } from '@/lib/first-aid-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FirstAidGuide } from '@/lib/types';

export default function FirstAidPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<FirstAidGuide | null>(null);

  const filteredGuides = firstAidGuides.filter(guide =>
    guide.title.toLowerCase().includes(search.toLowerCase()) ||
    guide.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'emergency':
        return 'from-red-500 to-rose-600';
      case 'alert':
        return 'from-orange-500 to-amber-600';
      case 'mild':
        return 'from-blue-500 to-indigo-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'emergency':
        return <AlertTriangle className="w-6 h-6" />;
      case 'alert':
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <Info className="w-6 h-6" />;
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'emergency':
        return 'EMERGÊNCIA';
      case 'alert':
        return 'ATENÇÃO';
      case 'mild':
        return 'LEVE';
      default:
        return 'COMUM';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-4 shadow-lg">
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
            <h1 className="text-xl font-bold">Primeiros Socorros</h1>
            <p className="text-sm text-red-100">Orientações de emergência</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Alert */}
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-900">
              <p className="font-semibold mb-1">⚠️ IMPORTANTE</p>
              <p>
                Estas orientações são para primeiros socorros. Em caso de emergência, 
                procure um veterinário IMEDIATAMENTE. Este aplicativo não substitui 
                atendimento profissional.
              </p>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por sintoma ou situação..."
            className="pl-10"
          />
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGuides.map((guide) => (
            <Card
              key={guide.id}
              className="p-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedGuide(guide)}
            >
              <div className="flex items-start gap-3">
                <div className={`bg-gradient-to-br ${getRiskColor(guide.riskLevel)} p-3 rounded-xl text-white flex-shrink-0`}>
                  {getRiskIcon(guide.riskLevel)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{guide.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      guide.riskLevel === 'emergency' ? 'bg-red-100 text-red-700' :
                      guide.riskLevel === 'alert' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {getRiskLabel(guide.riskLevel)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {guide.symptoms.slice(0, 2).join(', ')}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500">Nenhum resultado encontrado</p>
          </Card>
        )}
      </div>

      {/* Guide Detail Dialog */}
      <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedGuide && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={`bg-gradient-to-br ${getRiskColor(selectedGuide.riskLevel)} p-3 rounded-xl text-white`}>
                    {getRiskIcon(selectedGuide.riskLevel)}
                  </div>
                  <div>
                    <h2 className="text-2xl">{selectedGuide.title}</h2>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedGuide.riskLevel === 'emergency' ? 'bg-red-100 text-red-700' :
                      selectedGuide.riskLevel === 'alert' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {getRiskLabel(selectedGuide.riskLevel)}
                    </span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Symptoms */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">🔍 Sintomas</h3>
                  <ul className="space-y-1">
                    {selectedGuide.symptoms.map((symptom, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to do */}
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h3 className="font-bold text-emerald-900 mb-2">✅ O que fazer</h3>
                  <ol className="space-y-2">
                    {selectedGuide.whatToDo.map((step, i) => (
                      <li key={i} className="text-sm text-emerald-800 flex items-start gap-2">
                        <span className="font-bold">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* What NOT to do */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-bold text-red-900 mb-2">❌ O que NÃO fazer</h3>
                  <ul className="space-y-1">
                    {selectedGuide.whatNotToDo.map((item, i) => (
                      <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When emergency */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-2">🚨 Quando é emergência</h3>
                  <ul className="space-y-1">
                    {selectedGuide.whenEmergency.map((item, i) => (
                      <li key={i} className="text-sm text-orange-800 flex items-start gap-2">
                        <span className="text-orange-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When to seek vet */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2">🏥 Quando procurar veterinário</h3>
                  <ul className="space-y-1">
                    {selectedGuide.whenToSeekVet.map((item, i) => (
                      <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
