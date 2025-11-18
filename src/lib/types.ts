// Tipos do aplicativo Cuidados Pet

export type Species = 'dog' | 'cat';
export type AgeGroup = 'puppy' | 'adult' | 'senior';
export type RiskLevel = 'common' | 'mild' | 'alert' | 'emergency';
export type ReminderType = 'vaccine' | 'deworming' | 'bath' | 'medication' | 'appointment';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  ageGroup: AgeGroup;
  weight: number;
  allergies: string[];
  medicalConditions: string[];
  currentVaccines: string[];
  birthDate?: string;
}

export interface Tutor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface UserProfile {
  tutor: Tutor;
  pets: Pet[];
  currentPetId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  riskLevel?: RiskLevel;
  attachments?: {
    type: 'image' | 'audio';
    url: string;
  }[];
}

export interface Reminder {
  id: string;
  petId: string;
  type: ReminderType;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
  };
}

export interface DailyCare {
  id: string;
  category: string;
  title: string;
  description: string;
  frequency: string;
  ageGroup: AgeGroup[];
  species: Species[];
}

export interface FirstAidGuide {
  id: string;
  title: string;
  symptoms: string[];
  whatToDo: string[];
  whatNotToDo: string[];
  whenEmergency: string[];
  whenToSeekVet: string[];
  riskLevel: RiskLevel;
}
