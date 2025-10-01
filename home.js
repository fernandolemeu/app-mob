import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEALTH & WELLNESS</Text>
      <Text style={styles.subtitle}>Hello, John!</Text>
      <Text>Welcome to the best app for your health and wellness.</Text>
      <Button title="Start" onPress={() => alert("Let's go!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
  subtitle: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
});