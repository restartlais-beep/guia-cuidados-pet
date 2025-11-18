// Dados de cuidados diários personalizados
import { DailyCare } from './types';

export const dailyCareGuides: DailyCare[] = [
  // Cuidados para Filhotes
  {
    id: 'puppy-feeding',
    category: 'Alimentação',
    title: 'Alimentação de Filhotes',
    description: 'Filhotes precisam de 3-4 refeições por dia com ração específica para filhotes. A quantidade varia conforme o peso e raça.',
    frequency: '3-4x ao dia',
    ageGroup: ['puppy'],
    species: ['dog', 'cat']
  },
  {
    id: 'puppy-socialization',
    category: 'Socialização',
    title: 'Socialização Precoce',
    description: 'Exponha o filhote a diferentes pessoas, animais, sons e ambientes de forma gradual e positiva. Essencial entre 3-14 semanas.',
    frequency: 'Diariamente',
    ageGroup: ['puppy'],
    species: ['dog', 'cat']
  },
  {
    id: 'puppy-training',
    category: 'Treinamento',
    title: 'Treinamento Básico',
    description: 'Ensine comandos básicos como sentar, ficar e vir. Use reforço positivo com petiscos e elogios. Sessões curtas de 5-10 minutos.',
    frequency: '2-3x ao dia',
    ageGroup: ['puppy'],
    species: ['dog']
  },
  {
    id: 'puppy-potty',
    category: 'Higiene',
    title: 'Treinamento de Higiene',
    description: 'Leve o filhote ao local adequado após acordar, comer e brincar. Recompense quando fizer no lugar certo.',
    frequency: 'A cada 2-3 horas',
    ageGroup: ['puppy'],
    species: ['dog', 'cat']
  },
  {
    id: 'puppy-play',
    category: 'Atividades',
    title: 'Brincadeiras e Exercícios',
    description: 'Filhotes precisam de brincadeiras curtas e frequentes. Evite exercícios intensos que possam prejudicar articulações em desenvolvimento.',
    frequency: '4-6x ao dia (15-20 min)',
    ageGroup: ['puppy'],
    species: ['dog', 'cat']
  },

  // Cuidados para Adultos
  {
    id: 'adult-feeding',
    category: 'Alimentação',
    title: 'Alimentação de Adultos',
    description: 'Adultos precisam de 2 refeições por dia. Mantenha horários regulares e quantidade adequada ao peso e nível de atividade.',
    frequency: '2x ao dia',
    ageGroup: ['adult'],
    species: ['dog', 'cat']
  },
  {
    id: 'adult-exercise-dog',
    category: 'Atividades',
    title: 'Exercícios Diários',
    description: 'Cães adultos precisam de 30-60 minutos de exercício por dia. Passeios, corridas e brincadeiras mantêm a saúde física e mental.',
    frequency: '1-2x ao dia (30-60 min)',
    ageGroup: ['adult'],
    species: ['dog']
  },
  {
    id: 'adult-play-cat',
    category: 'Atividades',
    title: 'Brincadeiras Interativas',
    description: 'Gatos adultos precisam de estímulo mental e físico. Use brinquedos interativos, varinhas e arranhadores.',
    frequency: '2-3x ao dia (15-20 min)',
    ageGroup: ['adult'],
    species: ['cat']
  },
  {
    id: 'adult-dental',
    category: 'Higiene',
    title: 'Higiene Dental',
    description: 'Escove os dentes do pet 3-4x por semana com produtos específicos. Previne tártaro e doenças periodontais.',
    frequency: '3-4x por semana',
    ageGroup: ['adult', 'senior'],
    species: ['dog', 'cat']
  },
  {
    id: 'adult-grooming',
    category: 'Higiene',
    title: 'Escovação e Pelagem',
    description: 'Escove o pelo regularmente para remover pelos mortos e prevenir nós. Frequência varia conforme o tipo de pelo.',
    frequency: 'Diariamente ou 3x/semana',
    ageGroup: ['adult', 'senior'],
    species: ['dog', 'cat']
  },

  // Cuidados para Idosos
  {
    id: 'senior-feeding',
    category: 'Alimentação',
    title: 'Alimentação de Idosos',
    description: 'Idosos podem precisar de ração específica para a idade, com menos calorias e nutrientes adaptados. Consulte o veterinário.',
    frequency: '2-3x ao dia (porções menores)',
    ageGroup: ['senior'],
    species: ['dog', 'cat']
  },
  {
    id: 'senior-exercise',
    category: 'Atividades',
    title: 'Exercícios Moderados',
    description: 'Mantenha atividade física, mas com intensidade reduzida. Passeios curtos e frequentes são melhores que longos.',
    frequency: '2-3x ao dia (15-20 min)',
    ageGroup: ['senior'],
    species: ['dog', 'cat']
  },
  {
    id: 'senior-comfort',
    category: 'Conforto',
    title: 'Conforto e Mobilidade',
    description: 'Forneça cama ortopédica, facilite acesso a água e comida. Considere rampas se houver dificuldade para subir.',
    frequency: 'Sempre disponível',
    ageGroup: ['senior'],
    species: ['dog', 'cat']
  },
  {
    id: 'senior-checkup',
    category: 'Saúde',
    title: 'Check-ups Regulares',
    description: 'Idosos precisam de consultas veterinárias mais frequentes para monitorar saúde e detectar problemas precocemente.',
    frequency: 'A cada 6 meses',
    ageGroup: ['senior'],
    species: ['dog', 'cat']
  },

  // Cuidados Gerais
  {
    id: 'bath-dog',
    category: 'Higiene',
    title: 'Banho',
    description: 'Banhos regulares mantêm a pele e pelo saudáveis. Use produtos específicos para pets. Frequência varia conforme raça e estilo de vida.',
    frequency: 'A cada 15-30 dias',
    ageGroup: ['puppy', 'adult', 'senior'],
    species: ['dog']
  },
  {
    id: 'bath-cat',
    category: 'Higiene',
    title: 'Banho (quando necessário)',
    description: 'Gatos geralmente se limpam sozinhos. Banhos são necessários apenas em casos específicos ou raças de pelo longo.',
    frequency: 'Raramente ou conforme necessário',
    ageGroup: ['puppy', 'adult', 'senior'],
    species: ['cat']
  },
  {
    id: 'ear-cleaning',
    category: 'Higiene',
    title: 'Limpeza de Ouvidos',
    description: 'Limpe as orelhas semanalmente com produtos específicos. Observe sinais de infecção como mau cheiro ou vermelhidão.',
    frequency: 'Semanalmente',
    ageGroup: ['puppy', 'adult', 'senior'],
    species: ['dog', 'cat']
  },
  {
    id: 'nail-trimming',
    category: 'Higiene',
    title: 'Corte de Unhas',
    description: 'Mantenha as unhas aparadas para evitar desconforto e problemas de postura. Use cortador específico para pets.',
    frequency: 'A cada 2-4 semanas',
    ageGroup: ['puppy', 'adult', 'senior'],
    species: ['dog', 'cat']
  },
  {
    id: 'water',
    category: 'Alimentação',
    title: 'Água Fresca',
    description: 'Mantenha sempre água limpa e fresca disponível. Troque pelo menos 2x ao dia. Hidratação é essencial para a saúde.',
    frequency: 'Sempre disponível',
    ageGroup: ['puppy', 'adult', 'senior'],
    species: ['dog', 'cat']
  },
  {
    id: 'enrichment',
    category: 'Enriquecimento',
    title: 'Enriquecimento Ambiental',
    description: 'Ofereça brinquedos variados, esconderijos, arranhadores (gatos) e desafios mentais. Previne tédio e comportamentos destrutivos.',
    frequency: 'Diariamente',
    ageGroup: ['puppy', 'adult', 'senior'],
    species: ['dog', 'cat']
  }
];

