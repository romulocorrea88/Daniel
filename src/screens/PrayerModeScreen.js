import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import Colors from "../constants/Colors";

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

  const actsSteps = [
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

  useEffect(() => {
    // Activate keep awake when component mounts
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

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentStep < actsSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setIsActive(false);
    // In production: Save prayer session to backend with time and notes
    const prayerData = {
      duration: seconds,
      date: new Date().toISOString(),
      notes: notes
    };
    
    navigation.goBack();
  };

  const handleClose = () => {
    setIsActive(false);
    navigation.goBack();
  };

  const currentStepData = actsSteps[currentStep];
  const progress = ((currentStep + 1) / actsSteps.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={Colors.backgroundWhite} />
        </Pressable>
        
        <View style={styles.timerDisplay}>
          <Ionicons name="time-outline" size={20} color={Colors.backgroundWhite} />
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.stepIndicator}>
          <View style={[styles.iconContainer, { backgroundColor: currentStepData.color + "20" }]}>
            <Ionicons name={currentStepData.icon} size={48} color={currentStepData.color} />
          </View>
          
          <Text style={styles.stepNumber}>
            Passo {currentStep + 1} de {actsSteps.length}
          </Text>
          
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          <Text style={styles.stepSubtitle}>{currentStepData.subtitle}</Text>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>{currentStepData.description}</Text>
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Suas Anotações (opcional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder={currentStepData.placeholder}
            placeholderTextColor="#9E9E9E"
            value={notes[currentStepData.id]}
            onChangeText={(text) => setNotes({ ...notes, [currentStepData.id]: text })}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Navigation Dots */}
        <View style={styles.dotsContainer}>
          {actsSteps.map((step, index) => (
            <View
              key={step.id}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive,
                { backgroundColor: index === currentStep ? step.color : "#444" }
              ]}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {currentStep > 0 && (
          <Pressable
            style={[styles.navButton, styles.navButtonSecondary]}
            onPress={handlePrevious}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.backgroundWhite} />
            <Text style={styles.navButtonText}>Anterior</Text>
          </Pressable>
        )}

        <Pressable
          style={[
            styles.navButton,
            styles.navButtonPrimary,
            currentStep === 0 && styles.navButtonFull
          ]}
          onPress={handleNext}
        >
          <Text style={styles.navButtonTextPrimary}>
            {currentStep === actsSteps.length - 1 ? "Finalizar" : "Próximo"}
          </Text>
          {currentStep < actsSteps.length - 1 && (
            <Ionicons name="arrow-forward" size={24} color={Colors.backgroundWhite} />
          )}
        </Pressable>
      </View>
    </View>
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
