import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PrayerItem from "../components/PrayerItem";
import { mockFriendsPrayers } from "../utils/mockData";

const CommunityScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handlePrayerPress = (prayer) => {
    console.log("Prayer selected:", prayer);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Amigos</Text>
        <Pressable style={styles.addFriendButton}>
          <Ionicons name="person-add" size={24} color="#DC2626" />
        </Pressable>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Ionicons name="people" size={24} color="#DC2626" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Amigos</Text>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="heart" size={24} color="#DC2626" />
          <Text style={styles.statValue}>34</Text>
          <Text style={styles.statLabel}>Orações Feitas</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 }
        ]}
      >
        <Text style={styles.sectionTitle}>Pedidos de Oração</Text>
        
        {mockFriendsPrayers.map((prayer) => (
          <PrayerItem
            key={prayer.id}
            friendName={prayer.friendName}
            prayerRequest={prayer.prayerRequest}
            category={prayer.category}
            onPress={() => handlePrayerPress(prayer)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },
  addFriendButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
});

export default CommunityScreen;