// Calendário de vacinação
export const vaccinationSchedule = {
  dog: {
    puppy: [
      { age: '6-8 semanas', vaccines: ['V8 ou V10 (1ª dose)', 'Gripe Canina (opcional)'] },
      { age: '12 semanas', vaccines: ['V8 ou V10 (2ª dose)', 'Gripe Canina (2ª dose)'] },
      { age: '16 semanas', vaccines: ['V8 ou V10 (3ª dose)', 'Antirrábica'] },
    ],
    adult: [
      { age: 'Anual', vaccines: ['V8 ou V10 (reforço)', 'Antirrábica (reforço)', 'Gripe Canina (reforço)'] },
    ]
  },
  cat: {
    puppy: [
      { age: '6-8 semanas', vaccines: ['V3 ou V4 (1ª dose)'] },
      { age: '12 semanas', vaccines: ['V3 ou V4 (2ª dose)', 'Leucemia Felina (1ª dose)'] },
      { age: '16 semanas', vaccines: ['V3 ou V4 (3ª dose)', 'Leucemia Felina (2ª dose)', 'Antirrábica'] },
    ],
    adult: [
      { age: 'Anual', vaccines: ['V3 ou V4 (reforço)', 'Antirrábica (reforço)', 'Leucemia Felina (reforço)'] },
    ]
  }
};
