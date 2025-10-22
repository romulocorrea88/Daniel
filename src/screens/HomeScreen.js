import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
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

  // Use guest name or authenticated user name
  const displayName = isGuest ? "Visitante" : (user?.name || mockUser.name);
  const displayAnsweredPrayers = isGuest ? 0 : mockUser.answeredPrayers;
  const displayConsecutiveDays = isGuest ? 0 : mockUser.consecutiveDays;

  const handlePrayNow = () => {
    navigation.navigate("FocusMode");
  };

  const handlePrayerItemPress = (prayer) => {
    // Navigate to prayer detail in the future
    console.log("Prayer pressed:", prayer);
  };

  return (
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
      />

      {/* 2. Primary Action - Pray Now Button */}
      <View style={styles.actionContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.prayNowButton,
            pressed && styles.prayNowButtonPressed
          ]}
          onPress={handlePrayNow}
        >
          <View style={styles.prayNowContent}>
            <Ionicons name="prism" size={40} color={Colors.textWhite} />
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
    backgroundColor: Colors.primaryGreen,
    width: "100%",
    maxWidth: 400,
    paddingVertical: 28,
    borderRadius: 20,
    elevation: 8,
    shadowColor: Colors.primaryGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  prayNowButtonPressed: {
    backgroundColor: Colors.primaryGreenDark,
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
    color: Colors.textWhite,
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
});

export default HomeScreen;
