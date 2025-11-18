'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { dailyCareGuides, vaccinationSchedule } from '@/lib/daily-care-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DailyCarePage() {
  const router = useRouter();
  const { currentPet } = useApp();
  const [activeTab, setActiveTab] = useState('daily');

  if (!currentPet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Nenhum pet cadastrado</p>
          <Button onClick={() => router.push('/profile')} className="mt-4">
            Cadastrar Pet
          </Button>
        </Card>
      </div>
    );
  }

  const filteredCares = dailyCareGuides.filter(
    care =>
      care.species.includes(currentPet.species) &&
      care.ageGroup.includes(currentPet.ageGroup)
  );

  const groupedCares = filteredCares.reduce((acc, care) => {
    if (!acc[care.category]) {
      acc[care.category] = [];
    }
    acc[care.category].push(care);
    return acc;
  }, {} as Record<string, typeof dailyCareGuides>);

  const vaccineSchedule = vaccinationSchedule[currentPet.species];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
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
            <h1 className="text-xl font-bold">Cuidados Diários</h1>
            <p className="text-sm text-blue-100">Rotinas para {currentPet.name}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="daily">Cuidados Diários</TabsTrigger>
            <TabsTrigger value="vaccines">Vacinação</TabsTrigger>
          </TabsList>

          {/* Daily Care Tab */}
          <TabsContent value="daily" className="space-y-6">
            {/* Pet Info */}
            <Card className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">
                📋 Rotina personalizada para {currentPet.name}
              </h3>
              <p className="text-sm text-blue-800">
                {currentPet.species === 'dog' ? 'Cão' : 'Gato'} • {currentPet.breed} • 
                {currentPet.ageGroup === 'puppy' ? ' Filhote' : currentPet.ageGroup === 'adult' ? ' Adulto' : ' Idoso'} • 
                {currentPet.weight}kg
              </p>
            </Card>

            {/* Grouped Care Cards */}
            {Object.entries(groupedCares).map(([category, cares]) => (
              <div key={category}>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{category}</h2>
                <div className="space-y-3">
                  {cares.map((care) => (
                    <Card key={care.id} className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{care.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{care.description}</p>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-blue-500" />
                            <span className="text-xs text-blue-600 font-medium">
                              {care.frequency}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Vaccination Tab */}
          <TabsContent value="vaccines" className="space-y-6">
            {/* Puppy Schedule */}
            {currentPet.ageGroup === 'puppy' && vaccineSchedule.puppy && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  💉 Calendário de Vacinação - Filhote
                </h2>
                <div className="space-y-3">
                  {vaccineSchedule.puppy.map((schedule, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{schedule.age}</h3>
                          <ul className="space-y-1">
                            {schedule.vaccines.map((vaccine, i) => (
                              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-purple-500">•</span>
                                <span>{vaccine}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Adult Schedule */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                💉 Vacinação - {currentPet.ageGroup === 'puppy' ? 'Após completar o esquema inicial' : 'Reforços'}
              </h2>
              <div className="space-y-3">
                {vaccineSchedule.adult.map((schedule, index) => (
                  <Card key={index} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        ✓
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{schedule.age}</h3>
                        <ul className="space-y-1">
                          {schedule.vaccines.map((vaccine, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-emerald-500">•</span>
                              <span>{vaccine}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Current Vaccines */}
            {currentPet.currentVaccines.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  ✅ Vacinas Atuais de {currentPet.name}
                </h2>
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <ul className="space-y-2">
                    {currentPet.currentVaccines.map((vaccine, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="text-blue-500">✓</span>
                        <span>{vaccine}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {/* Important Note */}
            <Card className="p-4 bg-amber-50 border-amber-200">
              <p className="text-sm text-amber-900">
                <span className="font-bold">⚠️ Importante:</span> Sempre consulte seu veterinário 
                para confirmar o calendário de vacinação adequado para {currentPet.name}. 
                As datas podem variar conforme histórico e condições de saúde.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
