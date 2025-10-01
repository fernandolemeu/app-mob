import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // === Globais ===
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
    color: "#444",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },

  // === Inputs ===
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },

  // === Cards (CRUD) ===
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actions: {
    flexDirection: "row",
  },
  edit: {
    color: "blue",
    marginRight: 16,
    fontWeight: "600",
  },
  delete: {
    color: "red",
    fontWeight: "600",
  },

  // === Centered ===
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});