import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Alert } from "react-native";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { mockUser } from "../utils/mockData";
import useAuthStore from "../state/authStore";

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isGuest, user, logout } = useAuthStore();
  const [showAboutModal, setShowAboutModal] = useState(false);

  const displayUser = isGuest 
    ? { name: "Visitante", email: "Faça login para salvar seus dados" }
    : (user || mockUser);

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: () => logout()
        }
      ]
    );
  };

  const handleLogin = () => {
    navigation.navigate("Auth");
  };

  const handleNotifications = () => {
    navigation.navigate("Settings");
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleEditProfile = () => {
    if (isGuest) {
      Alert.alert(
        "Funcionalidade Premium",
        "Faça login para editar seu perfil",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate("EditProfile");
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy");
  };

  const handleHelp = () => {
    Alert.alert(
      "Ajuda e Suporte",
      "Precisa de ajuda? Entre em contato conosco:\n\nEmail: suporte@danielprayer.com\n\nEm breve: Central de ajuda completa.",
      [{ text: "OK" }]
    );
  };

  const handleAbout = () => {
    setShowAboutModal(true);
  };

  const menuItems = [
    {
      id: 1,
      icon: "notifications-outline",
      title: "Notificações",
      subtitle: "Gerenciar lembretes de oração",
      onPress: handleNotifications,
    },
    {
      id: 2,
      icon: "settings-outline",
      title: "Configurações",
      subtitle: "Preferências do aplicativo",
      onPress: handleSettings,
    },
    {
      id: 3,
      icon: "shield-checkmark-outline",
      title: "Política de Privacidade",
      subtitle: "Como protegemos seus dados",
      onPress: handlePrivacyPolicy,
    },
    {
      id: 4,
      icon: "help-circle-outline",
      title: "Ajuda e Suporte",
      subtitle: "Precisa de ajuda?",
      onPress: handleHelp,
    },
    {
      id: 5,
      icon: "information-circle-outline",
      title: "Sobre",
      subtitle: "Versão 1.0.0",
      onPress: handleAbout,
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 }
        ]}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={48} color={Colors.backgroundWhite} />
          </View>
          <Text style={styles.userName}>{displayUser.name}</Text>
          <Text style={styles.userEmail}>{displayUser.email}</Text>
          
          {isGuest ? (
            <Pressable 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Criar Conta / Entrar</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </Pressable>
          )}
          
          {/* User Info */}
          {!isGuest && user && (
            <View style={styles.userInfo}>
              {user.city && (
                <View style={styles.userInfoItem}>
                  <Ionicons name="location" size={16} color={Colors.textSecondary} />
                  <Text style={styles.userInfoText}>{user.city}</Text>
                </View>
              )}
              {user.church && (
                <View style={styles.userInfoItem}>
                  <Ionicons name="business" size={16} color={Colors.textSecondary} />
                  <Text style={styles.userInfoText}>{user.church}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Prayer Statistics */}
        {!isGuest && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Estatísticas de Oração</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Ionicons name="checkmark-circle" size={32} color={Colors.success} />
                <Text style={styles.statValue}>{mockUser.answeredPrayers}</Text>
                <Text style={styles.statLabel}>Orações Respondidas</Text>
              </View>

            <View style={styles.statCard}>
              <Ionicons name="flame" size={32} color={Colors.accentYellow} />
              <Text style={styles.statValue}>{mockUser.consecutiveDays}</Text>
              <Text style={styles.statLabel}>Dias Consecutivos</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="time" size={32} color={Colors.categoryWork} />
              <Text style={styles.statValue}>{mockUser.weeklyPrayerTime}m</Text>
              <Text style={styles.statLabel}>Tempo Semanal</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="calendar" size={32} color={Colors.categoryFamily} />
              <Text style={styles.statValue}>{mockUser.monthlyPrayerTime}m</Text>
              <Text style={styles.statLabel}>Tempo Mensal</Text>
            </View>
          </View>
        </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Pressable 
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={24} color={Colors.primaryGreen} />
              </View>
              
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        {!isGuest && (
          <Pressable 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={Colors.primaryGreen} />
            <Text style={styles.logoutText}>Sair</Text>
          </Pressable>
        )}
      </ScrollView>

      {/* About Modal */}
      <Modal
        visible={showAboutModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sobre o Daniel</Text>
            <Pressable onPress={() => setShowAboutModal(false)}>
              <Ionicons name="close" size={28} color={Colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.aboutSection}>
              <Ionicons name="prism-outline" size={60} color={Colors.primaryGreen} />
              <Text style={styles.appName}>Daniel - Oração</Text>
              <Text style={styles.appVersion}>Versão 1.0.0</Text>
            </View>

            <View style={styles.aboutDescription}>
              <Text style={styles.descriptionText}>
                Daniel é seu companheiro de oração diário. Acompanhe seus pedidos, 
                ore com amigos e fortaleça sua vida espiritual.
              </Text>

              <Text style={styles.descriptionText}>
                Inspirado no profeta Daniel, que mantinha uma vida de oração constante 
                mesmo em meio às adversidades.
              </Text>

              <Text style={styles.sectionHeader}>Recursos:</Text>
              <Text style={styles.featureText}>• Acompanhe seus pedidos de oração</Text>
              <Text style={styles.featureText}>• Ore com amigos e comunidade</Text>
              <Text style={styles.featureText}>• Estudos bíblicos diários</Text>
              <Text style={styles.featureText}>• Modo foco para oração</Text>
              <Text style={styles.featureText}>• Métricas de crescimento espiritual</Text>

              <Text style={styles.copyrightText}>
                © 2025 Daniel Prayer App. Todos os direitos reservados.
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: Colors.backgroundWhite,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primaryGreen,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  loginButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.primaryGreen,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.backgroundWhite,
  },
  userInfo: {
    marginTop: 12,
    gap: 8,
  },
  userInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userInfoText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItemPressed: {
    backgroundColor: Colors.background,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondaryMintLight + "60",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primaryGreen,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  modalContent: {
    flex: 1,
  },
  aboutSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: Colors.background,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 16,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  aboutDescription: {
    padding: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 28,
    marginLeft: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 16,
  },
});

export default ProfileScreen;
