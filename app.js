import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

// ---------------- HOME ----------------
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEALTH & WELLNESS</Text>
      <Text style={styles.subtitle}>Hello, John!</Text>
      <Text style={styles.text}>
        Welcome to the best app for your health and wellness.
      </Text>
      <Button title="Start" onPress={() => alert("Let's go!")} />
    </View>
  );
}

// ---------------- CRUD ----------------
function CrudScreen() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const saved = await AsyncStorage.getItem("items");
      if (saved) setItems(JSON.parse(saved));
    } catch (err) {
      console.log("Erro ao carregar itens:", err);
    }
  };

  const saveItems = async (newItems) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(newItems));
    } catch (err) {
      console.log("Erro ao salvar itens:", err);
    }
  };

  const addItem = () => {
    if (text.trim() === "") return;
    let newItems = [];
    if (editId !== null) {
      newItems = items.map((item) =>
        item.id === editId ? { ...item, name: text } : item
      );
      setEditId(null);
    } else {
      newItems = [...items, { id: Date.now(), name: text }];
    }
    setItems(newItems);
    saveItems(newItems);
    setText("");
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    saveItems(newItems);
  };

  const editItem = (id, name) => {
    setText(name);
    setEditId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD - Track Progress</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter item..."
        value={text}
        onChangeText={setText}
      />
      <Button title={editId ? "Update" : "Add"} onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editItem(item.id, item.name)}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// ---------------- ABOUT ----------------
function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        This app helps track your health and wellness goals.
      </Text>
    </View>
  );
}

// ---------------- SETTINGS ----------------
function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>Adjust your preferences here.</Text>
    </View>
  );
}

// ---------------- APP MAIN ----------------
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="CRUD" component={CrudScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#333" },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#444" },
  text: { fontSize: 16, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  actions: { flexDirection: "row" },
  edit: { color: "blue", marginRight: 10 },
  delete: { color: "red" },
});