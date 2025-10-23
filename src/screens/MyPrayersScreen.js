import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { mockMyPrayers } from "../utils/mockData";
import CreatePrayerModal from "../components/CreatePrayerModal";
import useAuthStore from "../state/authStore";
import Colors from "../constants/Colors";

const MyPrayersScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const initialFilter = route?.params?.filter || "all";
  const [filter, setFilter] = useState(initialFilter);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const { isGuest, guestPrayers } = useAuthStore();

  useEffect(() => {
    if (route?.params?.filter) {
      setFilter(route.params.filter);
    }
  }, [route?.params?.filter]);

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
      Trabalho: Colors.categoryWork,
      Saúde: Colors.success,
      Família: Colors.categoryFamily,
      Pessoal: Colors.accentYellow,
    };
    return colors[category] || Colors.textSecondary;
  };

  const handlePrayerAction = (prayer) => {
    setSelectedPrayer(prayer);
    setShowActionModal(true);
  };

  const handleMarkAsAnswered = () => {
    Alert.alert(
      "Oração Respondida! 🙏",
      "Sua oração foi marcada como respondida. Glória a Deus!",
      [{ text: "Amém", style: "default" }]
    );
    setShowActionModal(false);
    // In production: Update prayer status in backend
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Pedido",
      "Tem certeza que deseja excluir este pedido de oração?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setShowActionModal(false);
            // In production: Delete from backend
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add-circle" size={32} color={Colors.primaryGreen} />
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
                  <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
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

              <Pressable 
                style={styles.menuButton}
                onPress={() => handlePrayerAction(prayer)}
              >
                <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textSecondary} />
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

      {/* Action Modal */}
      <Modal
        visible={showActionModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowActionModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowActionModal(false)}
        >
          <View style={styles.actionModal}>
            <Text style={styles.actionModalTitle}>
              {selectedPrayer?.title}
            </Text>

            {!selectedPrayer?.isAnswered && (
              <Pressable
                style={styles.actionButton}
                onPress={handleMarkAsAnswered}
              >
                <Ionicons name="checkmark-circle-outline" size={24} color={Colors.success} />
                <Text style={styles.actionButtonText}>Marcar como Respondida</Text>
              </Pressable>
            )}

            <Pressable
              style={styles.actionButton}
              onPress={() => {
                setShowActionModal(false);
                // Edit functionality
              }}
            >
              <Ionicons name="create-outline" size={24} color={Colors.primaryGreen} />
              <Text style={styles.actionButtonText}>Editar</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={24} color={Colors.error} />
              <Text style={[styles.actionButtonText, { color: Colors.error }]}>Excluir</Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setShowActionModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  addButton: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: Colors.backgroundWhite,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  filterButtonActive: {
    backgroundColor: Colors.primaryGreen,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.backgroundWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  prayerCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.textPrimary,
    flex: 1,
  },
  prayerDate: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  prayerDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  actionModal: {
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  actionModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.background,
    marginBottom: 12,
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  cancelButton: {
    backgroundColor: Colors.backgroundWhite,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
    textAlign: "center",
    flex: 1,
  },
});

export default MyPrayersScreen;
