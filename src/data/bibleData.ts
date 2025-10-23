// Estrutura da Bíblia - Livros e número de capítulos
export const BIBLE_BOOKS = [
  // Antigo Testamento
  { id: "genesis", name: "Gênesis", testament: "old", chapters: 50, abbr: "Gn" },
  { id: "exodus", name: "Êxodo", testament: "old", chapters: 40, abbr: "Êx" },
  { id: "leviticus", name: "Levítico", testament: "old", chapters: 27, abbr: "Lv" },
  { id: "numbers", name: "Números", testament: "old", chapters: 36, abbr: "Nm" },
  { id: "deuteronomy", name: "Deuteronômio", testament: "old", chapters: 34, abbr: "Dt" },
  { id: "joshua", name: "Josué", testament: "old", chapters: 24, abbr: "Js" },
  { id: "judges", name: "Juízes", testament: "old", chapters: 21, abbr: "Jz" },
  { id: "ruth", name: "Rute", testament: "old", chapters: 4, abbr: "Rt" },
  { id: "1samuel", name: "1 Samuel", testament: "old", chapters: 31, abbr: "1Sm" },
  { id: "2samuel", name: "2 Samuel", testament: "old", chapters: 24, abbr: "2Sm" },
  { id: "1kings", name: "1 Reis", testament: "old", chapters: 22, abbr: "1Rs" },
  { id: "2kings", name: "2 Reis", testament: "old", chapters: 25, abbr: "2Rs" },
  { id: "psalms", name: "Salmos", testament: "old", chapters: 150, abbr: "Sl" },
  { id: "proverbs", name: "Provérbios", testament: "old", chapters: 31, abbr: "Pv" },
  { id: "ecclesiastes", name: "Eclesiastes", testament: "old", chapters: 12, abbr: "Ec" },
  { id: "isaiah", name: "Isaías", testament: "old", chapters: 66, abbr: "Is" },
  { id: "daniel", name: "Daniel", testament: "old", chapters: 12, abbr: "Dn" },
  
  // Novo Testamento
  { id: "matthew", name: "Mateus", testament: "new", chapters: 28, abbr: "Mt" },
  { id: "mark", name: "Marcos", testament: "new", chapters: 16, abbr: "Mc" },
  { id: "luke", name: "Lucas", testament: "new", chapters: 24, abbr: "Lc" },
  { id: "john", name: "João", testament: "new", chapters: 21, abbr: "Jo" },
  { id: "acts", name: "Atos", testament: "new", chapters: 28, abbr: "At" },
  { id: "romans", name: "Romanos", testament: "new", chapters: 16, abbr: "Rm" },
  { id: "1corinthians", name: "1 Coríntios", testament: "new", chapters: 16, abbr: "1Co" },
  { id: "2corinthians", name: "2 Coríntios", testament: "new", chapters: 13, abbr: "2Co" },
  { id: "galatians", name: "Gálatas", testament: "new", chapters: 6, abbr: "Gl" },
  { id: "ephesians", name: "Efésios", testament: "new", chapters: 6, abbr: "Ef" },
  { id: "philippians", name: "Filipenses", testament: "new", chapters: 4, abbr: "Fp" },
  { id: "colossians", name: "Colossenses", testament: "new", chapters: 4, abbr: "Cl" },
  { id: "1thessalonians", name: "1 Tessalonicenses", testament: "new", chapters: 5, abbr: "1Ts" },
  { id: "2thessalonians", name: "2 Tessalonicenses", testament: "new", chapters: 3, abbr: "2Ts" },
  { id: "1timothy", name: "1 Timóteo", testament: "new", chapters: 6, abbr: "1Tm" },
  { id: "2timothy", name: "2 Timóteo", testament: "new", chapters: 4, abbr: "2Tm" },
  { id: "titus", name: "Tito", testament: "new", chapters: 3, abbr: "Tt" },
  { id: "philemon", name: "Filemom", testament: "new", chapters: 1, abbr: "Fm" },
  { id: "hebrews", name: "Hebreus", testament: "new", chapters: 13, abbr: "Hb" },
  { id: "james", name: "Tiago", testament: "new", chapters: 5, abbr: "Tg" },
  { id: "1peter", name: "1 Pedro", testament: "new", chapters: 5, abbr: "1Pe" },
  { id: "2peter", name: "2 Pedro", testament: "new", chapters: 3, abbr: "2Pe" },
  { id: "1john", name: "1 João", testament: "new", chapters: 5, abbr: "1Jo" },
  { id: "2john", name: "2 João", testament: "new", chapters: 1, abbr: "2Jo" },
  { id: "3john", name: "3 João", testament: "new", chapters: 1, abbr: "3Jo" },
  { id: "jude", name: "Judas", testament: "new", chapters: 1, abbr: "Jd" },
  { id: "revelation", name: "Apocalipse", testament: "new", chapters: 22, abbr: "Ap" },
];

