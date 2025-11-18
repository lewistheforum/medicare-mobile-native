import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { store } from "@/src/store";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
          <Stack.Screen
            name="users/index"
            options={{ title: "Users", headerShown: false }}
          />
          <Stack.Screen
            name="users/[id]"
            options={{ title: "User Details", headerShown: false }}
          />
          <Stack.Screen
            name="users/new"
            options={{
              title: "New User",
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="users/[id]/edit"
            options={{
              title: "Edit User",
              headerShown: false,
              presentation: "modal",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
