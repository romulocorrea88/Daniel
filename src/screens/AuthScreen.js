import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../state/authStore";

const AuthScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { login, convertGuestToUser, guestPrayers } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login - Replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Math.random().toString(),
        name: provider === "google" ? "Usuário Google" : "Usuário Apple",
        email: `user@${provider}.com`,
        provider: provider,
      };

      if (guestPrayers.length > 0) {
        // Convert guest to user and sync prayers
        const prayers = convertGuestToUser(mockUser);
        console.log("Syncing guest prayers to backend:", prayers);
      } else {
        await login(provider, mockUser);
      }
      
      navigation.replace("Main");
    } catch (error) {
      console.error("Social login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (!email || !name) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate email signup - Replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Math.random().toString(),
        name: name,
        email: email,
        provider: "email",
      };

      if (guestPrayers.length > 0) {
        // Convert guest to user and sync prayers
        const prayers = convertGuestToUser(mockUser);
        console.log("Syncing guest prayers to backend:", prayers);
      } else {
        await login("email", mockUser);
      }
      
      navigation.replace("Main");
    } catch (error) {
      console.error("Email signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasGuestPrayers = guestPrayers.length > 0;

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable 
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={28} color="#1F2937" />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Ionicons name="prism-outline" size={60} color="#DC2626" />
          
          <Text style={styles.title}>
            {hasGuestPrayers 
              ? "Salve seu pedido de oração" 
              : "Bem-vindo ao Daniel"}
          </Text>
          
          <Text style={styles.subtitle}>
            {hasGuestPrayers
              ? "Crie sua conta para salvar e acompanhar seus pedidos"
              : "Sua jornada de oração começa aqui"}
          </Text>

          {hasGuestPrayers && (
            <View style={styles.guestInfoCard}>
              <Ionicons name="information-circle" size={24} color="#DC2626" />
              <Text style={styles.guestInfoText}>
                Você tem {guestPrayers.length} pedido(s) que será(ão) salvo(s) após criar sua conta
              </Text>
            </View>
          )}

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.socialButton,
                styles.googleButton,
                pressed && styles.socialButtonPressed,
                isLoading && styles.buttonDisabled
              ]}
              onPress={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={24} color="#DC2626" />
              <Text style={styles.socialButtonText}>Continuar com Google</Text>
            </Pressable>

            {Platform.OS === "ios" && (
              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  styles.appleButton,
                  pressed && styles.socialButtonPressed,
                  isLoading && styles.buttonDisabled
                ]}
                onPress={() => handleSocialLogin("apple")}
                disabled={isLoading}
              >
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
                <Text style={styles.appleButtonText}>Continuar com Apple</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Signup */}
          <View style={styles.emailForm}>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!isLoading}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />

            <Pressable
              style={({ pressed }) => [
                styles.emailButton,
                pressed && styles.emailButtonPressed,
                isLoading && styles.buttonDisabled
              ]}
              onPress={handleEmailSignup}
              disabled={isLoading}
            >
              <Text style={styles.emailButtonText}>
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.termsText}>
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  guestInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  guestInfoText: {
    flex: 1,
    fontSize: 14,
    color: "#991B1B",
    lineHeight: 20,
  },
  socialButtonsContainer: {
    width: "100%",
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  appleButton: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  socialButtonPressed: {
    opacity: 0.7,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginHorizontal: 16,
  },
  emailForm: {
    width: "100%",
    gap: 12,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
  },
  emailButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  emailButtonPressed: {
    backgroundColor: "#B91C1C",
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  termsText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 18,
  },
});

export default AuthScreen;
