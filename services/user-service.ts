import { getAuthToken } from "./auth-service"

const API_BASE_URL = "https://squad-03-back-end.onrender.com"

// Atualizar a interface CreateUserData para incluir o campo nome
export interface User {
  id: number
  email: string
  nome: string
  roles?: string[]
}

export interface CreateUserData {
  email: string
  nome: string
  senha: string
}

export interface UpdateUserData {
  email?: string
  nome?: string
  senha?: string
}

// Helper function to make authenticated requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken()

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorMsg = `Error: ${response.status}`
    try {
      const errorData = await response.json()
      if (errorData.message) {
        errorMsg = errorData.message
      }
    } catch {}
    throw new Error(errorMsg)
  }

  // For DELETE requests that don't return content
  if (response.status === 204) {
    return null
  }

  return response.json()
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  return fetchWithAuth("/users")
}

// Get user by ID
export async function getUserById(id: number): Promise<User> {
  return fetchWithAuth(`/users/${id}`)
}

// Create new user
export async function createUser(userData: CreateUserData): Promise<User> {
  return fetchWithAuth("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

// Update user - usando o método PUT para atualizar informações do usuário
export async function updateUser(id: number, userData: UpdateUserData): Promise<User> {
  return fetchWithAuth(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  })
}

// Delete user
export async function deleteUser(id: number): Promise<void> {
  return fetchWithAuth(`/users/${id}`, {
    method: "DELETE",
  })
}

// Adicionar role a um usuário - usando POST com query parameter
export async function addUserRole(userId: number, role: string): Promise<void> {
  return fetchWithAuth(`/users/${userId}/roles?role=${encodeURIComponent(role)}`, {
    method: "POST",
  })
}

// Remover role de um usuário - usando DELETE com query parameter
export async function removeUserRole(userId: number, role: string): Promise<void> {
  return fetchWithAuth(`/users/${userId}/roles?role=${encodeURIComponent(role)}`, {
    method: "DELETE",
  })
}
