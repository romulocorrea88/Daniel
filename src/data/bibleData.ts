// Estrutura da Bíblia - Livros e número de capítulos
export const BIBLE_BOOKS = [
  // Antigo Testamento
  { id: "genesis", name: "Gênesis", testament: "old", chapters: 50, abbr: "Gn", apiNumber: 1 },
  { id: "exodus", name: "Êxodo", testament: "old", chapters: 40, abbr: "Êx", apiNumber: 2 },
  { id: "leviticus", name: "Levítico", testament: "old", chapters: 27, abbr: "Lv", apiNumber: 3 },
  { id: "numbers", name: "Números", testament: "old", chapters: 36, abbr: "Nm", apiNumber: 4 },
  { id: "deuteronomy", name: "Deuteronômio", testament: "old", chapters: 34, abbr: "Dt", apiNumber: 5 },
  { id: "joshua", name: "Josué", testament: "old", chapters: 24, abbr: "Js", apiNumber: 6 },
  { id: "judges", name: "Juízes", testament: "old", chapters: 21, abbr: "Jz", apiNumber: 7 },
  { id: "ruth", name: "Rute", testament: "old", chapters: 4, abbr: "Rt", apiNumber: 8 },
  { id: "1samuel", name: "1 Samuel", testament: "old", chapters: 31, abbr: "1Sm", apiNumber: 9 },
  { id: "2samuel", name: "2 Samuel", testament: "old", chapters: 24, abbr: "2Sm", apiNumber: 10 },
  { id: "1kings", name: "1 Reis", testament: "old", chapters: 22, abbr: "1Rs", apiNumber: 11 },
  { id: "2kings", name: "2 Reis", testament: "old", chapters: 25, abbr: "2Rs", apiNumber: 12 },
  { id: "1chronicles", name: "1 Crônicas", testament: "old", chapters: 29, abbr: "1Cr", apiNumber: 13 },
  { id: "2chronicles", name: "2 Crônicas", testament: "old", chapters: 36, abbr: "2Cr", apiNumber: 14 },
  { id: "ezra", name: "Esdras", testament: "old", chapters: 10, abbr: "Ed", apiNumber: 15 },
  { id: "nehemiah", name: "Neemias", testament: "old", chapters: 13, abbr: "Ne", apiNumber: 16 },
  { id: "esther", name: "Ester", testament: "old", chapters: 10, abbr: "Et", apiNumber: 17 },
  { id: "job", name: "Jó", testament: "old", chapters: 42, abbr: "Jó", apiNumber: 18 },
  { id: "psalms", name: "Salmos", testament: "old", chapters: 150, abbr: "Sl", apiNumber: 19 },
  { id: "proverbs", name: "Provérbios", testament: "old", chapters: 31, abbr: "Pv", apiNumber: 20 },
  { id: "ecclesiastes", name: "Eclesiastes", testament: "old", chapters: 12, abbr: "Ec", apiNumber: 21 },
  { id: "song", name: "Cânticos", testament: "old", chapters: 8, abbr: "Ct", apiNumber: 22 },
  { id: "isaiah", name: "Isaías", testament: "old", chapters: 66, abbr: "Is", apiNumber: 23 },
  { id: "jeremiah", name: "Jeremias", testament: "old", chapters: 52, abbr: "Jr", apiNumber: 24 },
  { id: "lamentations", name: "Lamentações", testament: "old", chapters: 5, abbr: "Lm", apiNumber: 25 },
  { id: "ezekiel", name: "Ezequiel", testament: "old", chapters: 48, abbr: "Ez", apiNumber: 26 },
  { id: "daniel", name: "Daniel", testament: "old", chapters: 12, abbr: "Dn", apiNumber: 27 },
  { id: "hosea", name: "Oséias", testament: "old", chapters: 14, abbr: "Os", apiNumber: 28 },
  { id: "joel", name: "Joel", testament: "old", chapters: 3, abbr: "Jl", apiNumber: 29 },
  { id: "amos", name: "Amós", testament: "old", chapters: 9, abbr: "Am", apiNumber: 30 },
  { id: "obadiah", name: "Obadias", testament: "old", chapters: 1, abbr: "Ob", apiNumber: 31 },
  { id: "jonah", name: "Jonas", testament: "old", chapters: 4, abbr: "Jn", apiNumber: 32 },
  { id: "micah", name: "Miquéias", testament: "old", chapters: 7, abbr: "Mq", apiNumber: 33 },
  { id: "nahum", name: "Naum", testament: "old", chapters: 3, abbr: "Na", apiNumber: 34 },
  { id: "habakkuk", name: "Habacuque", testament: "old", chapters: 3, abbr: "Hc", apiNumber: 35 },
  { id: "zephaniah", name: "Sofonias", testament: "old", chapters: 3, abbr: "Sf", apiNumber: 36 },
  { id: "haggai", name: "Ageu", testament: "old", chapters: 2, abbr: "Ag", apiNumber: 37 },
  { id: "zechariah", name: "Zacarias", testament: "old", chapters: 14, abbr: "Zc", apiNumber: 38 },
  { id: "malachi", name: "Malaquias", testament: "old", chapters: 4, abbr: "Ml", apiNumber: 39 },

  // Novo Testamento
  { id: "matthew", name: "Mateus", testament: "new", chapters: 28, abbr: "Mt", apiNumber: 40 },
  { id: "mark", name: "Marcos", testament: "new", chapters: 16, abbr: "Mc", apiNumber: 41 },
  { id: "luke", name: "Lucas", testament: "new", chapters: 24, abbr: "Lc", apiNumber: 42 },
  { id: "john", name: "João", testament: "new", chapters: 21, abbr: "Jo", apiNumber: 43 },
  { id: "acts", name: "Atos", testament: "new", chapters: 28, abbr: "At", apiNumber: 44 },
  { id: "romans", name: "Romanos", testament: "new", chapters: 16, abbr: "Rm", apiNumber: 45 },
  { id: "1corinthians", name: "1 Coríntios", testament: "new", chapters: 16, abbr: "1Co", apiNumber: 46 },
  { id: "2corinthians", name: "2 Coríntios", testament: "new", chapters: 13, abbr: "2Co", apiNumber: 47 },
  { id: "galatians", name: "Gálatas", testament: "new", chapters: 6, abbr: "Gl", apiNumber: 48 },
  { id: "ephesians", name: "Efésios", testament: "new", chapters: 6, abbr: "Ef", apiNumber: 49 },
  { id: "philippians", name: "Filipenses", testament: "new", chapters: 4, abbr: "Fp", apiNumber: 50 },
  { id: "colossians", name: "Colossenses", testament: "new", chapters: 4, abbr: "Cl", apiNumber: 51 },
  { id: "1thessalonians", name: "1 Tessalonicenses", testament: "new", chapters: 5, abbr: "1Ts", apiNumber: 52 },
  { id: "2thessalonians", name: "2 Tessalonicenses", testament: "new", chapters: 3, abbr: "2Ts", apiNumber: 53 },
  { id: "1timothy", name: "1 Timóteo", testament: "new", chapters: 6, abbr: "1Tm", apiNumber: 54 },
  { id: "2timothy", name: "2 Timóteo", testament: "new", chapters: 4, abbr: "2Tm", apiNumber: 55 },
  { id: "titus", name: "Tito", testament: "new", chapters: 3, abbr: "Tt", apiNumber: 56 },
  { id: "philemon", name: "Filemom", testament: "new", chapters: 1, abbr: "Fm", apiNumber: 57 },
  { id: "hebrews", name: "Hebreus", testament: "new", chapters: 13, abbr: "Hb", apiNumber: 58 },
  { id: "james", name: "Tiago", testament: "new", chapters: 5, abbr: "Tg", apiNumber: 59 },
  { id: "1peter", name: "1 Pedro", testament: "new", chapters: 5, abbr: "1Pe", apiNumber: 60 },
  { id: "2peter", name: "2 Pedro", testament: "new", chapters: 3, abbr: "2Pe", apiNumber: 61 },
  { id: "1john", name: "1 João", testament: "new", chapters: 5, abbr: "1Jo", apiNumber: 62 },
  { id: "2john", name: "2 João", testament: "new", chapters: 1, abbr: "2Jo", apiNumber: 63 },
  { id: "3john", name: "3 João", testament: "new", chapters: 1, abbr: "3Jo", apiNumber: 64 },
  { id: "jude", name: "Judas", testament: "new", chapters: 1, abbr: "Jd", apiNumber: 65 },
  { id: "revelation", name: "Apocalipse", testament: "new", chapters: 22, abbr: "Ap", apiNumber: 66 },
];

