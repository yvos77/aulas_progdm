import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "expo-router"
import { colors } from "../constants/colors"
import { globalStyles } from "../styles/globalStyles"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!")
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      router.replace("/(tabs)")
    } catch (e) {
      Alert.alert("Erro", "Email ou senha inválidos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.title}>Money</Text>
            <Text style={styles.subtitle}>Gestão Financeira</Text>
          </View>

          <View style={styles.form}>
            <Text style={globalStyles.inputLabel}>Email</Text>
            <TextInput
              style={globalStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor={colors.secondaryText}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[globalStyles.inputLabel, { marginTop: 12 }]}>Senha</Text>
            <TextInput
              style={globalStyles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••"
              placeholderTextColor={colors.secondaryText}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color={colors.primaryContrast} />
                : <Text style={styles.loginButtonText}>Entrar</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.registerText}>
                Não tem conta?{" "}
                <Text style={styles.registerLink}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
    marginTop: 4,
  },
  form: {
    gap: 4,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 24,
  },
  loginButtonText: {
    color: colors.primaryContrast,
    fontSize: 18,
    fontWeight: "600",
  },
  registerButton: {
    alignItems: "center",
    marginTop: 16,
  },
  registerText: {
    color: colors.secondaryText,
    fontSize: 15,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: "600",
  },
})