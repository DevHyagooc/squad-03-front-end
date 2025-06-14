"use client"

import { useState, useEffect } from "react"
import { getUserProfile, isAdmin, type UserProfile } from "@/services/perfil"

export function useAuth() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await getUserProfile()
        setUserProfile(profile)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Erro ao carregar perfil:", error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  return {
    userProfile,
    loading,
    isAuthenticated,
    isAdmin: isAdmin(userProfile),
  }
}
