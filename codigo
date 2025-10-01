import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// HomeScreen
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEALTH & WELLNESS</Text>
      <Text style={styles.subtitle}>Hello, John!</Text>
      <Text>Welcome to the best app for your health and wellness.</Text>
      <Button title="Start" onPress={() => alert("Let's go!")} />
    </View>
  );
}

// CrudScreen
function CrudScreen() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  // Carregar itens do AsyncStorage
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem("items");
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (err) {
      console.error("Erro ao carregar itens:", err);
    }
  };

  const saveItems = async (newItems) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(newItems));
    } catch (err) {
      console.error("Erro ao salvar itens:", err);
    }
  };

  // Adicionar ou atualizar item
  const addItem = () => {
    if (text.trim() === "") return;

    let newItems;
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

  // Deletar item
  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    saveItems(newItems);
  };

  // Editar item
  const editItem = (id, name) => {
    setText(name);
    setEditId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD - Track Progress / Medication</Text>
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

// AboutScreen
function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This app is designed to help you maintain a healthy lifestyle. {"\n"}
        Track your eating habits, exercises, and medications easily.
      </Text>
    </View>
  );
}

// SettingsScreen
function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Page (soon)</Text>
    </View>
  );
}

// Navigation (Tab Navigator)
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "CRUD") iconName = "md-list";
            else if (route.name === "About") iconName = "information-circle";
            else if (route.name === "Settings") iconName = "settings";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="CRUD" component={CrudScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "600", marginVertical: 8, textAlign: "center" },
  text: { fontSize: 16, textAlign: "center", padding: 20 },
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
