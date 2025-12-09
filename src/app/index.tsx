import { Redirect } from "expo-router";

// Redirect root deep links (e.g., mobilemedicare:///) to the intended entry
// route so we don't hit Expo Router's unmatched route screen.
export default function IndexRedirect() {
  return <Redirect href="/home" />;
}
