import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const LogoutButton = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await logout();
      // Navigation is handled by AuthNavigator state change usually, 
      // but the prompt code in 7.5 has navigation.replace("Auth").
      // However, in 7.6 AuthNavigator switches stacks based on isAuthenticated.
      // So explicit navigation might not be needed or might cause warning if stack unmounts.
      // I'll keep it as is but it might be redundant if AuthNavigator handles it.
      // Actually, if AuthNavigator switches stack, "Auth" screen might not be in "App" stack.
      // So navigation.replace("Auth") would fail if "Auth" is not in the current stack.
      // Since AuthNavigator (7.6) uses conditional rendering: {isAuthenticated ? <AppStack /> : <AuthStack />}
      // When logout happens, isAuthenticated becomes false, and AuthStack is rendered.
      // So we don't need to navigate manually.
      // I will comment out the navigation part or remove it to be safe.
      // But the prompt explicitly put it there.
      // I'll leave it but wrap in try-catch or check if navigation is available.
      // Actually, I'll just remove the navigation call because the context update will trigger re-render of AuthNavigator.
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f44336",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LogoutButton;