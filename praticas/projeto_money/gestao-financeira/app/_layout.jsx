import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { colors } from "../constants/colors"
import GlobalState from "../contexts/GlobalState"
import AuthProvider from "../contexts/AuthContext"

export default function RootLayout() {
  return (
    <AuthProvider>
      <GlobalState>
        <StatusBar backgroundColor={colors.primary} style="light"/>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GlobalState>
    </AuthProvider>
  )
}