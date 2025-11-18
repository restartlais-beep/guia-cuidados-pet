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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Calendar, Check, Trash2, Bell } from 'lucide-react';
import { ReminderType } from '@/lib/types';

export default function RemindersPage() {
  const router = useRouter();
  const { currentPet, reminders, addReminder, completeReminder, deleteReminder } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [type, setType] = useState<ReminderType>('vaccine');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!currentPet || !title || !dueDate) return;

    addReminder({
      petId: currentPet.id,
      type,
      title,
      description,
      dueDate: new Date(dueDate),
      completed: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setIsDialogOpen(false);
  };

  const petReminders = reminders.filter(r => r.petId === currentPet?.id);
  const activeReminders = petReminders.filter(r => !r.completed);
  const completedReminders = petReminders.filter(r => r.completed);

  const getReminderIcon = (type: ReminderType) => {
    const icons = {
      vaccine: '💉',
      deworming: '💊',
      bath: '🛁',
      medication: '💊',
      appointment: '🏥',
    };
    return icons[type] || '📌';
  };

  const getReminderColor = (type: ReminderType) => {
    const colors = {
      vaccine: 'from-purple-500 to-pink-600',
      deworming: 'from-blue-500 to-indigo-600',
      bath: 'from-cyan-500 to-teal-600',
      medication: 'from-orange-500 to-red-600',
      appointment: 'from-emerald-500 to-green-600',
    };
    return colors[type] || 'from-gray-500 to-slate-600';
  };

  const isOverdue = (date: Date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Lembretes</h1>
              <p className="text-sm text-purple-100">Organize os cuidados de {currentPet?.name}</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-purple-600 hover:bg-purple-50">
                <Plus className="w-4 h-4 mr-2" />
                Novo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Lembrete</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={type} onValueChange={(v: ReminderType) => setType(v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vaccine">💉 Vacina</SelectItem>
                      <SelectItem value="deworming">💊 Vermífugo</SelectItem>
                      <SelectItem value="bath">🛁 Banho</SelectItem>
                      <SelectItem value="medication">💊 Medicação</SelectItem>
                      <SelectItem value="appointment">🏥 Consulta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Vacina V10"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detalhes adicionais..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate">Data</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!title || !dueDate}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  Criar Lembrete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Active Reminders */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            Ativos ({activeReminders.length})
          </h2>
          {activeReminders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500 mb-4">Nenhum lembrete ativo</p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Lembrete
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeReminders.map((reminder) => (
                <Card
                  key={reminder.id}
                  className={`p-4 ${
                    isOverdue(reminder.dueDate)
                      ? 'bg-red-50 border-red-200'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${getReminderColor(reminder.type)} p-3 rounded-xl text-white text-2xl flex-shrink-0`}>
                      {getReminderIcon(reminder.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900">{reminder.title}</h3>
                      {reminder.description && (
                        <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${
                          isOverdue(reminder.dueDate)
                            ? 'text-red-600 font-semibold'
                            : 'text-gray-600'
                        }`}>
                          {new Date(reminder.dueDate).toLocaleDateString('pt-BR')}
                          {isOverdue(reminder.dueDate) && ' - ATRASADO'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => completeReminder(reminder.id)}
                        className="text-emerald-600 hover:bg-emerald-50"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              Concluídos ({completedReminders.length})
            </h2>
            <div className="space-y-3">
              {completedReminders.map((reminder) => (
                <Card key={reminder.id} className="p-4 bg-gray-50 opacity-60">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-300 p-3 rounded-xl text-white text-2xl flex-shrink-0">
                      {getReminderIcon(reminder.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-700 line-through">{reminder.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {new Date(reminder.dueDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
