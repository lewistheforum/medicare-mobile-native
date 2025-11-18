import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/src/store/slices/userSlice";

const STORAGE_KEY = "@users";

export class UserService {
  private static async getStoredUsers(): Promise<User[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading users from storage:", error);
      return [];
    }
  }

  private static async saveUsers(users: User[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to storage:", error);
      throw error;
    }
  }

  static async getAllUsers(): Promise<User[]> {
    return await this.getStoredUsers();
  }

  static async getUserById(id: string): Promise<User> {
    const users = await this.getStoredUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  static async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const users = await this.getStoredUsers();
    const now = new Date().toISOString();
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    users.push(newUser);
    await this.saveUsers(users);
    return newUser;
  }

  static async updateUser(
    id: string,
    userData: Partial<User>
  ): Promise<User> {
    const users = await this.getStoredUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = {
      ...users[index],
      ...userData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    await this.saveUsers(users);
    return users[index];
  }

  static async deleteUser(id: string): Promise<void> {
    const users = await this.getStoredUsers();
    const filteredUsers = users.filter((u) => u.id !== id);
    if (filteredUsers.length === users.length) {
      throw new Error("User not found");
    }
    await this.saveUsers(filteredUsers);
  }
}

