import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";
import Home from "../screens/Home";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  // const [isOnboardingCompleted, setOnboardingCompleted] = useState(false);
  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem("onboardingStatus");
        console.log("the onboarding status: " + onboardingStatus);
        // completed onboarding
        if (onboardingStatus !== null) {
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            isOnboardingCompleted: true,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkOnboardingStatus();
  }, [state.isOnboardingCompleted]);

  if (state.isLoading) {
    // We haven't finished reading from AsyncStorage yet
    return <Splash />;
  }

  return (
    <Stack.Navigator>
      {state.isOnboardingCompleted ? (
        // Onboarding completed, user is signed in
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: () => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../img/little-lemon-header-logo.png")}
                    style={{ width: 50, height: 50 }}
                  />
                </View>
              ),
              headerRight: () => (
                <View style={{ marginRight: 10 }}>
                  {/* Your circle component here */}
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "grey", // Example color
                    }}
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      ) : (
        // User is NOT signed in
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

{
  /* <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => (
            <Image
              source={require("../img/little-lemon-header-logo.png")}
              style={{ width: 50, height: 50, alignItems: "center" }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                paddingRight={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      /> */
}

// options={{
//   headerTitle: (props) => (
//     <Image
//       source={require("../img/little-lemon-header-logo.png")}
//       style={{ width: 50, height: 50, alignItems: "center" }}
//     />
//   ),
// }}

{
  /* 
      {state.isOnboardingCompleted ? (
        // Onboarding completed, user is signed in
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: (props) => (
              <Image
                source={require("../img/little-lemon-header-logo.png")}
                style={{ width: 50, height: 50, alignItems: "center" }}
              />
            ),
          }}
        />
      ) :  */
}

{
  /* <Stack.Navigator>
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{
        headerTitle: (props) => (
          <Image
            source={require("./img/little-lemon-header-logo.png")}
            style={{ width: 50, height: 50, alignItems: "center" }}
          />
        ),
      }}
    />
  </Stack.Navigator> */
}
