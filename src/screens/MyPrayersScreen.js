import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { mockMyPrayers } from "../utils/mockData";
import CreatePrayerModal from "../components/CreatePrayerModal";
import useAuthStore from "../state/authStore";

const MyPrayersScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState("all"); // all, active, answered
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { isGuest, guestPrayers } = useAuthStore();

  // Combine mock prayers with guest prayers for display
  const allPrayers = isGuest 
    ? [...guestPrayers, ...mockMyPrayers] 
    : mockMyPrayers;

  const getFilteredPrayers = () => {
    if (filter === "answered") {
      return allPrayers.filter(p => p.isAnswered);
    }
    if (filter === "active") {
      return allPrayers.filter(p => !p.isAnswered);
    }
    return allPrayers;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Trabalho: "#3B82F6",
      Saúde: "#10B981",
      Família: "#8B5CF6",
      Pessoal: "#F59E0B",
    };
    return colors[category] || "#6B7280";
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add-circle" size={32} color="#DC2626" />
        </Pressable>
      </View>

      <View style={styles.filterContainer}>
        <Pressable
          style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
            Todos
          </Text>
        </Pressable>
        
        <Pressable
          style={[styles.filterButton, filter === "active" && styles.filterButtonActive]}
          onPress={() => setFilter("active")}
        >
          <Text style={[styles.filterText, filter === "active" && styles.filterTextActive]}>
            Ativos
          </Text>
        </Pressable>
        
        <Pressable
          style={[styles.filterButton, filter === "answered" && styles.filterButtonActive]}
          onPress={() => setFilter("answered")}
        >
          <Text style={[styles.filterText, filter === "answered" && styles.filterTextActive]}>
            Respondidos
          </Text>
        </Pressable>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 }
        ]}
      >
        {getFilteredPrayers().map((prayer) => (
          <View key={prayer.id} style={styles.prayerCard}>
            <View style={styles.prayerHeader}>
              <View style={styles.prayerTitleRow}>
                <Text style={styles.prayerTitle}>{prayer.title}</Text>
                {prayer.isAnswered && (
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                )}
              </View>
              <Text style={styles.prayerDate}>
                {new Date(prayer.dateCreated).toLocaleDateString("pt-BR")}
              </Text>
            </View>

            <Text style={styles.prayerDescription}>{prayer.description}</Text>

            <View style={styles.prayerFooter}>
              <View 
                style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor(prayer.category) + "20" }
                ]}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    { color: getCategoryColor(prayer.category) }
                  ]}
                >
                  {prayer.category}
                </Text>
              </View>

              <Pressable style={styles.menuButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <CreatePrayerModal 
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  addButton: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  filterButtonActive: {
    backgroundColor: "#DC2626",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  prayerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  prayerHeader: {
    marginBottom: 12,
  },
  prayerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  prayerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    flex: 1,
  },
  prayerDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  prayerDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  prayerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  menuButton: {
    padding: 4,
  },
});

export default MyPrayersScreen;
