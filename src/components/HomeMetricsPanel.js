import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

const HomeMetricsPanel = ({ 
  userName, 
  answeredPrayers, 
  consecutiveDays, 
  onAnsweredPrayersPress,
  onConsecutiveDaysPress 
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.greeting}>Oi {userName}!</Text>
      
      <View style={styles.metricsContainer}>
        <TouchableOpacity 
          style={styles.metricCard}
          onPress={onAnsweredPrayersPress}
          activeOpacity={0.7}
        >
          <Text style={styles.metricValue}>{answeredPrayers}</Text>
          <Text style={styles.metricLabel}>Orações Respondidas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.metricCard}
          onPress={onConsecutiveDaysPress}
          activeOpacity={0.7}
        >
          <Text style={styles.metricValue}>{consecutiveDays}</Text>
          <Text style={styles.metricLabel}>Dias Consecutivos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: 20,
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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryGreen,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#BDBDBD",
    textAlign: "center",
    marginTop: 4,
  },
});

export default HomeMetricsPanel;
