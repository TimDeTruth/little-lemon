import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Splash = () => {
  useEffect(() => {
    // Simulate some loading time with setTimeout
    const timer = setTimeout(() => {
      // Navigate to the main screen or perform other actions after loading
      console.log("Splash screen timeout completed");
    }, 2000); // 2000 milliseconds (2 seconds)

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../img/little-lemon-header-logo.png")} />
      <Text style={styles.text}>Welcome to Little Lemon App!</Text>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // You can set your own background color
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#555555", // You can set your own text color
  },
});

export default Splash;