// GetBible API Configuration
const GETBIBLE_API_URL = 'https://api.getbible.net/v2';
const DEFAULT_TRANSLATION = 'almeida'; // Almeida Atualizada (Portuguese)

// Cache para armazenar capítulos já carregados
const chapterCache: Record<string, any> = {};

/**
 * Função para buscar capítulo da API GetBible
 * Integrada com GetBible API (https://getbible.net)
 * Tradução padrão: ACF (Almeida Corrigida Fiel)
 */
export const getBibleChapter = async (bookId: string, chapter: number) => {
  try {
    // Buscar informações do livro
    const bookInfo = BIBLE_BOOKS.find(b => b.id === bookId);

    if (!bookInfo) {
      throw new Error(`Livro não encontrado: ${bookId}`);
    }

    // Verificar cache
    const cacheKey = `${bookId}-${chapter}`;
    if (chapterCache[cacheKey]) {
      return chapterCache[cacheKey];
    }

    // Fazer requisição para a API GetBible
    const apiUrl = `${GETBIBLE_API_URL}/${DEFAULT_TRANSLATION}/${bookInfo.apiNumber}/${chapter}.json`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erro ao buscar capítulo: ${response.statusText}`);
    }

    const data = await response.json();

    // Transformar dados da API para o formato esperado pelo app
    const verses = [];

    if (data.verses && Array.isArray(data.verses)) {
      for (const verse of data.verses) {
        verses.push({
          number: verse.verse,
          text: verse.text
        });
      }
    }

    const result = {
      book: bookId,
      chapter,
      verses
    };

    // Armazenar no cache
    chapterCache[cacheKey] = result;

    return result;
  } catch (error) {
    console.error('Erro ao carregar capítulo da Bíblia:', error);

    // Fallback: retornar mensagem de erro amigável
    return {
      book: bookId,
      chapter,
      verses: [
        {
          number: 1,
          text: "Não foi possível carregar este capítulo. Verifique sua conexão com a internet e tente novamente."
        }
      ]
    };
  }
};

export const getBookInfo = (bookId: string) => {
  return BIBLE_BOOKS.find(book => book.id === bookId);
};
