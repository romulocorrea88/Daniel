import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Linking, Modal, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import HapticPressable from "../components/HapticPressable";
import useAuthStore from "../state/authStore";
import useHaptics from "../utils/useHaptics";
import Colors from "../constants/Colors";

const SettingsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const { 
    settings, 
    updateTheme, 
    updateLanguage, 
    addNotification, 
    removeNotification, 
    toggleNotification,
    updateNotificationTime 
  } = useAuthStore();
  
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [editingNotificationId, setEditingNotificationId] = useState<string | null>(null);

  const themes = [
    { id: "light", name: "Claro", icon: "sunny" },
    { id: "dark", name: "Escuro", icon: "moon" },
    { id: "auto", name: "Automático", icon: "contrast" },
  ];

  const languages = [
    { id: "pt", name: "Português", flag: "🇧🇷" },
    { id: "en", name: "English", flag: "🇺🇸" },
    { id: "es", name: "Español", flag: "🇪🇸" },
  ];

  const handleAddNotification = () => {
    haptics.light();
    setEditingNotificationId(null);
    setSelectedTime(new Date());
    setShowTimePicker(true);
  };

  const handleEditNotification = (id: string, time: string) => {
    haptics.light();
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    setSelectedTime(date);
    setEditingNotificationId(id);
    setShowTimePicker(true);
  };

  const handleTimeConfirm = () => {
    const hours = selectedTime.getHours().toString().padStart(2, "0");
    const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}`;

    if (editingNotificationId) {
      updateNotificationTime(editingNotificationId, timeString);
    } else {
      addNotification(timeString);
    }

    haptics.success();
    setShowTimePicker(false);
    setEditingNotificationId(null);
  };

  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      "Remover lembrete",
      "Deseja remover este lembrete de oração?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            removeNotification(id);
            haptics.success();
          },
        },
      ]
    );
  };

  const handleContribute = async () => {
    haptics.medium();
    const url = "https://github.com/sponsors";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
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
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Lembretes de Oração</Text>
          <Text style={styles.sectionDescription}>
            Configure horários para receber lembretes diários de oração
          </Text>

          {settings.notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off-outline" size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyStateText}>Nenhum lembrete configurado</Text>
            </View>
          ) : (
            <View style={styles.notificationsList}>
              {settings.notifications.map((notification) => (
                <View key={notification.id} style={styles.notificationItem}>
                  <TouchableOpacity
                    style={styles.notificationTime}
                    onPress={() => handleEditNotification(notification.id, notification.time)}
                  >
                    <Ionicons name="time-outline" size={24} color={Colors.primaryGreen} />
                    <Text style={styles.notificationTimeText}>{notification.time}</Text>
                  </TouchableOpacity>
                  
                  <Switch
                    value={notification.enabled}
                    onValueChange={() => toggleNotification(notification.id)}
                    trackColor={{ false: Colors.border, true: Colors.primaryGreen }}
                    thumbColor={Colors.backgroundWhite}
                  />
                  
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteNotification(notification.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color={Colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.addButton} onPress={handleAddNotification}>
            <Ionicons name="add-circle-outline" size={24} color={Colors.primaryGreen} />
            <Text style={styles.addButtonText}>Adicionar lembrete</Text>
          </TouchableOpacity>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Tema do Aplicativo</Text>
          <View style={styles.optionsGrid}>
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.optionCard,
                  settings.theme === theme.id && styles.optionCardActive,
                ]}
                onPress={() => {
                  haptics.light();
                  updateTheme(theme.id as any);
                }}
              >
                <Ionicons
                  name={theme.icon as any}
                  size={32}
                  color={settings.theme === theme.id ? Colors.primaryGreen : Colors.textSecondary}
                />
                <Text
                  style={[
                    styles.optionCardText,
                    settings.theme === theme.id && styles.optionCardTextActive,
                  ]}
                >
                  {theme.name}
                </Text>
                {settings.theme === theme.id && (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.primaryGreen} style={styles.optionCheck} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          {settings.theme === "dark" && (
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color={Colors.primaryGreen} />
              <Text style={styles.infoText}>Modo escuro em desenvolvimento</Text>
            </View>
          )}
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Idioma</Text>
          <View style={styles.languageOptions}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageOption,
                  settings.language === language.id && styles.languageOptionActive,
                ]}
                onPress={() => {
                  haptics.light();
                  updateLanguage(language.id as any);
                }}
              >
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <Text
                  style={[
                    styles.languageName,
                    settings.language === language.id && styles.languageNameActive,
                  ]}
                >
                  {language.name}
                </Text>
                {settings.language === language.id && (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.primaryGreen} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          {settings.language !== "pt" && (
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color={Colors.primaryGreen} />
              <Text style={styles.infoText}>Tradução em desenvolvimento</Text>
            </View>
          )}
        </View>

        {/* Contribute Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.contributeCard} onPress={handleContribute}>
            <View style={styles.contributeIcon}>
              <Text style={styles.contributeEmoji}>🤝</Text>
            </View>
            <View style={styles.contributeContent}>
              <Text style={styles.contributeTitle}>Contribua com o projeto</Text>
              <Text style={styles.contributeDescription}>
                Ajude-nos a manter o app gratuito e melhorá-lo cada vez mais
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color={Colors.backgroundWhite} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <Modal
          transparent
          animationType="slide"
          visible={showTimePicker}
          onRequestClose={() => setShowTimePicker(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowTimePicker(false)}
          >
            <View style={styles.timePickerModal}>
              <View style={styles.timePickerHeader}>
                <Text style={styles.timePickerTitle}>
                  {editingNotificationId ? "Editar horário" : "Novo lembrete"}
                </Text>
              </View>
              
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_event, date) => {
                  if (date) setSelectedTime(date);
                }}
                style={styles.timePicker}
              />

              <View style={styles.timePickerActions}>
                <TouchableOpacity
                  style={styles.timePickerButton}
                  onPress={() => setShowTimePicker(false)}
                >
                  <Text style={styles.timePickerButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.timePickerButton, styles.timePickerButtonPrimary]}
                  onPress={handleTimeConfirm}
                >
                  <Text style={[styles.timePickerButtonText, styles.timePickerButtonTextPrimary]}>
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  notificationsList: {
    gap: 12,
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  notificationTime: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationTimeText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primaryGreen,
    borderStyle: "dashed",
    paddingVertical: 16,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  optionsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    position: "relative",
  },
  optionCardActive: {
    borderColor: Colors.primaryGreen,
    backgroundColor: Colors.secondaryMintLight + "20",
  },
  optionCardText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  optionCardTextActive: {
    color: Colors.primaryGreen,
  },
  optionCheck: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.secondaryMintLight + "30",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.primaryGreen,
    fontWeight: "600",
  },
  languageOptions: {
    gap: 12,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  languageOptionActive: {
    borderColor: Colors.primaryGreen,
    backgroundColor: Colors.secondaryMintLight + "20",
  },
  languageFlag: {
    fontSize: 32,
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  languageNameActive: {
    color: Colors.primaryGreen,
  },
  contributeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryGreen,
    borderRadius: 16,
    padding: 24,
    gap: 16,
    borderWidth: 2,
    borderColor: Colors.primaryGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  contributeIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.backgroundWhite + "30",
    justifyContent: "center",
    alignItems: "center",
  },
  contributeEmoji: {
    fontSize: 40,
  },
  contributeContent: {
    flex: 1,
  },
  contributeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
    marginBottom: 4,
  },
  contributeDescription: {
    fontSize: 14,
    color: Colors.backgroundWhite,
    lineHeight: 20,
    opacity: 0.95,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  timePickerModal: {
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  timePickerHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  timePicker: {
    width: "100%",
    height: 200,
  },
  timePickerActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  timePickerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  timePickerButtonPrimary: {
    backgroundColor: Colors.primaryGreen,
  },
  timePickerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  timePickerButtonTextPrimary: {
    color: Colors.backgroundWhite,
  },
});

export default SettingsScreen;
