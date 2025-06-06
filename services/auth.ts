// src/services/auth.ts (ou você pode criar um arquivo separado, por exemplo: src/utils/fetchWithAuth.ts)
const API_BASE_URL = "https://squad-03-back-end.onrender.com";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token ?? ""}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Se der 401, assume que o token está inválido/expirado → limpa e redireciona
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/PageLogin/login";
    throw new Error("Unauthorized");
  }

  return response;
}
