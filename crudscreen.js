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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CrudScreen() {
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
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