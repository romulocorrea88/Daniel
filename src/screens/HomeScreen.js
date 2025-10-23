import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import HomeMetricsPanel from "../components/HomeMetricsPanel";
import PrayerTimeChart from "../components/PrayerTimeChart";
import HapticPressable from "../components/HapticPressable";
import { mockUser, mockDevotional } from "../utils/mockData";
import useAuthStore from "../state/authStore";
import useHaptics from "../utils/useHaptics";
import Colors from "../constants/Colors";

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isGuest, user } = useAuthStore();
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const haptics = useHaptics();

  // Use guest name or authenticated user name
  const displayName = useMemo(() => 
    isGuest ? "Visitante" : (user?.name || mockUser.name),
    [isGuest, user]
  );
  const displayAnsweredPrayers = useMemo(() => 
    isGuest ? 0 : mockUser.answeredPrayers,
    [isGuest]
  );
  const displayConsecutiveDays = useMemo(() => 
    isGuest ? 0 : mockUser.consecutiveDays,
    [isGuest]
  );

  const handlePrayNow = useCallback(() => {
    haptics.medium();
    navigation.navigate("FocusMode");
  }, [navigation, haptics]);

  const handleAnsweredPrayersPress = useCallback(() => {
    haptics.light();
    navigation.navigate("HistoricoEstatisticas", { type: "answered" });
  }, [navigation, haptics]);

  const handleConsecutiveDaysPress = useCallback(() => {
    haptics.light();
    navigation.navigate("HistoricoEstatisticas", { type: "consecutive" });
  }, [haptics, navigation]);

  // Mock prayer days data - In production, fetch from backend
  const prayerDays = useMemo(() => {
    const days = [];
    const today = new Date();
    const mockTimes = [20, 15, 18, 22, 25, 12, 30];
    
    for (let i = 0; i < displayConsecutiveDays; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push({
        date: date,
        minutes: mockTimes[i % mockTimes.length] || 15
      });
    }
    return days;
  }, [displayConsecutiveDays]);

  return (
    <>
    <Animated.ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + 20 }
      ]}
      entering={FadeIn.duration(300)}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Metrics Panel - User greeting and badges */}
      <Animated.View entering={FadeInDown.delay(100).duration(400)}>
        <HomeMetricsPanel
          userName={displayName}
          answeredPrayers={displayAnsweredPrayers}
          consecutiveDays={displayConsecutiveDays}
          onAnsweredPrayersPress={handleAnsweredPrayersPress}
          onConsecutiveDaysPress={handleConsecutiveDaysPress}
        />
      </Animated.View>

      {/* 2. Primary Action - Pray Now Button */}
      <Animated.View 
        style={styles.actionContainer}
        entering={FadeInDown.delay(200).duration(400)}
      >
        <HapticPressable
          style={styles.prayNowButton}
          onPress={handlePrayNow}
          hapticType="heavy"
          scaleValue={0.97}
        >
          <View style={styles.prayNowContent}>
            <Ionicons name="prism" size={48} color="#FFFFFF" />
            <Text style={styles.prayNowText}>Orar Agora</Text>
            <Text style={styles.prayNowSubtext}>Método ACTS</Text>
          </View>
        </HapticPressable>
      </Animated.View>

      {/* 3. Prayer Time Chart */}
      <Animated.View entering={FadeInDown.delay(300).duration(400)}>
        <PrayerTimeChart />
      </Animated.View>

      {/* 4. Devotional Section */}
      <Animated.View entering={FadeInDown.delay(400).duration(400)}>
        <View style={styles.devotionalContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="book" size={24} color={Colors.textPrimary} />
          <Text style={styles.sectionTitle}>Texto Bíblico do Dia</Text>
        </View>
        
        <View style={styles.devotionalCard}>
          <Text style={styles.verseText}>{mockDevotional.verse}</Text>
          <Text style={styles.referenceText}>{mockDevotional.reference}</Text>
          
          <View style={styles.reflectionContainer}>
          <Text style={styles.reflectionText}>{mockDevotional.reflection}</Text>
          </View>
        </View>
      </View>
      </Animated.View>
    </Animated.ScrollView>

    {/* Calendar Modal */}
    <Modal
      visible={showCalendarModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowCalendarModal(false)}
    >
      <Animated.View 
        style={styles.modalContainer}
        entering={FadeIn.duration(300)}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Dias de Oração 🔥</Text>
          <HapticPressable 
            onPress={() => setShowCalendarModal(false)}
            hapticType="light"
          >
            <Ionicons name="close" size={28} color={Colors.textPrimary} />
          </HapticPressable>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.streakInfo}>
            <Ionicons name="flame" size={48} color={Colors.accentYellow} />
            <Text style={styles.streakNumber}>{displayConsecutiveDays}</Text>
            <Text style={styles.streakText}>Dias Consecutivos</Text>
            <Text style={styles.streakSubtext}>
              Continue orando para manter sua sequência!
            </Text>
          </View>

          <View style={styles.calendarSection}>
            <Text style={styles.calendarTitle}>Histórico de Oração</Text>
            {prayerDays.map((item, index) => (
              <View key={index} style={styles.calendarDay}>
                <View style={styles.calendarDayIcon}>
                  <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                </View>
                <View style={styles.calendarDayInfo}>
                  <Text style={styles.calendarDayDate}>
                    {item.date.toLocaleDateString("pt-BR", { 
                      weekday: "long", 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </Text>
                  <Text style={styles.calendarDayLabel}>
                    {index === 0 ? "Hoje" : `${index} ${index === 1 ? "dia atrás" : "dias atrás"}`}
                  </Text>
                </View>
                <View style={styles.calendarDayTime}>
                  <Ionicons name="time" size={16} color={Colors.primaryGreen} />
                  <Text style={styles.calendarDayTimeText}>{item.minutes} min</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingTop: 0,
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: "center",
  },
  prayNowButton: {
    backgroundColor: "#1B5E20",
    width: "100%",
    maxWidth: 400,
    paddingVertical: 32,
    borderRadius: 20,
    elevation: 12,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: "#2E7D32",
  },
  prayNowContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  prayNowText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  prayNowSubtext: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A5D6A7",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  devotionalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  devotionalCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  verseText: {
    fontSize: 18,
    fontStyle: "italic",
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: 8,
  },
  referenceText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryGreen,
    marginBottom: 16,
  },
  reflectionContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  reflectionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
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
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  modalContent: {
    flex: 1,
  },
  streakInfo: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 12,
  },
  streakText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginTop: 8,
  },
  streakSubtext: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginTop: 8,
    textAlign: "center",
  },
  calendarSection: {
    padding: 20,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  calendarDay: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  calendarDayIcon: {
    marginRight: 12,
  },
  calendarDayInfo: {
    flex: 1,
  },
  calendarDayDate: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
    textTransform: "capitalize",
  },
  calendarDayLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  calendarDayTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.secondaryMintLight + "30",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  calendarDayTimeText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
});

export default HomeScreen;