// Exemplo de dados - João 3 (NVI)
// NOTA: Para produção, você precisará integrar com uma API de Bíblia
// Recomendações: Bible API (https://bible-api.com/) ou Bible.js
export const SAMPLE_CHAPTERS = {
  "john-3": {
    book: "john",
    chapter: 3,
    verses: [
      { number: 1, text: "Havia um fariseu chamado Nicodemos, uma autoridade entre os judeus." },
      { number: 2, text: "Ele veio a Jesus, à noite, e disse: \"Mestre, sabemos que ensinas da parte de Deus, pois ninguém pode realizar os sinais miraculosos que estás fazendo, se Deus não estiver com ele\"." },
      { number: 3, text: "Em resposta, Jesus declarou: \"Digo a verdade: Ninguém pode ver o Reino de Deus, se não nascer de novo\"." },
      { number: 4, text: "Perguntou Nicodemos: \"Como alguém pode nascer, sendo velho? É claro que não pode entrar pela segunda vez no ventre de sua mãe e renascer!\"" },
      { number: 5, text: "Respondeu Jesus: \"Digo a verdade: Ninguém pode entrar no Reino de Deus, se não nascer da água e do Espírito." },
      { number: 6, text: "O que nasce da carne é carne, mas o que nasce do Espírito é espírito." },
      { number: 7, text: "Não se surpreenda pelo fato de eu ter dito: É necessário que vocês nasçam de novo." },
      { number: 16, text: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna." },
      { number: 17, text: "Pois Deus enviou o seu Filho ao mundo, não para condenar o mundo, mas para que este fosse salvo por meio dele." },
    ]
  },
  "psalms-23": {
    book: "psalms",
    chapter: 23,
    verses: [
      { number: 1, text: "O Senhor é o meu pastor; de nada terei falta." },
      { number: 2, text: "Em verdes pastagens me faz repousar e me conduz a águas tranquilas;" },
      { number: 3, text: "restaura-me o vigor. Guia-me nas veredas da justiça por amor do seu nome." },
      { number: 4, text: "Mesmo quando eu andar por um vale de trevas e morte, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me protegem." },
      { number: 5, text: "Preparas um banquete para mim à vista dos meus inimigos. Tu me honras, ungindo a minha cabeça com óleo e fazendo transbordar o meu cálice." },
      { number: 6, text: "Sei que a bondade e a fidelidade me acompanharão todos os dias da minha vida, e voltarei à casa do Senhor enquanto eu viver." },
    ]
  },
  "1thessalonians-5": {
    book: "1thessalonians",
    chapter: 5,
    verses: [
      { number: 16, text: "Estejam sempre alegres," },
      { number: 17, text: "orem continuamente" },
      { number: 18, text: "e deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus." },
      { number: 19, text: "Não apaguem o Espírito." },
      { number: 20, text: "Não tratem com desprezo as profecias," },
      { number: 21, text: "mas ponham à prova todas as coisas e fiquem com o que é bom." },
      { number: 22, text: "Afastem-se de toda forma de mal." },
    ]
  }
};

// Função para buscar capítulo
// NOTA: Implementação simplificada. Em produção, use uma API real
export const getBibleChapter = async (bookId: string, chapter: number) => {
  const key = `${bookId}-${chapter}`;
  
  // Simulação de delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const sampleChapters: Record<string, any> = SAMPLE_CHAPTERS;
  
  if (sampleChapters[key]) {
    return sampleChapters[key];
  }
  
  // Para capítulos não implementados, retornar mensagem
  return {
    book: bookId,
    chapter,
    verses: [
      { 
        number: 1, 
        text: "Este capítulo ainda não está disponível. Para acessar a Bíblia completa, recomendamos integrar com uma API de Bíblia como bible-api.com ou usar o pacote @bibletech/bible-api-js" 
      }
    ]
  };
};

export const getBookInfo = (bookId: string) => {
  return BIBLE_BOOKS.find(book => book.id === bookId);
};
