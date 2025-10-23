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
          <Ionicons name="checkmark-circle" size={32} color={Colors.success} />
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
          <Ionicons name="flame" size={32} color={Colors.accentYellow} />
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
  metricCardPressed: {
    backgroundColor: Colors.secondaryMintLight + "60",
    transform: [{ scale: 0.98 }],
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
