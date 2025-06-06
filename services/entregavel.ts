// src/services/entregavelService.ts

import { Entregavel } from "@/components/KanbanContrato";
import { fetchWithAuth } from "@/services/auth";
/**
 * Retorna a lista completa de entregáveis.
 * GET /api/entregaveis
 */
export const getEntregavelList = async (): Promise<Entregavel[]> => {
  try {
    const res = await fetchWithAuth("/api/entregaveis", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Erro ao obter lista de entregáveis");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro na requisição GET list:", error);
    throw error;
  }
};

/**
 * Retorna um único entregável pelo ID.
 * GET /api/entregaveis/:id
 */
export const getEntregavelById = async (id: string | number): Promise<Entregavel> => {
  try {
    const res = await fetchWithAuth(`/api/entregaveis/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Erro ao obter entregável com id ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro na requisição GET por id:", error);
    throw error;
  }
};

/**
 * Cria um novo entregável.
 * POST /api/entregaveis
 */
export const postEntregavel = async (ent: Entregavel): Promise<Entregavel> => {
  try {
    const payload = {
      titulo: ent.titulo,
      descricao: ent.descricao,
      prazoEntrega: ent.prazoEntrega,
      status: ent.status,
      responsavelId: ent.responsavelId,
      contratoId: ent.contratoId,
    };

    const res = await fetchWithAuth("/api/entregaveis", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Erro ao criar entregável!");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro na requisição POST:", error);
    throw error;
  }
};

/**
 * Atualiza um entregável existente pelo ID.
 * PUT /api/entregaveis/:id
 */
export const updateEntregavel = async (
  id: string | number,
  entregavel: Partial<Entregavel>
): Promise<string> => {
  try {
    const res = await fetchWithAuth(`/api/entregaveis/${id}`, {
      method: "PUT",
      body: JSON.stringify(entregavel),
    });

    if (!res.ok) {
      throw new Error(`Erro ao atualizar entregável ${id}!`);
    }

    return "Entregável atualizado!";
  } catch (error) {
    console.error("Erro na requisição PUT:", error);
    throw error;
  }
};

/**
 * Deleta um entregável pelo ID.
 * DELETE /api/entregaveis/:id
 */
export const deleteEntregavel = async (id: string | number): Promise<string> => {
  try {
    const res = await fetchWithAuth(`/api/entregaveis/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Erro ao deletar entregável ${id}!`);
    }

    return "Entregável deletado!";
  } catch (error) {
    console.error("Erro na requisição DELETE:", error);
    throw error;
  }
};

/**
 * Retorna todos os entregáveis de um contrato específico.
 * GET /api/entregaveis/contratos/:contratoId
 */
export const getEntregaveisByContratoId = async (
  contratoId: string | number
): Promise<Entregavel[]> => {
  try {
    const res = await fetchWithAuth(`/api/entregaveis/contratos/${contratoId}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar entregáveis do contrato ${contratoId}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro na requisição GET por contratoId:", error);
    throw error;
  }
};
