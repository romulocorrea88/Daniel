import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HomeMetricsPanel from "../components/HomeMetricsPanel";
import PrayerItem from "../components/PrayerItem";
import { mockUser, mockFriendsPrayers, mockDevotional } from "../utils/mockData";
import useAuthStore from "../state/authStore";
import Colors from "../constants/Colors";

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isGuest, user } = useAuthStore();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Use guest name or authenticated user name
  const displayName = isGuest ? "Visitante" : (user?.name || mockUser.name);
  const displayAnsweredPrayers = isGuest ? 0 : mockUser.answeredPrayers;
  const displayConsecutiveDays = isGuest ? 0 : mockUser.consecutiveDays;

  const handlePrayNow = () => {
    navigation.navigate("FocusMode");
  };

  const handlePrayerItemPress = (prayer) => {
    // Navigate to prayer detail in the future
  };

  const handleAnsweredPrayersPress = () => {
    navigation.navigate("MyPrayers", { filter: "answered" });
  };

  const handleConsecutiveDaysPress = () => {
    setShowCalendarModal(true);
  };

  // Mock prayer days data - In production, fetch from backend
  const generatePrayerDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < displayConsecutiveDays; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const prayerDays = generatePrayerDays();

  return (
    <>
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + 20 }
      ]}
    >
      {/* 1. Metrics Panel - User greeting and badges */}
      <HomeMetricsPanel
        userName={displayName}
        answeredPrayers={displayAnsweredPrayers}
        consecutiveDays={displayConsecutiveDays}
        onAnsweredPrayersPress={handleAnsweredPrayersPress}
        onConsecutiveDaysPress={handleConsecutiveDaysPress}
      />

      {/* 2. Primary Action - Pray Now Button */}
      <View style={styles.actionContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#0F4214" : "#1B5E20",
              width: "100%",
              maxWidth: 400,
              paddingVertical: 28,
              borderRadius: 20,
              elevation: 8,
              shadowColor: "#1B5E20",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
            }
          ]}
          onPress={handlePrayNow}
        >
          <View style={styles.prayNowContent}>
            <Ionicons name="prism" size={40} color="#FFFFFF" />
            <Text style={styles.prayNowText}>Orar Agora</Text>
          </View>
        </Pressable>
      </View>

      {/* 3. Secondary Content - Friends' Prayers */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="people" size={24} color={Colors.textPrimary} />
          <Text style={styles.sectionTitle}>Ore por seus amigos</Text>
        </View>
        
        {mockFriendsPrayers.slice(0, 3).map((prayer) => (
          <PrayerItem
            key={prayer.id}
            friendName={prayer.friendName}
            prayerRequest={prayer.prayerRequest}
            category={prayer.category}
            onPress={() => handlePrayerItemPress(prayer)}
          />
        ))}

        <Pressable 
          style={styles.seeAllButton}
          onPress={() => navigation.navigate("Community")}
        >
          <Text style={styles.seeAllText}>Ver todos os pedidos</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.primaryGreen} />
        </Pressable>
      </View>

      {/* 4. Devotional Section */}
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
    </ScrollView>

    {/* Calendar Modal */}
    <Modal
      visible={showCalendarModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowCalendarModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Dias de Oração 🔥</Text>
          <Pressable onPress={() => setShowCalendarModal(false)}>
            <Ionicons name="close" size={28} color={Colors.textPrimary} />
          </Pressable>
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
            {prayerDays.map((date, index) => (
              <View key={index} style={styles.calendarDay}>
                <View style={styles.calendarDayIcon}>
                  <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                </View>
                <View style={styles.calendarDayInfo}>
                  <Text style={styles.calendarDayDate}>
                    {date.toLocaleDateString("pt-BR", { 
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
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
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
    paddingVertical: 28,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#1B5E20",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  prayNowButtonPressed: {
    backgroundColor: "#0F4214",
    transform: [{ scale: 0.98 }],
  },
  prayNowContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  prayNowText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  sectionContainer: {
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
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  devotionalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
});

export default HomeScreen;
