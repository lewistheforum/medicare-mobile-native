import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { configureFirebaseAppCheck } from "@/src/config/firebaseAppCheck";
import { store } from "@/src/store";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Initialize Firebase App Check when app starts
  useEffect(() => {
    configureFirebaseAppCheck();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
            <Stack.Screen name="users/create" />
            <Stack.Screen name="users/[id]" />
            <Stack.Screen name="users/[id]/edit" />
            <Stack.Screen name="pre-home/index" />
            <Stack.Screen name="pre-home/login/index" />
            <Stack.Screen name="pre-home/register/index" />
            <Stack.Screen name="pre-home/register/otp/index" />
            <Stack.Screen name="pre-home/register/information/index" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
