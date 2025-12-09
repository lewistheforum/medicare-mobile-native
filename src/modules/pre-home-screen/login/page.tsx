import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.subtitle}>Màn hình đăng nhập sẽ được bổ sung.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
    justifyContent: "center",
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#F2F6FF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0C1B3A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#465670",
  },
});
