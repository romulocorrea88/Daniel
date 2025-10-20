import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const HomeMetricsPanel = ({ userName, answeredPrayers, consecutiveDays }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Oi {userName}!</Text>
      
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Ionicons name="checkmark-circle" size={32} color={Colors.success} />
          <Text style={styles.metricValue}>{answeredPrayers}</Text>
          <Text style={styles.metricLabel}>Orações Respondidas</Text>
        </View>

        <View style={styles.metricCard}>
          <Ionicons name="flame" size={32} color={Colors.accentYellow} />
          <Text style={styles.metricValue}>{consecutiveDays}</Text>
          <Text style={styles.metricLabel}>Dias Consecutivos</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.secondaryMintLight + "40",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
});

export default HomeMetricsPanel;
