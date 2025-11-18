'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Pet, Reminder } from '@/lib/types';

interface AppContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  currentPet: Pet | null;
  setCurrentPet: (petId: string) => void;
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  completeReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('petcare-profile');
    const savedReminders = localStorage.getItem('petcare-reminders');
    const savedOnboarding = localStorage.getItem('petcare-onboarded');

    if (savedProfile) {
      setProfileState(JSON.parse(savedProfile));
    }
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
    if (savedOnboarding) {
      setIsOnboarded(true);
    }
  }, []);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    localStorage.setItem('petcare-profile', JSON.stringify(newProfile));
  };

  const currentPet = profile?.pets.find(p => p.id === profile.currentPetId) || profile?.pets[0] || null;

  const setCurrentPet = (petId: string) => {
    if (profile) {
      const updated = { ...profile, currentPetId: petId };
      setProfile(updated);
    }
  };

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: Date.now().toString(),
    };
    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem('petcare-reminders', JSON.stringify(updated));
  };

  const completeReminder = (id: string) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, completed: true } : r
    );
    setReminders(updated);
    localStorage.setItem('petcare-reminders', JSON.stringify(updated));
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('petcare-reminders', JSON.stringify(updated));
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('petcare-onboarded', 'true');
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        currentPet,
        setCurrentPet,
        reminders,
        addReminder,
        completeReminder,
        deleteReminder,
        isOnboarded,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
