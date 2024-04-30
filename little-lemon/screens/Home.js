import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useState, useEffect } from "react";
import {
  initDatabase,
  loadMenuFromDatabase,
  fetchMenuItemsByCategories,
} from "../database/database";

const Home = ({ navigation }) => {
  const [menuData, setMenuData] = useState([]);

  const categories = ["Mains", "Starters", "Desserts", "Drinks", "Wines"];

  const MenuCategoryList = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Menu Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <TouchableOpacity>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
        );
        const data = await response.json();
        setMenuData(data.menu);

        fetchMenuItemsByCategories(categories)
          .then((items) => {
            setMenuItems(items);
          })
          .catch((error) => {
            console.error("Error fetching menu items:", error);
          });

        console.log("the Menu: ", data.menu);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const getImageUrl = (imageName) => {
    return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageName}`;
  };

  const renderMenuItem = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Image
        source={{ uri: getImageUrl(item.image) }}
        style={{ width: 75, height: 75 }}
        onError={(error) => console.error("Error loading image:", error)}
      />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  const getAllData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
      const formattedData = allData.map(([key, value]) => ({
        key,
        value: JSON.parse(value),
      }));
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
    <View>
      {/* <Button
        onPress={async () => {
          await fetchJSON();
        }}
        title="Fetch Data"
      ></Button> */}
      <Button
        onPress={async () => {
          await clearAsyncData();
          console.log("the data was cleared");
          console.log("");
        }}
        title="Clear Async Data"
      ></Button>

      <MenuCategoryList />

      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={menuData}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.name}
        />
      </View>

      <View>
        {menuItems.map((item) => (
          <Text key={item.id}>{item.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryItem: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
  },
});
// const API_URL =
//   "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

// const fetchJSON = async () => {
//   // Fetching menu from URL
//   const response = await fetch(API_URL);
//   const json = await response.json();

//   console.log(json);

//   return json;
// };
// const fetchImages = async () => {
//   const jsonData = await fetchJSON();
//   console.log(jsonData);

//   const result = jsonData.map((item) => ({
//     imageFileName: item.image,
//   }));
//   const baseURL = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;
// };
