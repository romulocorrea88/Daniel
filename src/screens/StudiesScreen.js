import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const StudiesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const biblicalStudies = [
    {
      id: 1,
      title: "O Poder da Oração",
      description: "Explore os ensinamentos bíblicos sobre a importância da oração",
      duration: "15 min",
      icon: "book-outline",
    },
    {
      id: 2,
      title: "Fé e Perseverança",
      description: "Como manter a fé em tempos difíceis",
      duration: "12 min",
      icon: "flame-outline",
    },
    {
      id: 3,
      title: "Gratidão em Oração",
      description: "A importância de agradecer em todas as circunstâncias",
      duration: "10 min",
      icon: "heart-outline",
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estudos Bíblicos</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 20 }
        ]}
      >
        <View style={styles.featuredCard}>
          <Ionicons name="star" size={32} color={Colors.accentYellow} />
          <Text style={styles.featuredTitle}>Estudo em Destaque</Text>
          <Text style={styles.featuredText}>
            Descubra como Daniel manteve sua vida de oração mesmo em meio às adversidades
          </Text>
          <Pressable style={styles.featuredButton}>
            <Text style={styles.featuredButtonText}>Começar Estudo</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Estudos Recentes</Text>

        {biblicalStudies.map((study) => (
          <Pressable 
            key={study.id}
            style={({ pressed }) => [
              styles.studyCard,
              pressed && styles.studyCardPressed
            ]}
          >
            <View style={styles.studyIconContainer}>
              <Ionicons name={study.icon} size={28} color={Colors.primaryGreen} />
            </View>
            
            <View style={styles.studyContent}>
              <Text style={styles.studyTitle}>{study.title}</Text>
              <Text style={styles.studyDescription}>{study.description}</Text>
              
              <View style={styles.studyFooter}>
                <View style={styles.durationBadge}>
                  <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.durationText}>{study.duration}</Text>
                </View>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  featuredCard: {
    backgroundColor: "#FEF3C7",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  featuredText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  featuredButton: {
    backgroundColor: Colors.primaryGreen,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  featuredButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.backgroundWhite,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  studyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  studyCardPressed: {
    backgroundColor: Colors.background,
  },
  studyIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "Colors.secondaryMintLight + "60"",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  studyContent: {
    flex: 1,
  },
  studyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  studyDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  studyFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default StudiesScreen;
