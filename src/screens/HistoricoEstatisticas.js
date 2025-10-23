import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HapticPressable from "../components/HapticPressable";
import Colors from "../constants/Colors";

const HistoricoEstatisticas = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { type } = route.params || {};

  const isAnsweredPrayers = type === "answered";

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
        <Text style={styles.headerTitle}>
          {isAnsweredPrayers ? "Orações Respondidas" : "Dias Consecutivos"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsCard}>
          <Ionicons 
            name={isAnsweredPrayers ? "checkmark-circle" : "flame"} 
            size={64} 
            color={Colors.primaryGreen} 
          />
          <Text style={styles.statsNumber}>
            {isAnsweredPrayers ? "12" : "7"}
          </Text>
          <Text style={styles.statsLabel}>
            {isAnsweredPrayers ? "Orações Respondidas" : "Dias Consecutivos"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico</Text>
          <Text style={styles.sectionDescription}>
            {isAnsweredPrayers 
              ? "Veja todas as orações que foram respondidas ao longo do tempo."
              : "Acompanhe sua sequência de dias orando consecutivamente."
            }
          </Text>
        </View>

        {/* Placeholder for future content */}
        <View style={styles.placeholderContent}>
          <Ionicons name="time-outline" size={48} color={Colors.textTertiary} />
          <Text style={styles.placeholderText}>
            Histórico detalhado em breve
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  statsCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    marginBottom: 24,
  },
  statsNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 16,
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
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
  },
  placeholderContent: {
    alignItems: "center",
    paddingVertical: 48,
  },
  placeholderText: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginTop: 12,
  },
});

export default HistoricoEstatisticas;
