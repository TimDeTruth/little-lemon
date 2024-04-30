import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const [orderStatuses, setOrderStatuses] = useState(false);
  const [passwordChanges, setPasswordChanges] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch data from AsyncStorage
    const fetchData = async () => {
      console.log("i got here");
      try {
        const userFirstName = await AsyncStorage.getItem("firstName");
        const userLastName = await AsyncStorage.getItem("lastName");
        const userEmail = await AsyncStorage.getItem("email");
        console.log("retrieved name from AS: " + userFirstName);

        setFirstName(firstName === null ? "" : JSON.parse(userFirstName));
        setFirstName(lastName === null ? "" : JSON.parse(userLastName));
        setFirstName(email === null ? "" : JSON.parse(userEmail));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* Avatar */}

        <Pressable>
          <View style={styles.avatar} onPress={pickImage}></View>
        </Pressable>
        <View style={styles.container}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        {/* Change and Remove buttons */}
        <View style={styles.avatarButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal information section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal information</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
        />
        <TextInput style={styles.input} placeholder="Email" value={email} />
        <TextInput style={styles.input} placeholder="Phone number" />
      </View>

      {/* Email notifications section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email notifications</Text>
        <View style={styles.checkboxContainer}>{/* Checkboxes */}</View>
        <View>
          <CustomCheckBox
            label="Order Statuses"
            isChecked={orderStatuses}
            onPress={() => setOrderStatuses(!orderStatuses)}
          />
          <CustomCheckBox
            label="Password Changes"
            isChecked={passwordChanges}
            onPress={() => setPasswordChanges(!passwordChanges)}
          />
          <CustomCheckBox
            label="Special Offers"
            isChecked={specialOffers}
            onPress={() => setSpecialOffers(!specialOffers)}
          />
          <CustomCheckBox
            label="Newsletter"
            isChecked={newsletter}
            onPress={() => setNewsletter(!newsletter)}
          />
        </View>
      </View>

      {/* Log out and Save changes buttons */}
      <TouchableOpacity style={styles.actionButton}>
        <Text
          style={styles.actionButtonText}
          onPress={() => navigation.navigate("Onboarding")}
        >
          Log out
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Save changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const CustomCheckBox = ({ label, isChecked, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons
        name={isChecked ? "checkbox" : "checkbox-outline"}
        size={24}
        color="black"
        style={styles.checkboxIcons}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F2",
    padding: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "gray", // Placeholder color for the avatar
  },
  avatarButtons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#F3C257",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 10,
    // You can add checkboxes here
  },
  actionButton: {
    backgroundColor: "#F3C257",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  checkboxIcons: {
    justifyContent: "flex-start",
  },
});

export default Profile;
