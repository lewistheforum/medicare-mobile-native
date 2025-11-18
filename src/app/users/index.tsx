import { ThemedText } from "@/src/components/themed-text";
import { ThemedView } from "@/src/components/themed-view";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { deleteUser, fetchUsers, User } from "@/src/store/slices/userSlice";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsersListScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (user: User) => {
    Alert.alert(
      "Delete User",
      `Are you sure you want to delete ${user.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(deleteUser(user.id));
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={[
        styles.userCard,
        {
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.background : "#f5f5f5",
          borderColor: colorScheme === "dark" ? "#333" : "#e0e0e0",
        },
      ]}
      onPress={() =>
        router.push({
          pathname: "/users/[id]" as any,
          params: { id: item.id },
        })
      }
    >
      <View style={styles.userInfo}>
        {item.avatar ? (
          <Image
            source={{ uri: item.avatar }}
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
              {item.name.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
        )}
        <View style={styles.userDetails}>
          <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
          <ThemedText style={styles.email}>{item.email}</ThemedText>
          <ThemedText style={styles.meta}>
            {item.age} years • {item.gender} • {formatDate(item.dob)}
          </ThemedText>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
      >
        <ThemedText style={styles.deleteButtonText}>Delete</ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading && users.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].tint}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View>
        <Link href={"/users" as any}>
          <Link.Trigger>
            <ThemedText type="subtitle">Back</ThemedText>
          </Link.Trigger>
        </Link>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: Colors[colorScheme ?? "light"].tint },
          ]}
          onPress={() => router.push("/users/new" as any)}
        >
          <ThemedText style={styles.addButtonText}>+ Add User</ThemedText>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      )}

      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ThemedText type="subtitle">No users found</ThemedText>
          <ThemedText style={styles.emptyText}>
            Tap &quot;Add User&quot; to create your first user profile
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={() => dispatch(fetchUsers())}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  list: {
    paddingBottom: 16,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
  },
  email: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  meta: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.6,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#ff4444",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 8,
    opacity: 0.6,
    textAlign: "center",
  },
  errorContainer: {
    padding: 12,
    backgroundColor: "#ffebee",
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#c62828",
  },
});
