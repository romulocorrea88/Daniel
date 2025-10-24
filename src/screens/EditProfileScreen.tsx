import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import HapticPressable from "../components/HapticPressable";
import useAuthStore from "../state/authStore";
import useHaptics from "../utils/useHaptics";
import Colors from "../constants/Colors";

const EditProfileScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const { user, updateUser, updateUserPhoto } = useAuthStore();
  
  const [name, setName] = useState(user?.name || "");
  const [city, setCity] = useState(user?.city || "");
  const [church, setChurch] = useState(user?.church || "");
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    try {
      haptics.light();
      
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de permissão para acessar suas fotos"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        updateUserPhoto(result.assets[0].uri);
        haptics.success();
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
    }
  };

  const handleSave = () => {
    setLoading(true);
    haptics.medium();

    // Simulate API call
    setTimeout(() => {
      updateUser({
        name: name.trim(),
        city: city.trim(),
        church: church.trim(),
      });

      setLoading(false);
      haptics.success();
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    }, 500);
  };

  const isFormValid = () => {
    return name.trim().length > 0;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <HapticPressable
          onPress={() => navigation.goBack()}
          hapticType="light"
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.textPrimary} />
        </HapticPressable>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Photo */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            {user?.photoUrl ? (
              <Image source={{ uri: user.photoUrl }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person" size={48} color={Colors.backgroundWhite} />
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.changePhotoButton} onPress={handlePickImage}>
            <Ionicons name="camera" size={20} color={Colors.primaryGreen} />
            <Text style={styles.changePhotoText}>Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome completo *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={Colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor={Colors.textTertiary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputContainer, styles.inputDisabled]}>
              <Ionicons name="mail-outline" size={20} color={Colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={user?.email}
                editable={false}
              />
            </View>
            <Text style={styles.hint}>O email não pode ser alterado</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cidade</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={20} color={Colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Sua cidade"
                placeholderTextColor={Colors.textTertiary}
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Igreja</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color={Colors.textTertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome da sua igreja"
                placeholderTextColor={Colors.textTertiary}
                value={church}
                onChangeText={setChurch}
                autoCapitalize="words"
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, (!isFormValid() || loading) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isFormValid() || loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  photoContainer: {
    marginBottom: 16,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.border,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primaryGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  inputDisabled: {
    backgroundColor: Colors.background,
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
  hint: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  saveButton: {
    backgroundColor: Colors.primaryGreen,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
});

export default EditProfileScreen;
