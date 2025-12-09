import { ThemedText } from "@/src/components/themed-text";
import { ThemedView } from "@/src/components/themed-view";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { createUser } from "@/src/store/slices/userSlice";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateUserScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const { loading } = useAppSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "male" as "male" | "female" | "other",
    dob: "",
    avatar: "",
    phone: "",
    address: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Email is required");
      return;
    }
    if (!formData.age || parseInt(formData.age) <= 0) {
      Alert.alert("Error", "Valid age is required");
      return;
    }
    if (!formData.dob) {
      Alert.alert("Error", "Date of birth is required");
      return;
    }

    try {
      await dispatch(
        createUser({
          name: formData.name.trim(),
          email: formData.email.trim(),
          age: parseInt(formData.age),
          gender: formData.gender,
          dob: formData.dob,
          avatar: formData.avatar.trim() || undefined,
          phone: formData.phone.trim() || undefined,
          address: formData.address.trim() || undefined,
        })
      ).unwrap();
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create user");
    }
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
      color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
      borderColor: colorScheme === "dark" ? "#333" : "#ddd",
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>
          Create New User
        </ThemedText>

        <View style={styles.form}>
          <View style={styles.field}>
            <ThemedText style={styles.label}>Name *</ThemedText>
            <TextInput
              style={inputStyle}
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
              placeholder="Enter name"
              placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Email *</ThemedText>
            <TextInput
              style={inputStyle}
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Age *</ThemedText>
            <TextInput
              style={inputStyle}
              value={formData.age}
              onChangeText={(value) => handleChange("age", value)}
              placeholder="Enter age"
              keyboardType="numeric"
              placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Gender *</ThemedText>
            <View style={styles.genderContainer}>
              {(["male", "female", "other"] as const).map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderOption,
                    formData.gender === gender && {
                      backgroundColor: Colors[colorScheme ?? "light"].tint,
                    },
                    {
                      borderColor: colorScheme === "dark" ? "#333" : "#ddd",
                    },
                  ]}
                  onPress={() => handleChange("gender", gender)}
                >
                  <ThemedText
                    style={[
                      styles.genderText,
                      formData.gender === gender && styles.genderTextSelected,
                    ]}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Date of Birth *</ThemedText>
            <TextInput
              style={inputStyle}
              value={formData.dob}
              onChangeText={(value) => handleChange("dob", value)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Avatar URL</ThemedText>
            <TextInput
              style={inputStyle}
              value={formData.avatar}
              onChangeText={(value) => handleChange("avatar", value)}
              placeholder="Enter image URL"
              autoCapitalize="none"
              placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Phone</ThemedText>
            <TextInput
              style={inputStyle}
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Address</ThemedText>
            <TextInput
              style={[inputStyle, styles.textArea]}
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
              placeholder="Enter address"
              multiline
              numberOfLines={3}
              placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              {
                borderColor: colorScheme === "dark" ? "#333" : "#ddd",
              },
            ]}
            onPress={() => router.back()}
          >
            <ThemedText>Cancel</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              { backgroundColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <ThemedText style={styles.submitButtonText}>
              {loading ? "Creating..." : "Create User"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 44,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  genderText: {
    fontSize: 14,
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    borderWidth: 1,
  },
  submitButton: {},
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
