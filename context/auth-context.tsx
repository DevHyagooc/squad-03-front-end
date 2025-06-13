"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { login as loginService } from "@/services/auth-service"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface User {
  email: string
  roles: string[]
}

interface DecodedToken {
  sub: string
  roles: string[]
  exp: number
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if there's a token in cookies on initial load
    const token = Cookies.get("auth_token")
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)

        // Check if token is expired
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
          logout()
          return
        }

        setUser({
          email: decoded.sub,
          roles: decoded.roles || [],
        })
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error decoding token:", error)
        logout()
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await loginService(email, password)

    // Store user info from token
    const decoded = jwtDecode<DecodedToken>(response.token)
    const userData = {
      email: decoded.sub,
      roles: response.roles || decoded.roles || [],
    }

    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    Cookies.remove("auth_token")
    setUser(null)
    setIsAuthenticated(false)
  }

  const hasRole = (role: string) => {
    return user?.roles?.includes(role) || false
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasRole }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
