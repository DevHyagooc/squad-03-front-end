// src/services/auth.ts
import Cookies from "js-cookie";

const API_BASE_URL = "https://squad-03-back-end.onrender.com";
//const API_BASE_URL = "http://localhost:8080"

export type LoginCredentials = {
  email: string;
  senha: string;
};

/**
 * Faz login no back-end, salva o token em cookie como `auth_token`
 * e retorna o token recebido.
 */
export async function login(
  credentials: LoginCredentials
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let erroMsg = "Falha ao fazer login!";
    try {
      const jsonErro = await response.json();
      if (jsonErro?.message) erroMsg = jsonErro.message;
    } catch {
      // swallow
    }
    throw new Error(erroMsg);
  }

  const { token } = await response.json();
  if (typeof token !== "string") {
    throw new Error("Resposta inesperada do servidor: token não encontrado");
  }

  // Salva o token em cookie como `auth_token`
  Cookies.set("auth_token", token, {
    expires: 7,        // expira em 7 dias
    path: "/",         // disponível em todo o site
    secure: true,      // só em HTTPS
    sameSite: "lax",   // proteção CSRF
  });

  return token;
}

/**
 * Faz registro de usuário.
 */
export type RegisterCredentials = {
  email: string;
  senha: string;
};

export async function register(
  credentials: RegisterCredentials
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let erroMsg = "Falha ao registrar usuário";
    try {
      const jsonErro = await response.json();
      if (jsonErro?.message) erroMsg = jsonErro.message;
    } catch {
      // swallow
    }
    throw new Error(erroMsg);
  }
}

/**
 * Desloga o usuário: remove o cookie `auth_token` e redireciona para login.
 */
export function logout(): void {
  Cookies.remove("auth_token", { path: "/" });
  window.location.href = "/PageLogin/login";
}

/**
 * Helper para fazer fetch com o token que está em `auth_token`
 */
export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const token = Cookies.get("auth_token");
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  return fetch(input, {
    ...init,
    headers,
    credentials: "include", // envia cookies também, se quiser
  });
}
