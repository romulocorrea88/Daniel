// Bible API Types

export interface BibleTranslation {
  abbreviation: string;
  language: string;
  lang: string;
  encoding: string;
  direction: string;
  sha: string;
}

export interface BibleVerse {
  chapter: number;
  verse: number;
  name: string;
  text: string;
}

export interface BibleChapter {
  chapter: number;
  name: string;
  verses: BibleVerse[];
}

export interface BibleBook {
  nr: number;
  name: string;
  translation: string;
  language: string;
  direction: string;
  encoding: string;
  chapters: BibleChapter[];
}

export interface BibleResponse {
  book: BibleBook[];
}

export interface BibleQueryResponse {
  translation: string;
  abbreviation: string;
  language: string;
  direction: string;
  encoding: string;
  book_nr: number;
  book_name: string;
  chapter: number;
  verses: BibleVerse[];
}
