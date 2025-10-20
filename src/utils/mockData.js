// Mock data for the Daniel prayer app

export const mockUser = {
  id: 1,
  name: "João",
  email: "joao@example.com",
  consecutiveDays: 7,
  answeredPrayers: 12,
  weeklyPrayerTime: 45, // minutes
  monthlyPrayerTime: 180, // minutes
};

export const mockFriendsPrayers = [
  {
    id: 1,
    friendName: "Maria",
    prayerRequest: "Por sabedoria na escolha de emprego",
    dateCreated: "2025-10-18",
    category: "Trabalho",
  },
  {
    id: 2,
    friendName: "Pedro",
    prayerRequest: "Por cura de uma enfermidade",
    dateCreated: "2025-10-19",
    category: "Saúde",
  },
  {
    id: 3,
    friendName: "Ana",
    prayerRequest: "Por restauração familiar",
    dateCreated: "2025-10-20",
    category: "Família",
  },
];

export const mockMyPrayers = [
  {
    id: 1,
    title: "Por direção profissional",
    description: "Pedindo sabedoria para tomar decisões importantes no trabalho",
    category: "Trabalho",
    dateCreated: "2025-10-15",
    isAnswered: false,
  },
  {
    id: 2,
    title: "Pela saúde da família",
    description: "Orando pela recuperação completa de todos os membros da família",
    category: "Saúde",
    dateCreated: "2025-10-10",
    isAnswered: true,
  },
  {
    id: 3,
    title: "Por paz interior",
    description: "Buscando tranquilidade em meio às dificuldades",
    category: "Pessoal",
    dateCreated: "2025-10-12",
    isAnswered: false,
  },
];

export const mockDevotional = {
  verse: "Orai sem cessar.",
  reference: "1 Tessalonicenses 5:17",
  reflection: "A oração é a comunicação constante com Deus. Não precisa ser formal ou longa, mas sincera e contínua ao longo do dia.",
  date: "2025-10-20",
};
