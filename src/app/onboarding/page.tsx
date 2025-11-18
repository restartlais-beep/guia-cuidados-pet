'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, PawPrint, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const router = useRouter();
  const { setProfile, completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dados do tutor
  const [tutorName, setTutorName] = useState('');
  const [tutorEmail, setTutorEmail] = useState('');
  const [tutorPhone, setTutorPhone] = useState('');

  // Dados do pet
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [breed, setBreed] = useState('');
  const [ageGroup, setAgeGroup] = useState<'puppy' | 'adult' | 'senior'>('adult');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [vaccines, setVaccines] = useState('');

  const validateStep1 = () => {
    if (!tutorName.trim()) {
      toast.error('Por favor, preencha seu nome');
      return false;
    }
    if (tutorEmail && !tutorEmail.includes('@')) {
      toast.error('E-mail inválido');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!petName.trim()) {
      toast.error('Por favor, preencha o nome do pet');
      return false;
    }
    if (!breed.trim()) {
      toast.error('Por favor, preencha a raça do pet');
      return false;
    }
    if (!weight || parseFloat(weight) <= 0) {
      toast.error('Por favor, preencha um peso válido');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      toast.success('Ótimo! Agora vamos cadastrar seu pet', {
        icon: <PawPrint className="w-4 h-4" />,
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Simula processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const profile = {
        tutor: {
          id: Date.now().toString(),
          name: tutorName,
          email: tutorEmail || undefined,
          phone: tutorPhone || undefined,
        },
        pets: [
          {
            id: Date.now().toString(),
            name: petName,
            species,
            breed,
            ageGroup,
            weight: parseFloat(weight) || 0,
            allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
            medicalConditions: medicalConditions.split(',').map(m => m.trim()).filter(Boolean),
            currentVaccines: vaccines.split(',').map(v => v.trim()).filter(Boolean),
          },
        ],
      };

      setProfile(profile);
      completeOnboarding();
      
      toast.success(`Bem-vindo(a), ${tutorName}! Perfil de ${petName} criado com sucesso! 🎉`, {
        duration: 3000,
      });

      setTimeout(() => {
        router.push('/home');
      }, 500);
    } catch (error) {
      toast.error('Erro ao salvar perfil. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 flex items-center justify-center">
      <Card className="max-w-2xl w-full p-6 md:p-8 shadow-2xl bg-white/80 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-full shadow-lg">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cadastro</h1>
            <p className="text-sm text-gray-600">Passo {step} de 2</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500 ease-out"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Tutor */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Seus Dados</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tutorName" className="text-gray-700">
                    Seu Nome <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="tutorName"
                    value={tutorName}
                    onChange={(e) => setTutorName(e.target.value)}
                    placeholder="Como você se chama?"
                    className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <Label htmlFor="tutorEmail" className="text-gray-700">E-mail (opcional)</Label>
                  <Input
                    id="tutorEmail"
                    type="email"
                    value={tutorEmail}
                    onChange={(e) => setTutorEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <Label htmlFor="tutorPhone" className="text-gray-700">Telefone (opcional)</Label>
                  <Input
                    id="tutorPhone"
                    value={tutorPhone}
                    onChange={(e) => setTutorPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNextStep}
                disabled={!tutorName}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Pet */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dados do Pet</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="petName" className="text-gray-700">
                    Nome do Pet <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="petName"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Como se chama seu amigo?"
                    className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="species" className="text-gray-700">
                      Espécie <span className="text-red-500">*</span>
                    </Label>
                    <Select value={species} onValueChange={(v: 'dog' | 'cat') => setSpecies(v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">🐕 Cão</SelectItem>
                        <SelectItem value="cat">🐱 Gato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="ageGroup" className="text-gray-700">
                      Idade <span className="text-red-500">*</span>
                    </Label>
                    <Select value={ageGroup} onValueChange={(v: 'puppy' | 'adult' | 'senior') => setAgeGroup(v)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="puppy">🐾 Filhote (0-1 ano)</SelectItem>
                        <SelectItem value="adult">🦴 Adulto (1-7 anos)</SelectItem>
                        <SelectItem value="senior">🎖️ Idoso (7+ anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="breed" className="text-gray-700">
                      Raça <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="breed"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      placeholder="Ex: Labrador, SRD, Persa..."
                      className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight" className="text-gray-700">
                      Peso (kg) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Ex: 15"
                      className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="allergies" className="text-gray-700">Alergias (separadas por vírgula)</Label>
                  <Input
                    id="allergies"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Ex: frango, poeira"
                    className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalConditions" className="text-gray-700">Condições Médicas (separadas por vírgula)</Label>
                  <Textarea
                    id="medicalConditions"
                    value={medicalConditions}
                    onChange={(e) => setMedicalConditions(e.target.value)}
                    placeholder="Ex: diabetes, artrite"
                    className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="vaccines" className="text-gray-700">Vacinas Atuais (separadas por vírgula)</Label>
                  <Textarea
                    id="vaccines"
                    value={vaccines}
                    onChange={(e) => setVaccines(e.target.value)}
                    placeholder="Ex: V10, antirrábica"
                    className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                disabled={isSubmitting}
                className="transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!petName || !breed || !weight || isSubmitting}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Finalizar
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
