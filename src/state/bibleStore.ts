import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface BibleHighlight {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  color: string;
  text: string;
  createdAt: string;
}

export interface BibleNote {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface BibleBookmark {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  label: string;
  createdAt: string;
}

interface BibleState {
  highlights: BibleHighlight[];
  notes: BibleNote[];
  bookmarks: BibleBookmark[];
  lastRead: { book: string; chapter: number } | null;

  // Highlights
  addHighlight: (highlight: Omit<BibleHighlight, "id" | "createdAt">) => void;
  removeHighlight: (id: string) => void;
  getHighlightsForVerse: (book: string, chapter: number, verse: number) => BibleHighlight | undefined;
  getHighlightsForChapter: (book: string, chapter: number) => BibleHighlight[];

  // Notes
  addNote: (note: Omit<BibleNote, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, noteText: string) => void;
  deleteNote: (id: string) => void;
  getNoteForVerse: (book: string, chapter: number, verse: number) => BibleNote | undefined;
  getNotesForChapter: (book: string, chapter: number) => BibleNote[];

  // Bookmarks
  addBookmark: (bookmark: Omit<BibleBookmark, "id" | "createdAt">) => void;
  removeBookmark: (id: string) => void;
  getAllBookmarks: () => BibleBookmark[];

  // Reading progress
  setLastRead: (book: string, chapter: number) => void;
}

const useBibleStore = create<BibleState>()(
  persist(
    (set, get) => ({
      highlights: [],
      notes: [],
      bookmarks: [],
      lastRead: null,

      // Highlights
      addHighlight: (highlight) => {
        const newHighlight: BibleHighlight = {
          ...highlight,
          id: `highlight_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          highlights: [...state.highlights, newHighlight],
        }));
      },

      removeHighlight: (id) => {
        set((state) => ({
          highlights: state.highlights.filter((h) => h.id !== id),
        }));
      },

      getHighlightsForVerse: (book, chapter, verse) => {
        const highlights = get().highlights;
        return highlights.find(
          (h) => h.book === book && h.chapter === chapter && h.verse === verse
        );
      },

      getHighlightsForChapter: (book, chapter) => {
        const highlights = get().highlights;
        return highlights.filter(
          (h) => h.book === book && h.chapter === chapter
        );
      },

      // Notes
      addNote: (note) => {
        const newNote: BibleNote = {
          ...note,
          id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          notes: [...state.notes, newNote],
        }));
      },

      updateNote: (id, noteText) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, note: noteText, updatedAt: new Date().toISOString() }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }));
      },

      getNoteForVerse: (book, chapter, verse) => {
        const notes = get().notes;
        return notes.find(
          (n) => n.book === book && n.chapter === chapter && n.verse === verse
        );
      },

      getNotesForChapter: (book, chapter) => {
        const notes = get().notes;
        return notes.filter(
          (n) => n.book === book && n.chapter === chapter
        );
      },

      // Bookmarks
      addBookmark: (bookmark) => {
        const newBookmark: BibleBookmark = {
          ...bookmark,
          id: `bookmark_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          bookmarks: [...state.bookmarks, newBookmark],
        }));
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },

      getAllBookmarks: () => {
        return get().bookmarks;
      },

      // Reading progress
      setLastRead: (book, chapter) => {
        set({
          lastRead: { book, chapter },
        });
      },
    }),
    {
      name: "bible-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useBibleStore;
