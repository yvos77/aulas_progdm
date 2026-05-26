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

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!")
      return
    }
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres!")
      return
    }

    try {
      setLoading(true)
      await register(name, email, password)
      router.replace("/(tabs)")
    } catch (e) {
      Alert.alert("Erro", "Não foi possível criar a conta. Tente outro email.")
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
            <Text style={styles.subtitle}>Crie sua conta</Text>
          </View>

          <View style={styles.form}>
            <Text style={globalStyles.inputLabel}>Nome</Text>
            <TextInput
              style={globalStyles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor={colors.secondaryText}
              autoCapitalize="words"
            />

            <Text style={[globalStyles.inputLabel, { marginTop: 12 }]}>Email</Text>
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
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={colors.secondaryText}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color={colors.primaryContrast} />
                : <Text style={styles.registerButtonText}>Cadastrar</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.back()}
            >
              <Text style={styles.loginText}>
                Já tem conta?{" "}
                <Text style={styles.loginLink}>Faça login</Text>
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
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 24,
  },
  registerButtonText: {
    color: colors.primaryContrast,
    fontSize: 18,
    fontWeight: "600",
  },
  loginButton: {
    alignItems: "center",
    marginTop: 16,
  },
  loginText: {
    color: colors.secondaryText,
    fontSize: 15,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: "600",
  },
})