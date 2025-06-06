// src/services/agregadoService.ts

import { fetchWithAuth } from "@/services/auth";

export interface Agregado {
  // Defina aqui os campos do seu agregado, por exemplo:
  // id?: number;
  // nome: string;
  // contratoId: number;
  // ...
  [key: string]: any;
}

/**
 * Cria um novo agregado.
 * POST /api/agregado
 */
export const createAgregado = async (agregado: Agregado): Promise<Agregado> => {
  try {
    const response = await fetchWithAuth("/api/agregado", {
      method: "POST",
      body: JSON.stringify(agregado),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar agregado: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar agregado:", error);
    throw error;
  }
};

/**
 * Lista todos os agregados de um contrato específico.
 * GET /api/agregado/contrato/:contratoId
 */
export const getAgregadosByContrato = async (
  contratoId: string | number
): Promise<Agregado[]> => {
  try {
    const response = await fetchWithAuth(
      `/api/agregado/contrato/${contratoId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao listar agregados: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao listar agregados do contrato:", error);
    throw error;
  }
};

/**
 * Lista todos os contratos de um colaborador (por meio de “agregado”).
 * GET /api/agregado/colaborador/:colaboradorId
 */
export const getContratosByColaborador = async (
  colaboradorId: string | number
): Promise<any[]> => {
  try {
    const response = await fetchWithAuth(
      `/api/agregado/colaborador/${colaboradorId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao listar contratos do colaborador: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao listar contratos do colaborador:", error);
    throw error;
  }
};

/**
 * Atualiza um agregado existente.
 * PUT /api/agregado/:id
 */
export const updateAgregado = async (
  id: string | number,
  agregado: Agregado
): Promise<Agregado> => {
  try {
    const response = await fetchWithAuth(`/api/agregado/${id}`, {
      method: "PUT",
      body: JSON.stringify(agregado),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar agregado: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar agregado:", error);
    throw error;
  }
};

/**
 * Exclui um agregado pelo ID.
 * DELETE /api/agregado/:id
 */
export const deleteAgregado = async (id: string | number): Promise<string> => {
  try {
    const response = await fetchWithAuth(`/api/agregado/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir agregado: ${response.status}`);
    }

    return "Agregado excluído com sucesso!";
  } catch (error) {
    console.error("Erro ao excluir agregado:", error);
    throw error;
  }
};

/**
 * Lista todos os colaboradores.
 * GET /api/colaboradores
 */
export const getColaboradorList = async (): Promise<any[]> => {
  try {
    const response = await fetchWithAuth("/api/colaboradores", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao obter lista de colaboradores: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao obter lista de colaboradores:", error);
    throw error;
  }
};
