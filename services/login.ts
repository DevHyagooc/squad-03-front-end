// src/services/auth.ts
const API_BASE_URL = "https://squad-03-back-end.onrender.com";

export type LoginCredentials = {
  email: string;
  senha: string;
};

/**
 * Faz login no back-end (POST /auth/login), salva o token em localStorage
 * e retorna o token recebido.
 * 
 * @param credentials Objeto contendo { email, senha }
 * @throws {Error} Em caso de resposta fora de 2xx ou erro de rede
 */
export async function login(credentials: LoginCredentials): Promise<string> {
  // Monta o corpo da requisição
  const body = JSON.stringify({
    email: credentials.email,
    senha: credentials.senha,
  });

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  // Se não for status 2xx, tenta ler a mensagem de erro e lança
  if (!response.ok) {
    let erroMsg = "Falha ao fazer login!";
    try {
      const jsonErro = await response.json();
      if (jsonErro && jsonErro.message) {
        erroMsg = jsonErro.message;
      }
    } catch {
      // ignora
    }
    throw new Error(erroMsg);
  }

  // Se tudo OK, espera o JSON com o token
  const { token } = await response.json();
  if (typeof token !== "string") {
    throw new Error("Resposta inesperada do servidor: token não encontrado");
  }

  // Salva o token em localStorage para que o fetchWithAuth o utilize depois
  localStorage.setItem("token", token);

  return token;
}

/**
 * (Opcional) Faz registro de usuário. Caso você queira usar mais tarde:
 * POST /auth/register
 */
export type RegisterCredentials = {
  email: string;
  senha: string;
};

export async function register(credentials: RegisterCredentials): Promise<void> {
  const body = JSON.stringify({
    email: credentials.email,
    senha: credentials.senha,
  });

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    let erroMsg = "Falha ao registrar usuário";
    try {
      const jsonErro = await response.json();
      if (jsonErro && jsonErro.message) {
        erroMsg = jsonErro.message;
      }
    } catch {
      // ignora
    }
    throw new Error(erroMsg);
  }

  // Se a rota retornar dados do usuário registrado, você pode retorná-los aqui
  return;
}

/**
 * (Opcional) Desloga o usuário: remove o token e redireciona para tela de login.
 */
export function logout(): void {
  localStorage.removeItem("token");
  window.location.href = "/PageLogin/login";
}
