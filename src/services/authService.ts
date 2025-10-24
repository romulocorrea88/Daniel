import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Platform, Alert } from "react-native";

// Configuração - Em produção, adicione no .env
const GOOGLE_CLIENT_ID_IOS = "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID_ANDROID = "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID_WEB = "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

// Google Sign In
export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_CLIENT_ID_IOS,
    androidClientId: GOOGLE_CLIENT_ID_ANDROID,
    webClientId: GOOGLE_CLIENT_ID_WEB,
  });

  return { request, response, promptAsync };
};

// Get Google user info
export const getGoogleUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    const user = await response.json();
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photoUrl: user.picture,
    };
  } catch (error) {
    console.error("Error fetching Google user info:", error);
    throw error;
  }
};

// Apple Sign In (Mock for now - requires expo-apple-authentication)
export const signInWithApple = async () => {
  Alert.alert(
    "Apple Sign In",
    "Para implementar o Apple Sign In, instale: npx expo install expo-apple-authentication"
  );
  return null;
};

// Check if Apple Sign In is available
export const isAppleAuthAvailable = async () => {
  return Platform.OS === "ios";
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: "A senha deve ter pelo menos 6 caracteres" };
  }
  return { valid: true };
};

// Mock email/password authentication
// NOTA: Em produção, integrar com Firebase Auth, Supabase, ou backend próprio
export const signInWithEmail = async (email: string, password: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation
  if (!validateEmail(email)) {
    throw new Error("Email inválido");
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    throw new Error(passwordValidation.message);
  }

  // Mock user data
  return {
    id: `email_${Date.now()}`,
    name: email.split("@")[0],
    email,
    photoUrl: undefined,
  };
};

// Mock email/password registration
export const signUpWithEmail = async (name: string, email: string, password: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation
  if (!name.trim()) {
    throw new Error("Nome é obrigatório");
  }

  if (!validateEmail(email)) {
    throw new Error("Email inválido");
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    throw new Error(passwordValidation.message);
  }

  // Mock user creation
  return {
    id: `email_${Date.now()}`,
    name: name.trim(),
    email,
    photoUrl: undefined,
  };
};
