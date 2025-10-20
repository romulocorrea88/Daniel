import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PrayerItem = ({ friendName, prayerRequest, category, onPress }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Trabalho":
        return "briefcase-outline";
      case "Saúde":
        return "medkit-outline";
      case "Família":
        return "people-outline";
      default:
        return "heart-outline";
    }
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={getCategoryIcon(category)} size={24} color="#DC2626" />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.friendName}>{friendName}</Text>
        <Text style={styles.prayerRequest} numberOfLines={2}>
          {prayerRequest}
        </Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  pressed: {
    backgroundColor: "#F3F4F6",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  prayerRequest: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
    lineHeight: 20,
  },
  category: {
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "500",
  },
});

export default PrayerItem;
