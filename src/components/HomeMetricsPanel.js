import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeMetricsPanel = ({ userName, answeredPrayers, consecutiveDays }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Oi {userName}!</Text>
      
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Ionicons name="checkmark-circle" size={32} color="#DC2626" />
          <Text style={styles.metricValue}>{answeredPrayers}</Text>
          <Text style={styles.metricLabel}>Orações Respondidas</Text>
        </View>

        <View style={styles.metricCard}>
          <Ionicons name="flame" size={32} color="#F59E0B" />
          <Text style={styles.metricValue}>{consecutiveDays}</Text>
          <Text style={styles.metricLabel}>Dias Consecutivos</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
});

export default HomeMetricsPanel;
