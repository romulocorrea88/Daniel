import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming 
} from "react-native-reanimated";
import useHaptics from "../utils/useHaptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HapticPressable = ({ 
  children, 
  onPress, 
  style, 
  hapticType = "light",
  scaleValue = 0.98,
  disabled = false,
  ...props 
}) => {
  const haptics = useHaptics();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(scaleValue, {
      damping: 15,
      stiffness: 400,
    });
    opacity.value = withTiming(0.8, { duration: 50 });

    if (!disabled) {
      switch (hapticType) {
        case "light":
          haptics.light();
          break;
        case "medium":
          haptics.medium();
          break;
        case "heavy":
          haptics.heavy();
          break;
        case "selection":
          haptics.selection();
          break;
        case "success":
          haptics.success();
          break;
        default:
          haptics.light();
      }
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 400,
    });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const handlePress = () => {
    if (onPress && !disabled) {
      onPress();
    }
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[style, animatedStyle]}
      disabled={disabled}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};

export default HapticPressable;
