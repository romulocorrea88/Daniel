import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HapticPressable from "../components/HapticPressable";
import usePrayerStore from "../state/prayerStore";
import Colors from "../constants/Colors";

const DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const PrayerCalendarScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { sessions, getDaysWithPrayer, getPrayerSessionsByDate, getTotalPrayerTime } = usePrayerStore();
  
  const daysWithPrayer = useMemo(() => getDaysWithPrayer(), [sessions]);

  // Get calendar data for current month
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: Array<{ date: number | null; dateString: string | null; hasPrayer: boolean }> = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, dateString: null, hasPrayer: false });
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateString = dateObj.toISOString().split("T")[0];
      const hasPrayer = daysWithPrayer.includes(dateString);
      
      days.push({ date: day, dateString, hasPrayer });
    }
    
    return days;
  }, [currentMonth, daysWithPrayer]);

  // Get sessions count for current month
  const monthSessions = useMemo(() => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getFullYear() === currentMonth.getFullYear() &&
        sessionDate.getMonth() === currentMonth.getMonth()
      );
    });
  }, [sessions, currentMonth]);

  const monthTotalTime = useMemo(() => {
    return monthSessions.reduce((total, session) => total + session.duration, 0);
  }, [monthSessions]);

  const activeDaysInMonth = useMemo(() => {
    const uniqueDates = new Set(monthSessions.map(s => s.date));
    return uniqueDates.size;
  }, [monthSessions]);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayPress = (dateString: string) => {
    const daySessions = getPrayerSessionsByDate(dateString);
    if (daySessions.length > 0) {
      setSelectedDay(dateString);
      setShowDetailModal(true);
    }
  };

  const selectedDaySessions = selectedDay ? getPrayerSessionsByDate(selectedDay) : [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <HapticPressable 
          onPress={() => navigation.goBack()}
          hapticType="light"
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.backgroundWhite} />
        </HapticPressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Calendário de Oração</Text>
          <Text style={styles.headerSubtitle}>Acompanhe sua jornada espiritual</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={28} color={Colors.primaryGreen} />
            <Text style={styles.statValue}>{monthSessions.length}</Text>
            <Text style={styles.statLabel}>Sessões</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Ionicons name="time" size={28} color={Colors.primaryGreen} />
            <Text style={styles.statValue}>{Math.floor(monthTotalTime / 60)}m</Text>
            <Text style={styles.statLabel}>Tempo Total</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Ionicons name="flame" size={28} color={Colors.accentYellow} />
            <Text style={styles.statValue}>{activeDaysInMonth}</Text>
            <Text style={styles.statLabel}>Dias Ativos</Text>
          </View>
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.primaryGreen} />
          </TouchableOpacity>
          
          <Text style={styles.monthTitle}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          
          <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color={Colors.primaryGreen} />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendar}>
          {/* Day headers */}
          <View style={styles.weekDays}>
            {DAYS_OF_WEEK.map((day) => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {calendarData.map((item, index) => {
              if (item.date === null) {
                return <View key={`empty-${index}`} style={styles.emptyDay} />;
              }

              const isToday = item.dateString === new Date().toISOString().split("T")[0];

              return (
                <TouchableOpacity
                  key={item.dateString}
                  style={[
                    styles.dayCell,
                    item.hasPrayer && styles.dayCellWithPrayer,
                    isToday && styles.dayCellToday,
                  ]}
                  onPress={() => item.hasPrayer && handleDayPress(item.dateString!)}
                  disabled={!item.hasPrayer}
                >
                  <Text
                    style={[
                      styles.dayText,
                      item.hasPrayer && styles.dayTextWithPrayer,
                      isToday && styles.dayTextToday,
                    ]}
                  >
                    {item.date}
                  </Text>
                  {item.hasPrayer && (
                    <View style={styles.prayerDot} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: Colors.primaryGreen }]} />
            <Text style={styles.legendText}>Dia com oração</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { borderWidth: 2, borderColor: Colors.primaryGreen }]} />
            <Text style={styles.legendText}>Hoje</Text>
          </View>
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedDay && new Date(selectedDay).toLocaleDateString("pt-BR", { 
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </Text>
            <TouchableOpacity 
              onPress={() => setShowDetailModal(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={28} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedDaySessions.map((session) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                  <Ionicons name="time" size={20} color={Colors.primaryGreen} />
                  <Text style={styles.sessionTime}>
                    {Math.floor(session.duration / 60)} minutos
                  </Text>
                </View>

                {session.notes.adoration && (
                  <View style={styles.noteSection}>
                    <Text style={styles.noteTitle}>🙌 Adoração</Text>
                    <Text style={styles.noteText}>{session.notes.adoration}</Text>
                  </View>
                )}

                {session.notes.confession && (
                  <View style={styles.noteSection}>
                    <Text style={styles.noteTitle}>💔 Confissão</Text>
                    <Text style={styles.noteText}>{session.notes.confession}</Text>
                  </View>
                )}

                {session.notes.thanksgiving && (
                  <View style={styles.noteSection}>
                    <Text style={styles.noteTitle}>🙏 Gratidão</Text>
                    <Text style={styles.noteText}>{session.notes.thanksgiving}</Text>
                  </View>
                )}

                {session.notes.supplication && (
                  <View style={styles.noteSection}>
                    <Text style={styles.noteTitle}>✋ Súplica</Text>
                    <Text style={styles.noteText}>{session.notes.supplication}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryGreen,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.secondaryMintLight,
    marginTop: 2,
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  scrollContent: {
    padding: 20,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  calendar: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  weekDays: {
    flexDirection: "row",
    marginBottom: 12,
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptyDay: {
    width: "14.28%",
    aspectRatio: 1,
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
  },
  dayCellWithPrayer: {
    backgroundColor: Colors.primaryGreen,
  },
  dayCellToday: {
    borderWidth: 2,
    borderColor: Colors.primaryGreen,
    backgroundColor: "transparent",
  },
  dayText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  dayTextWithPrayer: {
    color: Colors.backgroundWhite,
    fontWeight: "bold",
  },
  dayTextToday: {
    color: Colors.primaryGreen,
    fontWeight: "bold",
  },
  prayerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.backgroundWhite,
    marginTop: 2,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  closeButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    textTransform: "capitalize",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  sessionCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sessionTime: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  noteSection: {
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default PrayerCalendarScreen;
