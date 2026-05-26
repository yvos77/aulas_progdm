import { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"
import { api } from "../services/api"

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await SecureStore.getItemAsync("user")
        if (stored) {
          setUser(JSON.parse(stored))
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (email, password) => {
    const data = await api.login({ email, password })
    await SecureStore.setItemAsync("token", data.token)
    await SecureStore.setItemAsync("user", JSON.stringify(data.user))
    setUser(data.user)
  }

  const register = async (name, email, password) => {
    const data = await api.register({ name, email, password })
    await SecureStore.setItemAsync("token", data.token)
    await SecureStore.setItemAsync("user", JSON.stringify(data.user))
    setUser(data.user)
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync("token")
    await SecureStore.deleteItemAsync("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}