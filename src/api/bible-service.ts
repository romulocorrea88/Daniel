/**
 * Bible API Service
 * Uses GetBible API (https://getbible.net)
 * Free API - No API key required
 */

import type {
  BibleTranslation,
  BibleQueryResponse,
  BibleBook,
} from '../types/bible';

const BASE_API_URL = 'https://api.getbible.net/v2';
const QUERY_API_URL = 'https://query.getbible.net/v2';

/**
 * Get all available Bible translations
 */
export async function getBibleTranslations(): Promise<BibleTranslation[]> {
  try {
    const response = await fetch(`${BASE_API_URL}/translations.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Bible translations:', error);
    throw error;
  }
}

/**
 * Get Portuguese translations only
 */
export async function getPortugueseTranslations(): Promise<BibleTranslation[]> {
  const translations = await getBibleTranslations();
  return translations.filter((t) => t.language.toLowerCase() === 'portuguese');
}

/**
 * Get a specific verse or passage
 * @param translation - Translation abbreviation (e.g., 'ara' for Almeida Revista e Atualizada)
 * @param reference - Bible reference (e.g., 'João 3:16' or 'John 3:16')
 */
export async function getBibleVerse(
  translation: string,
  reference: string
): Promise<BibleQueryResponse> {
  try {
    const encodedRef = encodeURIComponent(reference);
    const response = await fetch(
      `${QUERY_API_URL}/${translation}/${encodedRef}.json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch verse: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Bible verse:', error);
    throw error;
  }
}

/**
 * Get a complete chapter
 * @param translation - Translation abbreviation
 * @param book - Book number (1-66) or name
 * @param chapter - Chapter number
 */
export async function getBibleChapter(
  translation: string,
  book: string | number,
  chapter: number
): Promise<BibleQueryResponse> {
  try {
    const response = await fetch(
      `${BASE_API_URL}/${translation}/${book}/${chapter}.json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch chapter: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Bible chapter:', error);
    throw error;
  }
}

/**
 * Get a complete book
 * @param translation - Translation abbreviation
 * @param book - Book number (1-66) or name
 */
export async function getBibleBook(
  translation: string,
  book: string | number
): Promise<BibleBook[]> {
  try {
    const response = await fetch(`${BASE_API_URL}/${translation}/${book}.json`);

    if (!response.ok) {
      throw new Error(`Failed to fetch book: ${response.statusText}`);
    }

    const data = await response.json();
    return data.book || [];
  } catch (error) {
    console.error('Error fetching Bible book:', error);
    throw error;
  }
}

/**
 * Search for verses containing specific text
 * @param translation - Translation abbreviation
 * @param searchTerm - Text to search for
 * @param book - Optional: limit search to specific book
 */
export async function searchBible(
  translation: string,
  searchTerm: string,
  book?: string | number
): Promise<BibleQueryResponse> {
  try {
    const encodedTerm = encodeURIComponent(searchTerm);
    const bookParam = book ? `/${book}` : '';
    const response = await fetch(
      `${QUERY_API_URL}/${translation}${bookParam}?search=${encodedTerm}`
    );

    if (!response.ok) {
      throw new Error(`Failed to search Bible: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching Bible:', error);
    throw error;
  }
}

/**
 * Common Portuguese translations
 */
export const PORTUGUESE_TRANSLATIONS = {
  ARA: 'ara', // Almeida Revista e Atualizada
  ACF: 'acf', // Almeida Corrigida Fiel
  NVI: 'nvi', // Nova Versão Internacional
};

/**
 * Helper to get verse text only
 */
export function getVerseText(response: BibleQueryResponse): string {
  return response.verses.map((v) => v.text).join(' ');
}

/**
 * Helper to format verse reference
 */
export function formatVerseReference(response: BibleQueryResponse): string {
  const verses = response.verses;
  if (verses.length === 0) return '';

  const bookName = response.book_name;
  const chapter = response.chapter;

  if (verses.length === 1) {
    return `${bookName} ${chapter}:${verses[0].verse}`;
  }

  const firstVerse = verses[0].verse;
  const lastVerse = verses[verses.length - 1].verse;
  return `${bookName} ${chapter}:${firstVerse}-${lastVerse}`;
}
