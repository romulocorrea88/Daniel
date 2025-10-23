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

// Daily devotionals - rotates based on day of year
export const dailyDevotionals = [
  {
    verse: "Orai sem cessar.",
    reference: "1 Tessalonicenses 5:17",
    reflection: "A oração é a comunicação constante com Deus. Não precisa ser formal ou longa, mas sincera e contínua ao longo do dia.",
  },
  {
    verse: "E tudo o que pedirdes na oração, crendo, o recebereis.",
    reference: "Mateus 21:22",
    reflection: "A fé é essencial na oração. Quando oramos com fé genuína, confiando no poder de Deus, Ele ouve e responde de acordo com Sua vontade.",
  },
  {
    verse: "Invoca-me no dia da angústia; eu te livrarei, e tu me glorificarás.",
    reference: "Salmos 50:15",
    reflection: "Deus nos convida a clamar a Ele em momentos de dificuldade. Ele promete nos libertar e, através disso, seremos testemunhas de Sua bondade.",
  },
  {
    verse: "Não andeis ansiosos por coisa alguma; antes em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ações de graças.",
    reference: "Filipenses 4:6",
    reflection: "A oração é o antídoto contra a ansiedade. Quando levamos nossas preocupações a Deus com gratidão, encontramos paz que excede todo entendimento.",
  },
  {
    verse: "Confessa os teus pecados uns aos outros, e orai uns pelos outros, para serdes curados.",
    reference: "Tiago 5:16",
    reflection: "A oração comunitária e a transparência espiritual trazem cura e restauração. Não fomos criados para viver a fé sozinhos.",
  },
  {
    verse: "Buscai ao Senhor enquanto se pode achar, invocai-o enquanto está perto.",
    reference: "Isaías 55:6",
    reflection: "O momento de buscar a Deus é agora. Ele está próximo e disponível para quem O procura com sinceridade de coração.",
  },
  {
    verse: "O Senhor está perto de todos os que o invocam, de todos os que o invocam em verdade.",
    reference: "Salmos 145:18",
    reflection: "Deus não está distante. Quando O buscamos com sinceridade e verdade, Ele se aproxima e nos ouve.",
  },
];

// Function to get devotional based on current day
export const getDailyDevotional = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % dailyDevotionals.length;
  return dailyDevotionals[index];
};

// Legacy export for backward compatibility
export const mockDevotional = getDailyDevotional();
