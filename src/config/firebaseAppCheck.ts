import appCheck from "@react-native-firebase/app-check";

// Determine if we're in development mode
const DEV = __DEV__;
// Allow forcing debug provider via env (useful for dev client build)
const USE_DEBUG = DEV || process.env.EXPO_PUBLIC_APP_CHECK_DEBUG === "true";

/**
 * Configure Firebase App Check
 * This helps protect your backend resources from abuse
 *
 * For development:
 * - Android: Uses debug provider with debug token
 * - iOS: Uses debug provider with debug token
 *
 * For production:
 * - Android: Uses Play Integrity API
 * - iOS: Uses App Attest with DeviceCheck fallback
 *
 * IMPORTANT: Replace "YOUR_DEBUG_TOKEN" with your actual debug token
 * You can get the debug token by running the app and checking the console logs
 */
export const configureFirebaseAppCheck = async () => {
  try {
    // Create provider instance using the module method
    const rnfbProvider = appCheck().newReactNativeFirebaseAppCheckProvider();

    // Configure App Check providers
    rnfbProvider.configure({
      android: {
        provider: USE_DEBUG ? "debug" : "playIntegrity",
        debugToken: USE_DEBUG
          ? "1D28FB4F-B3C6-45DB-A4A0-EA999DA047C1" // Replace with actual debug token
          : undefined,
      },
      apple: {
        provider: USE_DEBUG ? "debug" : "appAttestWithDeviceCheckFallback",
        debugToken: USE_DEBUG
          ? "1D28FB4F-B3C6-45DB-A4A0-EA999DA047C1" // Replace with actual debug token
          : undefined,
      },
    });

    // Initialize App Check with the configured provider
    await appCheck().initializeAppCheck({
      provider: rnfbProvider,
      isTokenAutoRefreshEnabled: true,
    });

    console.log("✅ Firebase App Check configured successfully");

    if (USE_DEBUG) {
      console.log(
        "⚠️ IMPORTANT: Replace 'YOUR_DEBUG_TOKEN' with your actual debug token"
      );
      console.log(
        "⚠️ You can get the debug token from Firebase Console or app logs"
      );
    }
  } catch (error) {
    console.error("❌ Error configuring Firebase App Check:", error);
    // Don't throw error - allow app to continue even if App Check fails
  }
};

/**
 * Get current App Check token
 * Useful for debugging or custom token validation
 */
export const getAppCheckToken = async () => {
  try {
    const tokenResult = await appCheck().getToken();
    return tokenResult.token;
  } catch (error) {
    console.error("Error getting App Check token:", error);
    return null;
  }
};

/**
 * Get debug token for development
 * Call this function in development mode to get your debug token
 * Then register it in Firebase Console
 */
export const getDebugToken = async () => {
  if (!DEV) {
    console.warn("Debug token is only available in development mode");
    return null;
  }

  try {
    const tokenResult = await appCheck().getToken(true);
    console.log("🔑 Debug Token:", tokenResult.token);
    console.log("📋 Copy this token and register it in Firebase Console");
    return tokenResult.token;
  } catch (error) {
    console.error("Error getting debug token:", error);
    return null;
  }
};
