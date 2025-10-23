import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface PrayerSession {
  id: string;
  date: string; // ISO date string
  duration: number; // in seconds
  notes: {
    adoration: string;
    confession: string;
    thanksgiving: string;
    supplication: string;
  };
  timestamp: number;
}

export interface Prayer {
  id: string;
  title: string;
  description: string;
  category: string;
  dateCreated: string;
  isAnswered: boolean;
  answeredDate?: string;
}

interface PrayerStats {
  consecutiveDays: number;
  answeredPrayers: number;
  totalPrayerTime: number; // in seconds
  lastPrayerDate: string | null;
}

interface PrayerState {
  sessions: PrayerSession[];
  prayers: Prayer[];
  stats: PrayerStats;
  
  // Actions
  addPrayerSession: (session: Omit<PrayerSession, "id" | "timestamp">) => void;
  getPrayerSessionsByDate: (date: string) => PrayerSession[];
  getPrayerSessionsByMonth: (year: number, month: number) => PrayerSession[];
  getTotalPrayerTime: () => number;
  getWeeklyPrayerTime: () => number;
  getMonthlyPrayerTime: () => number;
  getDaysWithPrayer: () => string[];
  
  addPrayer: (prayer: Omit<Prayer, "id" | "dateCreated">) => void;
  markPrayerAsAnswered: (prayerId: string) => void;
  deletePrayer: (prayerId: string) => void;
  
  updateStats: () => void;
  calculateConsecutiveDays: () => number;
}

const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      sessions: [],
      prayers: [],
      stats: {
        consecutiveDays: 0,
        answeredPrayers: 0,
        totalPrayerTime: 0,
        lastPrayerDate: null,
      },

      // Add a new prayer session
      addPrayerSession: (session) => {
        const newSession: PrayerSession = {
          ...session,
          id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
          timestamp: Date.now(),
        };

        set((state) => ({
          sessions: [...state.sessions, newSession],
        }));

        // Update stats after adding session
        get().updateStats();
      },

      // Get prayer sessions for a specific date
      getPrayerSessionsByDate: (date) => {
        const sessions = get().sessions;
        return sessions.filter((session) => session.date === date);
      },

      // Get prayer sessions for a specific month
      getPrayerSessionsByMonth: (year, month) => {
        const sessions = get().sessions;
        return sessions.filter((session) => {
          const sessionDate = new Date(session.date);
          return (
            sessionDate.getFullYear() === year &&
            sessionDate.getMonth() === month
          );
        });
      },

      // Get total prayer time in seconds
      getTotalPrayerTime: () => {
        const sessions = get().sessions;
        return sessions.reduce((total, session) => total + session.duration, 0);
      },

      // Get weekly prayer time (last 7 days)
      getWeeklyPrayerTime: () => {
        const sessions = get().sessions;
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        return sessions
          .filter((session) => new Date(session.date) >= sevenDaysAgo)
          .reduce((total, session) => total + session.duration, 0);
      },

      // Get monthly prayer time (last 30 days)
      getMonthlyPrayerTime: () => {
        const sessions = get().sessions;
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        return sessions
          .filter((session) => new Date(session.date) >= thirtyDaysAgo)
          .reduce((total, session) => total + session.duration, 0);
      },

      // Get all unique dates that have prayer sessions
      getDaysWithPrayer: () => {
        const sessions = get().sessions;
        const uniqueDates = new Set(sessions.map((session) => session.date));
        return Array.from(uniqueDates).sort();
      },

      // Add a new prayer
      addPrayer: (prayer) => {
        const newPrayer: Prayer = {
          ...prayer,
          id: `prayer_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
          dateCreated: new Date().toISOString(),
          isAnswered: false,
        };

        set((state) => ({
          prayers: [...state.prayers, newPrayer],
        }));
      },

      // Mark prayer as answered
      markPrayerAsAnswered: (prayerId) => {
        set((state) => ({
          prayers: state.prayers.map((prayer) =>
            prayer.id === prayerId
              ? { ...prayer, isAnswered: true, answeredDate: new Date().toISOString() }
              : prayer
          ),
        }));

        get().updateStats();
      },

      // Delete a prayer
      deletePrayer: (prayerId) => {
        set((state) => ({
          prayers: state.prayers.filter((prayer) => prayer.id !== prayerId),
        }));

        get().updateStats();
      },

      // Calculate consecutive days of prayer
      calculateConsecutiveDays: () => {
        const daysWithPrayer = get().getDaysWithPrayer();
        if (daysWithPrayer.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split("T")[0];

        // Check if user prayed today or yesterday
        const lastPrayerDate = daysWithPrayer[daysWithPrayer.length - 1];
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (lastPrayerDate !== todayStr && lastPrayerDate !== yesterdayStr) {
          return 0; // Streak broken
        }

        let consecutive = 0;
        let currentDate = new Date(today);

        // Count backwards from today
        for (let i = daysWithPrayer.length - 1; i >= 0; i--) {
          const dateStr = currentDate.toISOString().split("T")[0];
          
          if (daysWithPrayer[i] === dateStr) {
            consecutive++;
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break;
          }
        }

        return consecutive;
      },

      // Update stats
      updateStats: () => {
        const state = get();
        const answeredPrayers = state.prayers.filter((p) => p.isAnswered).length;
        const consecutiveDays = state.calculateConsecutiveDays();
        const totalPrayerTime = state.getTotalPrayerTime();
        const daysWithPrayer = state.getDaysWithPrayer();
        const lastPrayerDate = daysWithPrayer.length > 0 
          ? daysWithPrayer[daysWithPrayer.length - 1] 
          : null;

        set({
          stats: {
            answeredPrayers,
            consecutiveDays,
            totalPrayerTime,
            lastPrayerDate,
          },
        });
      },
    }),
    {
      name: "prayer-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePrayerStore;
