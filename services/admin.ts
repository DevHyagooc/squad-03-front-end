import { fetchWithAuth } from "./auth"

export type User = {
  id: number
  email: string
  nome: string
  roles: string[]
}

export type CreateUserData = {
  nome: string
  email: string
  senha: string
  roles: string[]
}

export type UpdateUserData = {
  nome: string
  email: string
  senha?: string
  // Removido roles daqui - será gerenciado separadamente
}

// ===== GERENCIAMENTO DE USUÁRIOS =====

/**
 * Lista todos os usuários
 * GET /users
 */
export async function getAllUsers(): Promise<User[]> {
  const response = await fetchWithAuth(`/users`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar usuários"
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

  return await response.json()
}

/**
 * Busca usuário por ID
 * GET /users/{id}
 */
export async function getUserById(id: number): Promise<User> {
  const response = await fetchWithAuth(`/users/${id}`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar usuário"
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

  return await response.json()
}

/**
 * Cria um novo usuário
 * POST /users
 */
export async function createUser(userData: CreateUserData): Promise<User> {
  const response = await fetchWithAuth(`/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    let errorMsg = "Erro ao criar usuário"
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

  return await response.json()
}

/**
 * Atualiza dados básicos de um usuário (nome, email, senha)
 * PUT /users/{id}
 * Nota: Roles são gerenciadas separadamente via endpoints específicos
 */
export async function updateUser(id: number, userData: UpdateUserData): Promise<User> {
  // Monta o body apenas com os campos que devem ser atualizados
  const updateBody: any = {
    nome: userData.nome,
    email: userData.email,
  }

  // Só inclui senha se foi fornecida
  if (userData.senha && userData.senha.trim() !== "") {
    updateBody.senha = userData.senha
  }

  const response = await fetchWithAuth(`/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateBody),
  })

  if (!response.ok) {
    let errorMsg = "Erro ao atualizar usuário"
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

  return await response.json()
}

/**
 * Deleta um usuário
 * DELETE /users/{id}
 */
export async function deleteUser(id: number): Promise<void> {
  const response = await fetchWithAuth(`/users/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    let errorMsg = "Erro ao deletar usuário"
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
}

// ===== GERENCIAMENTO DE ROLES =====

/**
 * Adiciona uma role a um usuário
 * POST /users/{id}/roles?role={role}
 */
export async function addRoleToUser(userId: number, role: string): Promise<void> {
  const response = await fetchWithAuth(`/users/${userId}/roles?role=${encodeURIComponent(role)}`, {
    method: "POST",
  })

  if (!response.ok) {
    let errorMsg = "Erro ao adicionar role ao usuário"
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
}

/**
 * Remove uma role de um usuário
 * DELETE /users/{id}/roles?role={role}
 */
export async function removeRoleFromUser(userId: number, role: string): Promise<void> {
  const response = await fetchWithAuth(`/users/${userId}/roles?role=${encodeURIComponent(role)}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    let errorMsg = "Erro ao remover role do usuário"
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
}

// ===== UTILITÁRIOS =====

/**
 * Lista de roles disponíveis no sistema
 */
export const AVAILABLE_ROLES = ["ROLE_USER", "ROLE_ADMIN"] as const

/**
 * Formata role para exibição
 */
export function formatRoleForDisplay(role: string): string {
  return role
    .replace("ROLE_", "")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
}

/**
 * Verifica se uma role é válida
 */
export function isValidRole(role: string): boolean {
  return AVAILABLE_ROLES.includes(role as any)
}
