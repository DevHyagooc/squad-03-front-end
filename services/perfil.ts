import { fetchWithAuth } from "./auth"

export type UserProfile = {
  id: string
  email: string
  nome: string
}

export type UpdateProfileData = {
  email?: string
  nome?: string
  senha?: string
}

/**
 * Busca o perfil do usuário autenticado
 * GET /users/me
 */
export async function getUserProfile(): Promise<UserProfile> {
  const response = await fetchWithAuth(`/users/me`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar perfil do usuário"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  const profile = await response.json()
  return profile
}

/**
 * Atualiza o perfil do usuário autenticado
 * PUT /users/me
 */
export async function updateUserProfile(data: UpdateProfileData): Promise<UserProfile> {
  const response = await fetchWithAuth(`/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    let errorMsg = "Erro ao atualizar perfil"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  const updatedProfile = await response.json()
  return updatedProfile
}
