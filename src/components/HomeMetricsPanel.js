import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const HomeMetricsPanel = ({ 
  userName, 
  answeredPrayers, 
  consecutiveDays, 
  onAnsweredPrayersPress,
  onConsecutiveDaysPress 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Oi {userName}!</Text>
      
      <View style={styles.metricsContainer}>
        <Pressable 
          style={({ pressed }) => [
            styles.metricCard,
            pressed && styles.metricCardPressed
          ]}
          onPress={onAnsweredPrayersPress}
        >
          <Ionicons name="checkmark-circle" size={36} color="#FFFFFF" />
          <Text style={styles.metricValue}>{answeredPrayers}</Text>
          <Text style={styles.metricLabel}>Orações Respondidas</Text>
        </Pressable>

        <Pressable 
          style={({ pressed }) => [
            styles.metricCard,
            pressed && styles.metricCardPressed
          ]}
          onPress={onConsecutiveDaysPress}
        >
          <Ionicons name="flame" size={36} color="#FFD54F" />
          <Text style={styles.metricValue}>{consecutiveDays}</Text>
          <Text style={styles.metricLabel}>Dias Consecutivos</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 28,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#2E7D32",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#388E3C",
    elevation: 4,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  metricCardPressed: {
    backgroundColor: "#1B5E20",
    transform: [{ scale: 0.96 }],
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A5D6A7",
    textAlign: "center",
    marginTop: 6,
  },
});

export default HomeMetricsPanel;
