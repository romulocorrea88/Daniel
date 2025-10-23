import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, LayoutAnimation, UIManager, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import Animated, { FadeIn, FadeInDown, SlideInRight, SlideOutLeft, FadeOut } from "react-native-reanimated";
import HapticPressable from "../components/HapticPressable";
import useHaptics from "../utils/useHaptics";
import Colors from "../constants/Colors";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ACTS_STEPS = [
  {
    id: "adoration",
    title: "Adoração",
    subtitle: "Louve a Deus por quem Ele é",
    icon: "star",
    color: "#FFD700",
    description: "Reconheça os atributos de Deus: Sua bondade, poder, amor e majestade.",
    placeholder: "Ex: Senhor, Tu és maravilhoso, fiel e digno de toda adoração..."
  },
  {
    id: "confession",
    title: "Confissão",
    subtitle: "Peça perdão e reconheça suas falhas",
    icon: "heart-dislike",
    color: "#EF5350",
    description: "Confesse seus pecados e peça perdão, buscando purificação.",
    placeholder: "Ex: Pai, confesso que falhei em... Perdoa-me e purifica meu coração..."
  },
  {
    id: "thanksgiving",
    title: "Ação de Graças",
    subtitle: "Agradeça pelas bênçãos recebidas",
    icon: "gift",
    color: "#4CAF50",
    description: "Expresse gratidão por todas as bênçãos, grandes e pequenas.",
    placeholder: "Ex: Obrigado Senhor por minha família, saúde, trabalho..."
  },
  {
    id: "supplication",
    title: "Súplica",
    subtitle: "Apresente seus pedidos a Deus",
    icon: "hand-right",
    color: "#2196F3",
    description: "Traga seus pedidos pessoais e interceda por outras pessoas.",
    placeholder: "Ex: Senhor, peço por sabedoria em..., oro por meus amigos..."
  }
];

const PrayerModeScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [notes, setNotes] = useState({
    adoration: "",
    confession: "",
    thanksgiving: "",
    supplication: ""
  });
  
  const haptics = useHaptics();

  useEffect(() => {
    activateKeepAwakeAsync();
    return () => {
      deactivateKeepAwake();
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (currentStep > 0 && !isActive) {
      setIsActive(true);
    }
  }, [currentStep]);

  const formatTime = useCallback((totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleNext = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    if (currentStep < ACTS_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      haptics.medium();
    } else {
      handleFinish();
    }
  }, [currentStep, haptics]);

  const handlePrevious = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      haptics.light();
    }
  }, [currentStep, haptics]);

  const handleFinish = useCallback(() => {
    setIsActive(false);
    haptics.success();
    
    const prayerData = {
      duration: seconds,
      date: new Date().toISOString(),
      notes: notes
    };
    
    navigation.goBack();
  }, [seconds, notes, navigation, haptics]);

  const handleClose = useCallback(() => {
    setIsActive(false);
    haptics.light();
    navigation.goBack();
  }, [navigation, haptics]);

  const handleNoteChange = useCallback((stepId, text) => {
    setNotes(prev => ({ ...prev, [stepId]: text }));
  }, []);

  const currentStepData = useMemo(() => ACTS_STEPS[currentStep], [currentStep]);
  const progress = useMemo(() => ((currentStep + 1) / ACTS_STEPS.length) * 100, [currentStep]);

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
    >
      {/* Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.delay(100).duration(400)}
      >
        <HapticPressable onPress={handleClose} style={styles.closeButton} hapticType="light">
          <Ionicons name="close" size={28} color={Colors.backgroundWhite} />
        </HapticPressable>
        
        <View style={styles.timerDisplay}>
          <Ionicons name="time-outline" size={20} color={Colors.backgroundWhite} />
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      </Animated.View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View 
          style={[styles.progressBar, { width: `${progress}%` }]}
          entering={FadeIn.duration(300)}
        />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          key={currentStep}
          entering={SlideInRight.duration(300).springify()}
          exiting={SlideOutLeft.duration(200)}
          style={styles.stepIndicator}
        >
          <View style={[styles.iconContainer, { backgroundColor: currentStepData.color + "20" }]}>
            <Ionicons name={currentStepData.icon} size={48} color={currentStepData.color} />
          </View>
          
          <Text style={styles.stepNumber}>
            Passo {currentStep + 1} de {ACTS_STEPS.length}
          </Text>
          
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          <Text style={styles.stepSubtitle}>{currentStepData.subtitle}</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(200).duration(400)}
          style={styles.descriptionCard}
        >
          <Text style={styles.descriptionText}>{currentStepData.description}</Text>
        </Animated.View>

        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Suas Anotações (opcional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder={currentStepData.placeholder}
            placeholderTextColor="#9E9E9E"
            value={notes[currentStepData.id]}
            onChangeText={(text) => handleNoteChange(currentStepData.id, text)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Navigation Dots */}
        <View style={styles.dotsContainer}>
          {ACTS_STEPS.map((step, index) => (
            <Animated.View
              key={step.id}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive,
                { backgroundColor: index === currentStep ? step.color : "#444" }
              ]}
              entering={FadeIn.delay(index * 50)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <Animated.View 
        style={styles.bottomNav}
        entering={FadeInDown.delay(300).duration(400)}
      >
        {currentStep > 0 && (
          <HapticPressable
            style={[styles.navButton, styles.navButtonSecondary]}
            onPress={handlePrevious}
            hapticType="light"
          >
            <Ionicons name="arrow-back" size={24} color={Colors.backgroundWhite} />
            <Text style={styles.navButtonText}>Anterior</Text>
          </HapticPressable>
        )}

        <HapticPressable
          style={[
            styles.navButton,
            styles.navButtonPrimary,
            currentStep === 0 && styles.navButtonFull
          ]}
          onPress={handleNext}
          hapticType={currentStep === ACTS_STEPS.length - 1 ? "success" : "medium"}
        >
          <Text style={styles.navButtonTextPrimary}>
            {currentStep === ACTS_STEPS.length - 1 ? "Finalizar" : "Próximo"}
          </Text>
          {currentStep < ACTS_STEPS.length - 1 && (
            <Ionicons name="arrow-forward" size={24} color={Colors.backgroundWhite} />
          )}
        </HapticPressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  closeButton: {
    padding: 8,
  },
  timerDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
    fontVariant: ["tabular-nums"],
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 20,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.primaryGreen,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  stepIndicator: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  stepNumber: {
    fontSize: 14,
    color: "#9E9E9E",
    marginBottom: 8,
    fontWeight: "600",
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: "#D1D5DB",
    textAlign: "center",
  },
  descriptionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  descriptionText: {
    fontSize: 16,
    color: "#D1D5DB",
    lineHeight: 24,
    textAlign: "center",
  },
  notesSection: {
    marginBottom: 32,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.backgroundWhite,
    marginBottom: 12,
  },
  notesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.backgroundWhite,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
  },
  bottomNav: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  navButtonFull: {
    flex: 1,
  },
  navButtonSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  navButtonPrimary: {
    backgroundColor: Colors.primaryGreen,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.backgroundWhite,
  },
  navButtonTextPrimary: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.backgroundWhite,
  },
});

export default PrayerModeScreen;
