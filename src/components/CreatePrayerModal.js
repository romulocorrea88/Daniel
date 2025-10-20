import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../state/authStore";

const CreatePrayerModal = ({ visible, onClose, navigation }) => {
  const { isGuest, addGuestPrayer } = useAuthStore();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Pessoal");

  const categories = ["Pessoal", "Trabalho", "Saúde", "Família", "Outros"];

  const handleCreatePrayer = () => {
    if (!title.trim()) {
      return;
    }

    const newPrayer = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category: category,
      dateCreated: new Date().toISOString(),
      isAnswered: false,
    };

    if (isGuest) {
      // Add to guest prayers
      addGuestPrayer(newPrayer);
      
      // Close modal
      onClose();
      
      // Redirect to auth screen
      setTimeout(() => {
        navigation.navigate("Auth");
      }, 300);
    } else {
      // Save to backend (implement later)
      console.log("Saving prayer to backend:", newPrayer);
      onClose();
    }

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("Pessoal");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={28} color="#1F2937" />
          </Pressable>
          <Text style={styles.headerTitle}>Novo Pedido</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Título do Pedido</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Por paz no trabalho"
                value={title}
                onChangeText={setTitle}
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                  <Pressable
                    key={cat}
                    style={[
                      styles.categoryChip,
                      category === cat && styles.categoryChipActive
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text 
                      style={[
                        styles.categoryText,
                        category === cat && styles.categoryTextActive
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição (opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Compartilhe mais detalhes sobre seu pedido..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {isGuest && (
              <View style={styles.guestNotice}>
                <Ionicons name="information-circle-outline" size={20} color="#DC2626" />
                <Text style={styles.guestNoticeText}>
                  Você será direcionado para criar sua conta após adicionar este pedido
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.createButtonPressed,
              !title.trim() && styles.createButtonDisabled
            ]}
            onPress={handleCreatePrayer}
            disabled={!title.trim()}
          >
            <Text style={styles.createButtonText}>
              {isGuest ? "Adicionar e Criar Conta" : "Adicionar Pedido"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryChipActive: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  guestNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  guestNoticeText: {
    flex: 1,
    fontSize: 13,
    color: "#991B1B",
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  createButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  createButtonPressed: {
    backgroundColor: "#B91C1C",
  },
  createButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default CreatePrayerModal;
