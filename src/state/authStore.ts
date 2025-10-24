import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  provider?: "email" | "google" | "apple";
  photoUrl?: string;
  city?: string;
  church?: string;
}

interface Prayer {
  id: string;
  title: string;
  description: string;
  category: string;
  dateCreated: string;
  isAnswered: boolean;
}

interface NotificationSchedule {
  id: string;
  time: string; // HH:mm format
  enabled: boolean;
}

interface AppSettings {
  theme: "light" | "dark" | "auto";
  language: "pt" | "en" | "es";
  notifications: NotificationSchedule[];
}

interface AuthState {
  isGuest: boolean;
  isAuthenticated: boolean;
  user: User | null;
  guestPrayers: Prayer[];
  settings: AppSettings;
  
  login: (provider: "email" | "google" | "apple", userData: User) => Promise<void>;
  logout: () => void;
  convertGuestToUser: (userData: User) => Prayer[];
  addGuestPrayer: (prayer: Prayer) => void;
  updateUser: (userData: Partial<User>) => void;
  updateUserPhoto: (photoUrl: string) => void;
  needsAuth: () => boolean;
  checkAuthRequired: (action: string) => boolean;
  
  // Settings
  updateTheme: (theme: "light" | "dark" | "auto") => void;
  updateLanguage: (language: "pt" | "en" | "es") => void;
  addNotification: (time: string) => void;
  removeNotification: (id: string) => void;
  toggleNotification: (id: string) => void;
  updateNotificationTime: (id: string, time: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Auth State
      isGuest: true,
      isAuthenticated: false,
      user: null,
      
      // Guest mode data (temporary, not persisted to backend)
      guestPrayers: [],
      
      // App Settings
      settings: {
        theme: "light",
        language: "pt",
        notifications: [],
      },

      // Login with provider
      login: async (provider: "email" | "google" | "apple", userData: User) => {
        set({
          isGuest: false,
          isAuthenticated: true,
          user: { ...userData, provider },
        });
      },

      // Logout
      logout: () => {
        set({
          isGuest: true,
          isAuthenticated: false,
          user: null,
        });
      },

      // Convert guest to authenticated user
      convertGuestToUser: (userData: User) => {
        const guestPrayers = get().guestPrayers;
        
        set({
          isGuest: false,
          isAuthenticated: true,
          user: userData,
          guestPrayers: [], // Clear guest prayers after conversion
        });

        // Return guest prayers to be synced with backend
        return guestPrayers;
      },

      // Add prayer in guest mode
      addGuestPrayer: (prayer: Prayer) => {
        set((state) => ({
          guestPrayers: [...state.guestPrayers, prayer],
        }));
      },

      // Update user data
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      
      // Update user photo
      updateUserPhoto: (photoUrl: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, photoUrl } : null,
        }));
      },

      // Check if user needs to authenticate
      needsAuth: () => {
        const { isGuest, guestPrayers } = get();
        return isGuest && guestPrayers.length > 0;
      },

      // Check if authentication is required for an action
      checkAuthRequired: (action: string) => {
        const protectedActions = [
          "create_prayer",
          "answer_prayer",
          "highlight_bible",
          "add_bible_note",
          "add_bookmark",
        ];
        
        return get().isGuest && protectedActions.includes(action);
      },
      
      // Settings - Theme
      updateTheme: (theme: "light" | "dark" | "auto") => {
        set((state) => ({
          settings: { ...state.settings, theme },
        }));
      },
      
      // Settings - Language
      updateLanguage: (language: "pt" | "en" | "es") => {
        set((state) => ({
          settings: { ...state.settings, language },
        }));
      },
      
      // Settings - Notifications
      addNotification: (time: string) => {
        const newNotification: NotificationSchedule = {
          id: `notif_${Date.now()}`,
          time,
          enabled: true,
        };
        
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: [...state.settings.notifications, newNotification],
          },
        }));
      },
      
      removeNotification: (id: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: state.settings.notifications.filter((n) => n.id !== id),
          },
        }));
      },
      
      toggleNotification: (id: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: state.settings.notifications.map((n) =>
              n.id === id ? { ...n, enabled: !n.enabled } : n
            ),
          },
        }));
      },
      
      updateNotificationTime: (id: string, time: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: state.settings.notifications.map((n) =>
              n.id === id ? { ...n, time } : n
            ),
          },
        }));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isGuest: state.isGuest,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        settings: state.settings,
      }),
    }
  )
);

export default useAuthStore;
