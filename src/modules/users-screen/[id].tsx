import { ThemedText } from "@/src/components/themed-text";
import { ThemedView } from "@/src/components/themed-view";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { useAppDispatch, useAppSelector } from "@/src/store";
import {
  clearCurrentUser,
  deleteUser,
  fetchUserById,
} from "@/src/store/slices/userSlice";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function UserDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [id, dispatch]);

  const handleDelete = () => {
    if (!currentUser) return;

    Alert.alert(
      "Delete User",
      `Are you sure you want to delete ${currentUser.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await dispatch(deleteUser(currentUser.id));
            router.back();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].tint}
        />
      </ThemedView>
    );
  }

  if (error || !currentUser) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Error</ThemedText>
        <ThemedText style={styles.errorText}>
          {error || "User not found"}
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme ?? "light"].tint },
          ]}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {currentUser.avatar ? (
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
          ) : (
            <View
              style={[
                styles.avatarPlaceholder,
                {
                  backgroundColor: colorScheme === "dark" ? "#444" : "#ddd",
                },
              ]}
            >
              <ThemedText style={styles.avatarText}>
                {currentUser.name.charAt(0).toUpperCase()}
              </ThemedText>
            </View>
          )}
          <ThemedText type="title" style={styles.name}>
            {currentUser.name}
          </ThemedText>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f9f9f9",
            },
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Personal Information
          </ThemedText>

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Email</ThemedText>
            <ThemedText style={styles.fieldValue}>
              {currentUser.email}
            </ThemedText>
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Age</ThemedText>
            <ThemedText style={styles.fieldValue}>
              {currentUser.age} years old
            </ThemedText>
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Gender</ThemedText>
            <ThemedText style={styles.fieldValue}>
              {currentUser.gender.charAt(0).toUpperCase() +
                currentUser.gender.slice(1)}
            </ThemedText>
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Date of Birth</ThemedText>
            <ThemedText style={styles.fieldValue}>
              {formatDate(currentUser.dob)}
            </ThemedText>
          </View>

          {currentUser.phone && (
            <View style={styles.field}>
              <ThemedText style={styles.fieldLabel}>Phone</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {currentUser.phone}
              </ThemedText>
            </View>
          )}

          {currentUser.address && (
            <View style={styles.field}>
              <ThemedText style={styles.fieldLabel}>Address</ThemedText>
              <ThemedText style={styles.fieldValue}>
                {currentUser.address}
              </ThemedText>
            </View>
          )}

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Created At</ThemedText>
            <ThemedText style={styles.fieldValue}>
              {formatDate(currentUser.createdAt)}
            </ThemedText>
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.fieldLabel}>Last Updated</ThemedText>
            <ThemedText style={styles.fieldValue}>
              {formatDate(currentUser.updatedAt)}
            </ThemedText>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.editButton,
              { backgroundColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={() =>
              router.push({
                pathname: "/users/[id]/edit" as any,
                params: { id: currentUser.id },
              })
            }
          >
            <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <ThemedText style={styles.buttonText}>Delete User</ThemedText>
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
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  name: {
    textAlign: "center",
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  fieldValue: {
    fontSize: 16,
  },
  actions: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  editButton: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    marginTop: 8,
    color: "#c62828",
  },
});
