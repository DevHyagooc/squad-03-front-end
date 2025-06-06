// src/services/repactuacaoService.ts

import { fetchWithAuth } from "@/services/auth";

export interface RepactuacaoRequest {
  indice: string;
  dataBase: string;
  valorAnterior: number;
  valorRepactuado: number;
  justificativa: string;
  contratoId: number;
}

export interface RepactuacaoResponse {
  idRepactuacao: number;
  indice: string;
  dataBase: string;
  valorAnterior: number;
  valorRepactuado: number;
  justificativa: string;
  contratoId: number;
  contrato: {
    idContrato: number;
    numeroContrato: string;
    descricao: string;
  };
}

/**
 * Cria uma nova repactuação.
 * POST /api/repactuacao
 */
export async function createRepactuacao(
  repactuacao: RepactuacaoRequest
): Promise<RepactuacaoResponse> {
  const response = await fetchWithAuth("/api/repactuacao", {
    method: "POST",
    body: JSON.stringify(repactuacao),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar repactuação: ${response.status}`);
  }

  return response.json();
}

/**
 * Lista todas as repactuações de um determinado contrato.
 * GET /api/repactuacao/contrato/:contratoId
 */
export async function getRepactuacoesByContrato(
  contratoId: number
): Promise<RepactuacaoResponse[]> {
  const response = await fetchWithAuth(
    `/api/repactuacao/contrato/${contratoId}`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error(`Erro ao listar repactuações: ${response.status}`);
  }

  return response.json();
}

/**
 * Busca uma repactuação específica pelo ID.
 * GET /api/repactuacao/:id
 */
export async function getRepactuacao(
  id: number
): Promise<RepactuacaoResponse> {
  const response = await fetchWithAuth(`/api/repactuacao/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar repactuação: ${response.status}`);
  }

  return response.json();
}

/**
 * Atualiza uma repactuação existente.
 * PUT /api/repactuacao/:id
 */
export async function updateRepactuacao(
  id: number,
  repactuacao: RepactuacaoRequest
): Promise<RepactuacaoResponse> {
  const response = await fetchWithAuth(`/api/repactuacao/${id}`, {
    method: "PUT",
    body: JSON.stringify(repactuacao),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar repactuação: ${response.status}`);
  }

  return response.json();
}

/**
 * Exclui uma repactuação pelo ID.
 * DELETE /api/repactuacao/:id
 */
export async function deleteRepactuacao(id: number): Promise<void> {
  const response = await fetchWithAuth(`/api/repactuacao/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao excluir repactuação: ${response.status}`);
  }
}
