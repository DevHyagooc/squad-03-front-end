import Cookies from "js-cookie"

const API_BASE_URL = "https://squad-03-back-end.onrender.com"

// Cookie configuration
const TOKEN_COOKIE_NAME = "auth_token"
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === "production", // Use secure in production
  sameSite: "strict" as const,
  expires: 7, // 7 days expiration
  path: "/",
}

interface LoginResponse {
  token: string
  roles: string[]
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })

  if (!response.ok) {
    let errorMsg = "Falha ao fazer login"
    try {
      const errorData = await response.json()
      if (errorData.message) {
        errorMsg = errorData.message
      }
    } catch {}
    throw new Error(errorMsg)
  }

  const data = await response.json()

  // Save token to cookie
  Cookies.set(TOKEN_COOKIE_NAME, data.token, COOKIE_OPTIONS)

  return data
}

export function getAuthToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE_NAME)
}
