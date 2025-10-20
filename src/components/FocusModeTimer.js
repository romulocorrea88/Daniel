import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FocusModeTimer = ({ navigation }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const handleFinish = () => {
    setIsActive(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="#FFFFFF" />
      </Pressable>

      <View style={styles.contentContainer}>
        <Ionicons name="prism-outline" size={60} color="#FFFFFF" style={styles.icon} />
        
        <Text style={styles.title}>Modo Oração</Text>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>

        <Text style={styles.subtitle}>
          {isActive ? "Orando..." : "Toque para iniciar"}
        </Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.buttonPrimary,
              pressed && styles.buttonPressed
            ]}
            onPress={handleStartPause}
          >
            <Ionicons 
              name={isActive ? "pause" : "play"} 
              size={32} 
              color="#1F2937" 
            />
          </Pressable>

          {seconds > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.buttonSecondary,
                pressed && styles.buttonPressed
              ]}
              onPress={handleReset}
            >
              <Ionicons name="refresh" size={28} color="#FFFFFF" />
            </Pressable>
          )}
        </View>

        {seconds > 0 && (
          <Pressable
            style={({ pressed }) => [
              styles.finishButton,
              pressed && styles.buttonPressed
            ]}
            onPress={handleFinish}
          >
            <Text style={styles.finishButtonText}>Finalizar Oração</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 40,
  },
  timerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 40,
    paddingVertical: 24,
    borderRadius: 20,
    marginBottom: 16,
  },
  timerText: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontVariant: ["tabular-nums"],
  },
  subtitle: {
    fontSize: 18,
    color: "#D1D5DB",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  buttonPrimary: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSecondary: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  finishButton: {
    marginTop: 40,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#DC2626",
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default FocusModeTimer;
