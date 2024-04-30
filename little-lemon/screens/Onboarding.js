import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function Onboarding({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorage.setItem("lastName", lastName);
      await AsyncStorage.setItem("email", email);

      console.log("Data saved successfully!");

      const getFirsName = await AsyncStorage.getItem("firstName");
      console.log("the first name stored " + getFirsName);
      const getLastName = await AsyncStorage.getItem("lastName");
      console.log("the last name stored " + lastName);
      const getEmail = await AsyncStorage.getItem("email");
      console.log("the email name stored " + email);

      await AsyncStorage.setItem("onboardingStatus", "true");
      const obStatus = await AsyncStorage.getItem("onboardingStatus");
      console.log("the onboardingstatus is now: " + obStatus);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const getAllData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      console.log("all key: ", allKeys);
      const allData = await AsyncStorage.multiGet(allKeys);
      console.log("all data: ", allData);

      const formattedData = allData.map(([key, value]) => ({
        key,
        value: JSON.parse(value),
      }));
      console.log("formatted Dataaaa: " + formattedData);
      return formattedData;
    } catch (error) {
      console.log("Error retrieving data:", error);
      return [];
    }
  };

  const clearAsyncData = async () => {
    await AsyncStorage.clear();
    const data = await getAllData();
    console.log("the remaining data: " + data);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          await clearAsyncData();
        }}
        title="Clear Async Data"
      ></Button>

      <Button
        onPress={async () => {
          await getAllData();
        }}
        title="Get Data"
      ></Button>

      <Text style={styles.title}>Let us get to know you</Text>

      <Text style={styles.textInput}>First Name</Text>
      <TextInput
        style={styles.textInputBox}
        value={firstName}
        onChangeText={(text) => {
          console.log(text);
          setFirstName(text);
        }}
        placeholder="Enter your first name"
      ></TextInput>

      <Text style={styles.textInput}>Last Name</Text>
      <TextInput
        style={styles.textInputBox}
        value={lastName}
        onChangeText={(text) => {
          console.log(text);
          setLastName(text);
        }}
        placeholder="Enter your last name"
      ></TextInput>

      <Text style={styles.textInput}>Email</Text>
      <TextInput
        style={styles.textInputBox}
        value={email}
        onChangeText={(text) => {
          console.log(text);
          setEmail(text);
        }}
        placeholder="Enter your email"
      ></TextInput>

      {/* <Pressable
        onPress={async () => {
          await saveData();
          navigation.navigate("Profile");
        }}
      >
        <Text style={styles.newsletter}>Next</Text>
      </Pressable> */}
      <Button
        onPress={async () => {
          await saveData();
        }}
        style={styles.button}
        title="Next"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  textInputBox: {
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  textInput: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#cbd2d9",
//   },

//   title: {
//     margin: 20,
//     paddingTop: 50,
//     paddingBottom: 150,
//     fontSize: 32,
//   },

//   textInput: {
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#344854",
//     textAlign: "center",
//     margin: 20,
//   },
// });
