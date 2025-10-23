import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import usePrayerStore from "../state/prayerStore";
import Colors from "../constants/Colors";

const PrayerTimeChart = () => {
  const navigation = useNavigation();
  const { sessions, getWeeklyPrayerTime } = usePrayerStore();

  // Get last 7 days data
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dateString = date.toISOString().split("T")[0];
      
      // Get sessions for this date
      const daySessions = sessions.filter(s => s.date === dateString);
      const totalSeconds = daySessions.reduce((sum, s) => sum + s.duration, 0);
      const minutes = Math.floor(totalSeconds / 60);
      
      days.push({
        day: date.toLocaleDateString("pt-BR", { weekday: "short" }),
        minutes,
        date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      });
    }
    
    return days;
  }, [sessions]);

  const maxMinutes = Math.max(...last7Days.map(d => d.minutes), 1);
  const totalMinutes = last7Days.reduce((sum, d) => sum + d.minutes, 0);
  const avgMinutes = last7Days.length > 0 ? Math.round(totalMinutes / 7) : 0;

  const handleChartPress = () => {
    navigation.navigate("PrayerCalendar");
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handleChartPress}
      activeOpacity={0.8}
    >
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
    </TouchableOpacity>
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
