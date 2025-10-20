import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Main");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="prism-outline" size={80} color="#DC2626" />
        <Text style={styles.logoText}>Daniel</Text>
        <Text style={styles.tagline}>orando sempre</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#DC2626",
    marginTop: 16,
  },
  tagline: {
    fontSize: 18,
    color: "#000000",
    marginTop: 8,
  },
});

export default SplashScreen;
