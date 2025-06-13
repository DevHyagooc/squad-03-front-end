// src/services/aditivoService.ts

import { fetchWithAuth } from "@/services/auth"
import { parseCookies } from "nookies"

// ─── Interfaces ───────────────────────────────────────────────────────────────
export interface AditivoRequest {
  tipo: string
  descricaoMudancas: string
  justificativa: string
  dataVigencia: string // formato "YYYY-MM-DD"
  contratoId: number
}

export interface AditivoDocumentoResponse {
  idDocumento: number
  nomeArquivo: string
  mimeType: string
  tamanho: number
  criadoEm: string
}

export interface AditivoResponse {
  idAditivoContractual: number
  tipo: string
  descricaoMudancas: string
  justificativa: string
  dataVigencia: string // formato "YYYY-MM-DD"
  criadoEm: string
  contratoSimplesDTO: {
    idContrato: number
    numeroContrato: string
    descricao: string
  }
  documentos: AditivoDocumentoResponse[]
}

// ─── 1. CRIAR ADITIVO ────────────────────────────────────────────────────────────
export async function createAditivo(aditivo: AditivoRequest): Promise<AditivoResponse> {
  const response = await fetchWithAuth("/api/aditivo", {
    method: "POST",
    body: JSON.stringify(aditivo),
  })

  if (!response.ok) {
    throw new Error(`Erro ao criar aditivo: ${response.status}`)
  }
  return response.json()
}

// ─── 2. ATUALIZAR ADITIVO ────────────────────────────────────────────────────────
export async function updateAditivo(idAditivo: number, aditivo: AditivoRequest): Promise<AditivoResponse> {
  const response = await fetchWithAuth(`/api/aditivo/${idAditivo}`, {
    method: "PUT",
    body: JSON.stringify(aditivo),
  })

  if (!response.ok) {
    throw new Error(`Erro ao atualizar aditivo: ${response.status}`)
  }
  return response.json()
}

// ─── 3. DELETAR ADITIVO ──────────────────────────────────────────────────────────
export async function deleteAditivo(idAditivo: number): Promise<void> {
  const response = await fetchWithAuth(`/api/aditivo/${idAditivo}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Erro ao excluir aditivo: ${response.status}`)
  }
  // não retorna corpo, apenas status 204 ou 200
}

// ─── 4. UPLOAD DE DOCUMENTO DE ADITIVO ───────────────────────────────────────────
// (usamos fetch "na mão" para não forçar Content-Type)
export async function uploadAditivoDocument(
  idAditivoContractual: number,
  file: File,
): Promise<AditivoDocumentoResponse> {
  // Get token from cookies instead of localStorage
  const cookies = parseCookies()
  const token = cookies["auth_token"] ?? ""

  const formData = new FormData()
  formData.append("file", file)

  const url = `/api/aditivo/documento/upload?aditivoId=${encodeURIComponent(idAditivoContractual.toString())}`

  // Em Next.js, "window.origin" não existe no SSR,
  // então melhor pegar a base com a mesma constante usada em fetchWithAuth:
  const API_BASE_URL = "https://squad-03-back-end.onrender.com"
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Não setamos Content-Type: multipart/form-data
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Erro ao anexar documento: ${response.status}`)
  }
  return response.json()
}

// ─── 5. LISTAR DOCUMENTOS DE UM ADITIVO ────────────────────────────────────────
export async function getAditivoDocuments(aditivoId: number): Promise<AditivoDocumentoResponse[]> {
  const response = await fetchWithAuth(`/api/aditivo/documento/aditivo/${aditivoId}`, { method: "GET" })

  if (!response.ok) {
    throw new Error(`Erro ao listar documentos: ${response.status}`)
  }
  return response.json()
}

// ─── 6. DOWNLOAD DE DOCUMENTO DE ADITIVO ───────────────────────────────────────
export async function downloadAditivoDocument(documentoId: number): Promise<Blob> {
  // Get token from cookies instead of localStorage
  const cookies = parseCookies()
  const token = cookies["auth_token"] ?? ""

  const API_BASE_URL = "https://squad-03-back-end.onrender.com"

  const response = await fetch(`${API_BASE_URL}/api/aditivo/documento/${documentoId}/download`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      // Não setamos Content-Type, pois o navegador cuidará disso
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao baixar documento: ${response.status}`)
  }
  return response.blob()
}

// ─── 7. DELETAR DOCUMENTO DE ADITIVO ──────────────────────────────────────────
export async function deleteAditivoDocument(documentoId: number): Promise<void> {
  const response = await fetchWithAuth(`/api/aditivo/documento/${documentoId}`, { method: "DELETE" })

  if (!response.ok) {
    throw new Error(`Erro ao excluir documento: ${response.status}`)
  }
}

// ─── 8. LISTAR ADITIVOS DE UM CONTRATO ────────────────────────────────────────
export async function getAditivosByContrato(contratoId: number): Promise<AditivoResponse[]> {
  const response = await fetchWithAuth(`/api/aditivo/contrato/${contratoId}`, {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error(`Erro ao listar aditivos: ${response.status}`)
  }
  return response.json()
}
