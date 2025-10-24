import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import HapticPressable from "../components/HapticPressable";
import useAuthStore from "../state/authStore";
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithApple, 
  isAppleAuthAvailable,
  useGoogleAuth,
  getGoogleUserInfo 
} from "../services/authService";
import useHaptics from "../utils/useHaptics";
import Colors from "../constants/Colors";

const AuthScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const { login } = useAuthStore();
  
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);

  // Google Auth
  const { request, response, promptAsync } = useGoogleAuth();

  // Check if coming from a protected action
  const protectedAction = route.params?.protectedAction;
  const actionMessage = route.params?.actionMessage;

  useEffect(() => {
    checkAppleAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleGoogleSignIn(authentication.accessToken);
      }
    }
  }, [response]);

  const checkAppleAuth = async () => {
    const available = await isAppleAuthAvailable();
    setAppleAvailable(available);
  };

  const handleGoogleSignIn = async (accessToken: string) => {
    try {
      setLoading(true);
      const userInfo = await getGoogleUserInfo(accessToken);
      await login("google", userInfo);
      haptics.success();
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao fazer login com Google");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      haptics.light();
      const userInfo = await signInWithApple();
      
      if (userInfo) {
        await login("apple", userInfo);
        haptics.success();
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao fazer login com Apple");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    try {
      setLoading(true);
      haptics.medium();

      let userInfo;
      if (mode === "signin") {
        userInfo = await signInWithEmail(email, password);
      } else {
        userInfo = await signUpWithEmail(name, email, password);
      }

      await login("email", userInfo);
      haptics.success();
      
      Alert.alert(
        "Sucesso!",
        mode === "signin" ? "Login realizado com sucesso!" : "Conta criada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      haptics.error();
      Alert.alert("Erro", error.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setName("");
    setEmail("");
    setPassword("");
    haptics.light();
  };

  const isFormValid = () => {
    if (mode === "signup") {
      return name.trim() && email.trim() && password.length >= 6;
    }
    return email.trim() && password.length >= 6;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Close Button */}
        <View style={styles.header}>
          <HapticPressable
            onPress={() => navigation.goBack()}
            hapticType="light"
            style={styles.closeButton}
          >
            <Ionicons name="close" size={28} color={Colors.textPrimary} />
          </HapticPressable>
        </View>

        <Animated.View entering={FadeIn.duration(400)} style={styles.content}>
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <Ionicons name="prism" size={64} color={Colors.primaryGreen} />
            <Text style={styles.appName}>Daniel</Text>
          </View>

          {/* Protected Action Message */}
          {protectedAction && actionMessage && (
            <Animated.View entering={FadeInDown.delay(100)} style={styles.protectedMessage}>
              <Ionicons name="lock-closed" size={20} color={Colors.primaryGreen} />
              <Text style={styles.protectedMessageText}>{actionMessage}</Text>
            </Animated.View>
          )}

          {/* Title */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <Text style={styles.title}>
              {mode === "signin" ? "Bem-vindo de volta!" : "Criar conta"}
            </Text>
            <Text style={styles.subtitle}>
              {mode === "signin" 
                ? "Entre para salvar suas orações e progresso" 
                : "Crie sua conta para começar sua jornada de oração"
              }
            </Text>
          </Animated.View>

          {/* Social Login Buttons */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.socialButtons}>
            {/* Google Sign In */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => {
                haptics.light();
                promptAsync();
              }}
              disabled={loading || !request}
            >
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text style={styles.socialButtonText}>Continuar com Google</Text>
            </TouchableOpacity>

            {/* Apple Sign In */}
            {appleAvailable && (
              <TouchableOpacity
                style={[styles.socialButton, styles.appleButton]}
                onPress={handleAppleSignIn}
                disabled={loading}
              >
                <Ionicons name="logo-apple" size={24} color={Colors.backgroundWhite} />
                <Text style={[styles.socialButtonText, styles.appleButtonText]}>
                  Continuar com Apple
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>

          {/* Divider */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          {/* Email Form */}
          <Animated.View entering={FadeInDown.delay(500)} style={styles.form}>
            {mode === "signup" && (
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={Colors.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  placeholderTextColor={Colors.textTertiary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={Colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.textTertiary}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={Colors.textTertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={Colors.textTertiary}
                />
              </TouchableOpacity>
            </View>

            {mode === "signup" && (
              <Text style={styles.passwordHint}>Mínimo de 6 caracteres</Text>
            )}
          </Animated.View>

          {/* Submit Button */}
          <Animated.View entering={FadeInDown.delay(600)}>
            <TouchableOpacity
              style={[styles.submitButton, (!isFormValid() || loading) && styles.submitButtonDisabled]}
              onPress={handleEmailAuth}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.backgroundWhite} />
              ) : (
                <Text style={styles.submitButtonText}>
                  {mode === "signin" ? "Entrar" : "Criar conta"}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Toggle Mode */}
          <Animated.View entering={FadeInDown.delay(700)} style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {mode === "signin" ? "Não tem uma conta?" : "Já tem uma conta?"}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.toggleButton}>
                {mode === "signin" ? "Criar conta" : "Entrar"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Guest Continue */}
          <Animated.View entering={FadeInDown.delay(800)}>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => {
                haptics.light();
                navigation.goBack();
              }}
            >
              <Text style={styles.guestButtonText}>Continuar como visitante</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 12,
  },
  protectedMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondaryMintLight + "30",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  protectedMessageText: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryGreen,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  appleButton: {
    backgroundColor: Colors.textPrimary,
    borderColor: Colors.textPrimary,
  },
  appleButtonText: {
    color: Colors.backgroundWhite,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  eyeIcon: {
    padding: 8,
  },
  passwordHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: -8,
  },
  submitButton: {
    backgroundColor: Colors.primaryGreen,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  toggleButton: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  guestButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  guestButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default AuthScreen;
