import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import MyPrayersScreen from "../screens/MyPrayersScreen";
import CommunityScreen from "../screens/CommunityScreen";
import StudiesScreen from "../screens/StudiesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FocusModeTimer from "../components/FocusModeTimer";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "MyPrayers") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Studies") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primaryGreen,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          backgroundColor: Colors.backgroundWhite,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: "Início" }}
      />
      <Tab.Screen 
        name="MyPrayers" 
        component={MyPrayersScreen}
        options={{ tabBarLabel: "Meus Pedidos" }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{ tabBarLabel: "Amigos" }}
      />
      <Tab.Screen 
        name="Studies" 
        component={StudiesScreen}
        options={{ tabBarLabel: "Estudos" }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs}
        />
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen 
          name="FocusMode" 
          component={FocusModeTimer}
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
