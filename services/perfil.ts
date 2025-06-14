import { fetchWithAuth } from "./auth"

export type UserProfile = {
  id: number
  email: string
  nome: string
  roles: string[] // Mudança: agora é um array de strings
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

/**
 * Verifica se o usuário tem role de admin
 */
export function isAdmin(userProfile: UserProfile | null): boolean {
  if (!userProfile || !userProfile.roles) {
    return false
  }

  // Verifica se o array de roles contém ROLE_ADMIN
  return userProfile.roles.includes("ROLE_ADMIN")
}

/**
 * Verifica se o usuário tem uma role específica
 */
export function hasRole(userProfile: UserProfile | null, role: string): boolean {
  if (!userProfile || !userProfile.roles) {
    return false
  }

  return userProfile.roles.includes(role)
}

/**
 * Retorna as roles do usuário formatadas para exibição
 */
export function getDisplayRoles(userProfile: UserProfile | null): string[] {
  if (!userProfile || !userProfile.roles) {
    return []
  }

  // Remove o prefixo "ROLE_" e formata para exibição
  return userProfile.roles.map((role) =>
    role
      .replace("ROLE_", "")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase()),
  )
}
