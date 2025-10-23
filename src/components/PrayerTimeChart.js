import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const PrayerTimeChart = () => {
  // Mock data - In production, fetch from backend
  const last7Days = [
    { day: "Dom", minutes: 15, date: "20/10" },
    { day: "Seg", minutes: 22, date: "21/10" },
    { day: "Ter", minutes: 18, date: "22/10" },
    { day: "Qua", minutes: 30, date: "23/10" },
    { day: "Qui", minutes: 12, date: "24/10" },
    { day: "Sex", minutes: 25, date: "25/10" },
    { day: "Sáb", minutes: 20, date: "26/10" },
  ];

  const maxMinutes = Math.max(...last7Days.map(d => d.minutes));
  const totalMinutes = last7Days.reduce((sum, d) => sum + d.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / 7);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="bar-chart" size={24} color={Colors.primaryGreen} />
          <Text style={styles.title}>Tempo de Oração</Text>
        </View>
        <View style={styles.avgBadge}>
          <Text style={styles.avgText}>{avgMinutes} min/dia</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {last7Days.map((item, index) => {
            const heightPercentage = (item.minutes / maxMinutes) * 100;
            const isToday = index === last7Days.length - 1;
            
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  {item.minutes > 0 && (
                    <Text style={styles.barValue}>{item.minutes}</Text>
                  )}
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${Math.max(heightPercentage, 5)}%`,
                        backgroundColor: isToday 
                          ? Colors.primaryGreen 
                          : item.minutes > 0 
                            ? Colors.secondaryMint 
                            : Colors.border
                      }
                    ]}
                  />
                </View>
                <Text style={[
                  styles.barLabel,
                  isToday && styles.barLabelToday
                ]}>
                  {item.day}
                </Text>
                <Text style={styles.barDate}>{item.date}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.statBox}>
          <Ionicons name="time" size={20} color={Colors.primaryGreen} />
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{totalMinutes} min</Text>
            <Text style={styles.statLabel}>Esta semana</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="trending-up" size={20} color={Colors.accentYellow} />
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{Math.round(totalMinutes / 60)}h {totalMinutes % 60}m</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  avgBadge: {
    backgroundColor: Colors.secondaryMintLight + "40",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  avgText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 160,
    paddingBottom: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  barWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 8,
  },
  barValue: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginTop: 8,
  },
  barLabelToday: {
    color: Colors.primaryGreen,
  },
  barDate: {
    fontSize: 10,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default PrayerTimeChart;
