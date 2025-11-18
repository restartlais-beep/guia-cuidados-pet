// Dados de primeiros socorros
import { FirstAidGuide } from './types';

export const firstAidGuides: FirstAidGuide[] = [
  {
    id: 'choking',
    title: 'Engasgo',
    symptoms: ['Dificuldade para respirar', 'Tosse intensa', 'Patas na boca', 'Gengivas azuladas'],
    whatToDo: [
      'Mantenha a calma',
      'Abra a boca do pet e verifique se consegue ver o objeto',
      'Se visível, tente remover com cuidado usando os dedos',
      'Para cães: aplique compressões abdominais (manobra de Heimlich adaptada)',
      'Para gatos: segure de cabeça para baixo e dê leves tapinhas nas costas'
    ],
    whatNotToDo: [
      'Não force objetos para dentro',
      'Não dê água ou comida',
      'Não tente remover se não conseguir ver o objeto'
    ],
    whenEmergency: [
      'Gengivas azuladas ou roxas',
      'Pet desmaiou',
      'Não consegue respirar'
    ],
    whenToSeekVet: [
      'Imediatamente após remover o objeto',
      'Se não conseguir remover em 2 minutos',
      'Se houver qualquer dificuldade respiratória'
    ],
    riskLevel: 'emergency'
  },
  {
    id: 'seizure',
    title: 'Convulsão',
    symptoms: ['Tremores descontrolados', 'Perda de consciência', 'Salivação excessiva', 'Movimentos involuntários'],
    whatToDo: [
      'Afaste objetos ao redor para evitar ferimentos',
      'Não toque no pet durante a convulsão',
      'Cronometre a duração da convulsão',
      'Mantenha o ambiente calmo e escuro',
      'Após a convulsão, conforte o pet com voz calma'
    ],
    whatNotToDo: [
      'Não coloque a mão na boca do pet',
      'Não tente segurar ou conter',
      'Não dê água ou comida durante ou logo após',
      'Não faça barulhos altos'
    ],
    whenEmergency: [
      'Convulsão dura mais de 5 minutos',
      'Múltiplas convulsões seguidas',
      'Primeira convulsão do pet'
    ],
    whenToSeekVet: [
      'Imediatamente após a primeira convulsão',
      'Se durar mais de 3 minutos',
      'Se houver mais de uma convulsão em 24h'
    ],
    riskLevel: 'emergency'
  },
  {
    id: 'diarrhea',
    title: 'Diarreia',
    symptoms: ['Fezes líquidas', 'Aumento da frequência', 'Sangue nas fezes', 'Desconforto abdominal'],
    whatToDo: [
      'Ofereça água fresca constantemente',
      'Jejum de 12-24h (apenas para adultos)',
      'Após jejum, ofereça dieta leve (arroz cozido + frango)',
      'Monitore a frequência e aparência das fezes',
      'Mantenha o pet hidratado'
    ],
    whatNotToDo: [
      'Não dê medicamentos humanos sem orientação',
      'Não ofereça leite ou laticínios',
      'Não ignore se persistir por mais de 24h'
    ],
    whenEmergency: [
      'Sangue vermelho vivo nas fezes',
      'Fezes pretas (sangue digerido)',
      'Sinais de desidratação severa',
      'Letargia extrema'
    ],
    whenToSeekVet: [
      'Se persistir por mais de 24h',
      'Se houver sangue',
      'Se o pet for filhote ou idoso',
      'Se houver vômito junto'
    ],
    riskLevel: 'alert'
  },
  {
    id: 'vomiting',
    title: 'Vômito Persistente',
    symptoms: ['Vômitos frequentes', 'Náusea', 'Salivação excessiva', 'Desconforto abdominal'],
    whatToDo: [
      'Retire comida e água por 2-4 horas',
      'Após esse período, ofereça pequenas quantidades de água',
      'Se tolerar água, ofereça dieta leve em pequenas porções',
      'Monitore a frequência dos vômitos',
      'Observe a cor e conteúdo do vômito'
    ],
    whatNotToDo: [
      'Não force alimentação',
      'Não dê medicamentos sem orientação veterinária',
      'Não ignore vômitos com sangue'
    ],
    whenEmergency: [
      'Vômito com sangue',
      'Vômito preto',
      'Mais de 3 episódios em poucas horas',
      'Abdômen distendido e rígido'
    ],
    whenToSeekVet: [
      'Se persistir por mais de 12h',
      'Se houver sangue',
      'Se o pet estiver apático',
      'Se for filhote ou idoso'
    ],
    riskLevel: 'alert'
  },
  {
    id: 'bleeding',
    title: 'Sangramento',
    symptoms: ['Sangramento ativo', 'Ferimento visível', 'Sangue em superfícies'],
    whatToDo: [
      'Mantenha a calma',
      'Use gaze ou pano limpo para pressionar o ferimento',
      'Mantenha pressão constante por 5-10 minutos',
      'Se possível, eleve a área ferida',
      'Após parar o sangramento, limpe com água limpa'
    ],
    whatNotToDo: [
      'Não remova a gaze se ela grudar no ferimento',
      'Não use algodão diretamente no ferimento',
      'Não aplique substâncias caseiras'
    ],
    whenEmergency: [
      'Sangramento intenso que não para',
      'Sangramento de orifícios (nariz, ouvido, boca)',
      'Pet em choque (gengivas pálidas, fraqueza)'
    ],
    whenToSeekVet: [
      'Imediatamente se for sangramento intenso',
      'Se o ferimento for profundo',
      'Se houver suspeita de hemorragia interna'
    ],
    riskLevel: 'emergency'
  },
  {
    id: 'poisoning',
    title: 'Intoxicação',
    symptoms: ['Vômito súbito', 'Salivação excessiva', 'Tremores', 'Convulsões', 'Dificuldade para respirar'],
    whatToDo: [
      'Identifique a substância ingerida',
      'Ligue imediatamente para o veterinário',
      'Se possível, leve a embalagem do produto',
      'Não induza vômito sem orientação',
      'Mantenha o pet calmo e aquecido'
    ],
    whatNotToDo: [
      'Não induza vômito sem orientação veterinária',
      'Não dê leite (não neutraliza venenos)',
      'Não espere sintomas aparecerem'
    ],
    whenEmergency: [
      'Qualquer suspeita de intoxicação é emergência',
      'Convulsões',
      'Dificuldade respiratória',
      'Perda de consciência'
    ],
    whenToSeekVet: [
      'IMEDIATAMENTE',
      'Não espere sintomas',
      'Leve a embalagem do produto'
    ],
    riskLevel: 'emergency'
  },
  {
    id: 'fever',
    title: 'Febre',
    symptoms: ['Nariz quente e seco', 'Letargia', 'Perda de apetite', 'Tremores'],
    whatToDo: [
      'Meça a temperatura retal (normal: 38-39°C)',
      'Ofereça água fresca',
      'Mantenha o pet em ambiente fresco',
      'Use compressas frias nas patas e orelhas',
      'Monitore a temperatura a cada 2 horas'
    ],
    whatNotToDo: [
      'Não dê medicamentos humanos (paracetamol é tóxico)',
      'Não use álcool para baixar a febre',
      'Não force banhos gelados'
    ],
    whenEmergency: [
      'Temperatura acima de 40°C',
      'Convulsões',
      'Dificuldade para respirar'
    ],
    whenToSeekVet: [
      'Se a temperatura estiver acima de 39.5°C',
      'Se persistir por mais de 24h',
      'Se houver outros sintomas graves'
    ],
    riskLevel: 'alert'
  },
  {
    id: 'parasites',
    title: 'Pulgas e Carrapatos',
    symptoms: ['Coceira intensa', 'Vermelhidão na pele', 'Presença visível de parasitas', 'Perda de pelo'],
    whatToDo: [
      'Remova carrapatos com pinça adequada',
      'Use produtos antipulgas recomendados pelo veterinário',
      'Lave camas e cobertores em água quente',
      'Aspire toda a casa',
      'Trate todos os pets da casa simultaneamente'
    ],
    whatNotToDo: [
      'Não use produtos humanos',
      'Não queime carrapatos',
      'Não deixe a cabeça do carrapato na pele'
    ],
    whenEmergency: [
      'Anemia severa (gengivas muito pálidas)',
      'Fraqueza extrema',
      'Infestação massiva'
    ],
    whenToSeekVet: [
      'Se houver sinais de anemia',
      'Se a infestação for severa',
      'Para prescrição de tratamento adequado'
    ],
    riskLevel: 'mild'
  },
  {
    id: 'wounds',
    title: 'Ferimentos',
    symptoms: ['Cortes', 'Arranhões', 'Mordidas', 'Pele rompida'],
    whatToDo: [
      'Limpe o ferimento com água limpa ou soro fisiológico',
      'Seque delicadamente com gaze',
      'Aplique antisséptico veterinário se disponível',
      'Cubra com gaze limpa se necessário',
      'Evite que o pet lamba o ferimento'
    ],
    whatNotToDo: [
      'Não use álcool ou água oxigenada diretamente',
      'Não aplique pomadas humanas',
      'Não deixe o ferimento descoberto se o pet lamber'
    ],
    whenEmergency: [
      'Ferimento profundo',
      'Sangramento intenso',
      'Ferimento por mordida de outro animal',
      'Sinais de infecção (pus, inchaço, calor)'
    ],
    whenToSeekVet: [
      'Ferimentos profundos',
      'Mordidas de outros animais',
      'Se não cicatrizar em 3-5 dias',
      'Sinais de infecção'
    ],
    riskLevel: 'alert'
  },
  {
    id: 'breathing',
    title: 'Dificuldade para Respirar',
    symptoms: ['Respiração rápida', 'Respiração ofegante', 'Gengivas azuladas', 'Tosse'],
    whatToDo: [
      'Mantenha o pet calmo',
      'Leve para ambiente ventilado',
      'Afrouxe coleira se estiver usando',
      'Monitore a cor das gengivas',
      'Prepare-se para ir ao veterinário imediatamente'
    ],
    whatNotToDo: [
      'Não force o pet a deitar',
      'Não dê água se estiver com muita dificuldade',
      'Não espere melhorar sozinho'
    ],
    whenEmergency: [
      'SEMPRE é emergência',
      'Gengivas azuladas ou roxas',
      'Respiração muito rápida ou muito lenta',
      'Desmaio'
    ],
    whenToSeekVet: [
      'IMEDIATAMENTE',
      'Não espere',
      'É uma emergência veterinária'
    ],
    riskLevel: 'emergency'
  }
];
