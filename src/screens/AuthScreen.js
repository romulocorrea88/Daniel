import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../state/authStore";
import Colors from "../constants/Colors";

const AuthScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { login, convertGuestToUser, guestPrayers } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSignup = async () => {
    const newErrors = { name: "", email: "" };

    if (!name.trim()) {
      newErrors.name = "Por favor, digite seu nome";
    }

    if (!email.trim()) {
      newErrors.email = "Por favor, digite seu email";
    } else if (!validateEmail(email.trim())) {
      newErrors.email = "Por favor, digite um email válido";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email) {
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        provider: "email",
      };

      if (guestPrayers.length > 0) {
        convertGuestToUser(newUser);
      } else {
        await login("email", newUser);
      }
      
      navigation.replace("Main");
    } catch (error) {
      setErrors({ ...errors, email: "Erro ao criar conta. Tente novamente." });
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
            <Ionicons name="close" size={28} color={Colors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Ionicons name="prism-outline" size={60} color={Colors.primaryGreen} />
          
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
              <Ionicons name="information-circle" size={24} color={Colors.primaryGreen} />
              <Text style={styles.guestInfoText}>
                Você tem {guestPrayers.length} pedido(s) que será(ão) salvo(s) após criar sua conta
              </Text>
            </View>
          )}

          {/* Email Signup Form */}
          <View style={styles.emailForm}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  errors.name && styles.inputError
                ]}
                placeholder="Seu nome"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                autoCapitalize="words"
                editable={!isLoading}
              />
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  errors.email && styles.inputError
                ]}
                placeholder="Seu email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

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
            Ao continuar, você concorda com nossos{" "}
            <Text 
              style={styles.termsLink}
              onPress={() => Linking.openURL("https://exemplo.com/termos")}
            >
              Termos de Uso
            </Text>
            {" "}e{" "}
            <Text 
              style={styles.termsLink}
              onPress={() => Linking.openURL("https://exemplo.com/privacidade")}
            >
              Política de Privacidade
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
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
    color: Colors.textPrimary,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  guestInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondaryMintLight + "60",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  guestInfoText: {
    flex: 1,
    fontSize: 14,
    color: "#1B5E20",
    lineHeight: 20,
  },
  emailForm: {
    width: "100%",
    gap: 16,
    marginTop: 8,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  emailButton: {
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  emailButtonPressed: {
    backgroundColor: Colors.primaryGreenDark,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.backgroundWhite,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  termsText: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: "center",
    marginTop: 24,
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primaryGreen,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default AuthScreen;
