import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  provider?: "email" | "google" | "apple";
  photoUrl?: string;
}

interface Prayer {
  id: string;
  title: string;
  description: string;
  category: string;
  dateCreated: string;
  isAnswered: boolean;
}

interface AuthState {
  isGuest: boolean;
  isAuthenticated: boolean;
  user: User | null;
  guestPrayers: Prayer[];
  login: (provider: "email" | "google" | "apple", userData: User) => Promise<void>;
  logout: () => void;
  convertGuestToUser: (userData: User) => Prayer[];
  addGuestPrayer: (prayer: Prayer) => void;
  updateUser: (userData: Partial<User>) => void;
  needsAuth: () => boolean;
  checkAuthRequired: (action: string) => boolean;
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
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isGuest: state.isGuest,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
