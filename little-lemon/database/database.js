import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

export const initDatabase = () => {
  // Initialize the SQLite database and create the 'menu' table if it doesn't exist
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT)",
      []
    );
  });
};

export const fetchMenuData = async () => {
  try {
    // Fetch menu data from remote server
    const response = await fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    );
    const data = await response.json();

    // Store menu data in the SQLite database
    db.transaction((tx) => {
      data.forEach((item) => {
        tx.executeSql(
          "INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)",
          [item.name, item.price, item.description, item.image]
        );
      });
    });
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
};

export const loadMenuFromDatabase = (callback) => {
  // Load menu items from the SQLite database
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM menu",
      [],
      (_, { rows }) => {
        const menuItems = rows._array; // Extract menu items from database result
        console.log("Menu loaded from database:", menuItems);
        callback(menuItems);
      },
      (error) => console.error(error)
    );
  });
};

export const fetchMenuItemsByCategories = (categories) => {
  return new Promise((resolve, reject) => {
    const categoryString = categories.map((cat) => `'${cat}'`).join(", ");
    const query = `SELECT * FROM menu WHERE category IN (${categoryString})`;

    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows }) => {
          resolve(rows._array); // Resolve with the array of menu items
        },
        (_, error) => {
          reject(error); // Reject with the error if any
        }
      );
    });
  });
};
