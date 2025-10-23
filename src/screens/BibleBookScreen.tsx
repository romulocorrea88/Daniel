import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HapticPressable from "../components/HapticPressable";
import Colors from "../constants/Colors";

const BibleBookScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { bookId, bookName, chapters } = route.params;

  const chapterNumbers = Array.from({ length: chapters }, (_, i) => i + 1);

  const handleChapterPress = (chapter: number) => {
    navigation.navigate("BibleReader", { bookId, bookName, chapter });
  };

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
          <Text style={styles.headerTitle}>{bookName}</Text>
          <Text style={styles.headerSubtitle}>{chapters} capítulos</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chaptersGrid}>
          {chapterNumbers.map((chapter) => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterButton}
              onPress={() => handleChapterPress(chapter)}
            >
              <Text style={styles.chapterNumber}>{chapter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  chaptersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chapterButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.primaryGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  chapterNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryGreen,
  },
});

export default BibleBookScreen;
