import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { mockUser } from "../utils/mockData";

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      id: 1,
      icon: "notifications-outline",
      title: "Notificações",
      subtitle: "Gerenciar lembretes de oração",
    },
    {
      id: 2,
      icon: "settings-outline",
      title: "Configurações",
      subtitle: "Preferências do aplicativo",
    },
    {
      id: 3,
      icon: "help-circle-outline",
      title: "Ajuda e Suporte",
      subtitle: "Precisa de ajuda?",
    },
    {
      id: 4,
      icon: "information-circle-outline",
      title: "Sobre",
      subtitle: "Versão 1.0.0",
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
            <Ionicons name="person" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userEmail}>{mockUser.email}</Text>
          
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </Pressable>
        </View>

        {/* Prayer Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estatísticas de Oração</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={32} color="#10B981" />
              <Text style={styles.statValue}>{mockUser.answeredPrayers}</Text>
              <Text style={styles.statLabel}>Orações Respondidas</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="flame" size={32} color="#F59E0B" />
              <Text style={styles.statValue}>{mockUser.consecutiveDays}</Text>
              <Text style={styles.statLabel}>Dias Consecutivos</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="time" size={32} color="#3B82F6" />
              <Text style={styles.statValue}>{mockUser.weeklyPrayerTime}m</Text>
              <Text style={styles.statLabel}>Tempo Semanal</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons name="calendar" size={32} color="#8B5CF6" />
              <Text style={styles.statValue}>{mockUser.monthlyPrayerTime}m</Text>
              <Text style={styles.statLabel}>Tempo Mensal</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Pressable 
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed
              ]}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={24} color="#DC2626" />
              </View>
              
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
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
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DC2626",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  menuItemPressed: {
    backgroundColor: "#F3F4F6",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
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
    color: "#1F2937",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DC2626",
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
  },
});

export default ProfileScreen;
