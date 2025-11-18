'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, PawPrint, Edit, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pet, AgeGroup, Species } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const { profile, setProfile, currentPet, setCurrentPet } = useApp();
  const [isEditingTutor, setIsEditingTutor] = useState(false);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);

  // Tutor form
  const [tutorName, setTutorName] = useState(profile?.tutor.name || '');
  const [tutorEmail, setTutorEmail] = useState(profile?.tutor.email || '');
  const [tutorPhone, setTutorPhone] = useState(profile?.tutor.phone || '');

  // Pet form
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<Species>('dog');
  const [breed, setBreed] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [vaccines, setVaccines] = useState('');

  const handleUpdateTutor = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      tutor: {
        ...profile.tutor,
        name: tutorName,
        email: tutorEmail || undefined,
        phone: tutorPhone || undefined,
      },
    });
    setIsEditingTutor(false);
  };

  const handleAddPet = () => {
    if (!profile || !petName || !breed || !weight) return;

    const newPet: Pet = {
      id: Date.now().toString(),
      name: petName,
      species,
      breed,
      ageGroup,
      weight: parseFloat(weight),
      allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
      medicalConditions: medicalConditions.split(',').map(m => m.trim()).filter(Boolean),
      currentVaccines: vaccines.split(',').map(v => v.trim()).filter(Boolean),
    };

    setProfile({
      ...profile,
      pets: [...profile.pets, newPet],
    });

    // Reset form
    setPetName('');
    setBreed('');
    setWeight('');
    setAllergies('');
    setMedicalConditions('');
    setVaccines('');
    setIsAddingPet(false);
  };

  const handleEditPet = (pet: Pet) => {
    setPetName(pet.name);
    setSpecies(pet.species);
    setBreed(pet.breed);
    setAgeGroup(pet.ageGroup);
    setWeight(pet.weight.toString());
    setAllergies(pet.allergies.join(', '));
    setMedicalConditions(pet.medicalConditions.join(', '));
    setVaccines(pet.currentVaccines.join(', '));
    setEditingPetId(pet.id);
  };

  const handleUpdatePet = () => {
    if (!profile || !editingPetId || !petName || !breed || !weight) return;

    const updatedPets = profile.pets.map(pet =>
      pet.id === editingPetId
        ? {
            ...pet,
            name: petName,
            species,
            breed,
            ageGroup,
            weight: parseFloat(weight),
            allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
            medicalConditions: medicalConditions.split(',').map(m => m.trim()).filter(Boolean),
            currentVaccines: vaccines.split(',').map(v => v.trim()).filter(Boolean),
          }
        : pet
    );

    setProfile({
      ...profile,
      pets: updatedPets,
    });

    // Reset form
    setPetName('');
    setBreed('');
    setWeight('');
    setAllergies('');
    setMedicalConditions('');
    setVaccines('');
    setEditingPetId(null);
  };

  const handleDeletePet = (petId: string) => {
    if (!profile) return;
    if (profile.pets.length === 1) {
      alert('Você precisa ter pelo menos um pet cadastrado');
      return;
    }

    const updatedPets = profile.pets.filter(p => p.id !== petId);
    setProfile({
      ...profile,
      pets: updatedPets,
      currentPetId: updatedPets[0].id,
    });
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Nenhum perfil encontrado</p>
          <Button onClick={() => router.push('/onboarding')} className="mt-4">
            Criar Perfil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 shadow-lg">
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
            <h1 className="text-xl font-bold">Perfil</h1>
            <p className="text-sm text-emerald-100">Gerencie seus dados</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Tutor Info */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Seus Dados</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingTutor(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Nome:</span> {profile.tutor.name}
            </p>
            {profile.tutor.email && (
              <p className="text-gray-700">
                <span className="font-semibold">E-mail:</span> {profile.tutor.email}
              </p>
            )}
            {profile.tutor.phone && (
              <p className="text-gray-700">
                <span className="font-semibold">Telefone:</span> {profile.tutor.phone}
              </p>
            )}
          </div>
        </Card>

        {/* Pets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Meus Pets</h2>
            <Button
              onClick={() => setIsAddingPet(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Pet
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.pets.map((pet) => (
              <Card
                key={pet.id}
                className={`p-4 cursor-pointer transition-all ${
                  currentPet?.id === pet.id
                    ? 'ring-2 ring-emerald-500 bg-emerald-50'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setCurrentPet(pet.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-full text-white">
                    <PawPrint className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{pet.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                        {pet.species === 'dog' ? 'Cão' : 'Gato'}
                      </span>
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs">
                        {pet.breed}
                      </span>
                      <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-xs">
                        {pet.ageGroup === 'puppy' ? 'Filhote' : pet.ageGroup === 'adult' ? 'Adulto' : 'Idoso'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPet(pet);
                        }}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Deseja realmente excluir ${pet.name}?`)) {
                            handleDeletePet(pet.id);
                          }
                        }}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Tutor Dialog */}
      <Dialog open={isEditingTutor} onOpenChange={setIsEditingTutor}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Seus Dados</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tutorName">Nome</Label>
              <Input
                id="tutorName"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tutorEmail">E-mail</Label>
              <Input
                id="tutorEmail"
                type="email"
                value={tutorEmail}
                onChange={(e) => setTutorEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tutorPhone">Telefone</Label>
              <Input
                id="tutorPhone"
                value={tutorPhone}
                onChange={(e) => setTutorPhone(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button
              onClick={handleUpdateTutor}
              disabled={!tutorName}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Pet Dialog */}
      <Dialog open={isAddingPet || !!editingPetId} onOpenChange={(open) => {
        if (!open) {
          setIsAddingPet(false);
          setEditingPetId(null);
          setPetName('');
          setBreed('');
          setWeight('');
          setAllergies('');
          setMedicalConditions('');
          setVaccines('');
        }
      }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPetId ? 'Editar Pet' : 'Adicionar Pet'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="petName">Nome do Pet</Label>
              <Input
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="species">Espécie</Label>
                <Select value={species} onValueChange={(v: Species) => setSpecies(v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Cão</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ageGroup">Idade</Label>
                <Select value={ageGroup} onValueChange={(v: AgeGroup) => setAgeGroup(v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="puppy">Filhote</SelectItem>
                    <SelectItem value="adult">Adulto</SelectItem>
                    <SelectItem value="senior">Idoso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="breed">Raça</Label>
                <Input
                  id="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="allergies">Alergias (separadas por vírgula)</Label>
              <Input
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="medicalConditions">Condições Médicas</Label>
              <Textarea
                id="medicalConditions"
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="vaccines">Vacinas Atuais</Label>
              <Textarea
                id="vaccines"
                value={vaccines}
                onChange={(e) => setVaccines(e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>

            <Button
              onClick={editingPetId ? handleUpdatePet : handleAddPet}
              disabled={!petName || !breed || !weight}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {editingPetId ? 'Salvar Alterações' : 'Adicionar Pet'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
