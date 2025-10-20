import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

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
        <Ionicons name={getCategoryIcon(category)} size={24} color={Colors.primaryGreen} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.friendName}>{friendName}</Text>
        <Text style={styles.prayerRequest} numberOfLines={2}>
          {prayerRequest}
        </Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    backgroundColor: Colors.background,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondaryMintLight + "60",
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
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  prayerRequest: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  category: {
    fontSize: 12,
    color: Colors.primaryGreen,
    fontWeight: "500",
  },
});

export default PrayerItem;
