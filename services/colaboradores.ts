import { Colaborador } from "@/app/pageInterna/colaboradores/page";
import { fetchWithAuth } from "@/services/auth";

/**
 * POST /api/colaboradores
 * Cria um novo colaborador.
 */
export const postColaborador = async (
  colaborador: Colaborador
): Promise<Colaborador> => {
  try {
    const payload: Colaborador = {
      nome: colaborador.nome,
      email: colaborador.email,
      cpf: colaborador.cpf,
      cargo: colaborador.cargo,
      telefone: colaborador.telefone,
      dataNascimento: colaborador.dataNascimento,
    };

    const response = await fetchWithAuth("/api/colaboradores", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar colaborador!");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição POST /api/colaboradores:", error);
    throw error;
  }
};

/**
 * GET /api/colaboradores
 * Retorna a lista completa de colaboradores.
 */
export const getColaboradorList = async (): Promise<Colaborador[]> => {
  try {
    const response = await fetchWithAuth("/api/colaboradores", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter lista de colaboradores!");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição GET /api/colaboradores:", error);
    throw error;
  }
};

/**
 * GET /api/colaboradores/:id
 * Retorna um colaborador pelo ID.
 */
export const getColaboradorById = async (
  id: number | string
): Promise<Colaborador> => {
  try {
    const response = await fetchWithAuth(`/api/colaboradores/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter colaborador!");
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na requisição GET /api/colaboradores/${id}:`, error);
    throw error;
  }
};

/**
 * PUT /api/colaboradores/:id
 * Atualiza um colaborador existente.
 */
export const updateColaborador = async (
  id: number | string,
  colaborador: Partial<Colaborador>
): Promise<Colaborador> => {
  try {
    const response = await fetchWithAuth(`/api/colaboradores/${id}`, {
      method: "PUT",
      body: JSON.stringify(colaborador),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar colaborador!");
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na requisição PUT /api/colaboradores/${id}:`, error);
    throw error;
  }
};

/**
 * DELETE /api/colaboradores/:id
 * Exclui um colaborador pelo ID.
 */
export const deleteColaborador = async (
  id: number | string
): Promise<string> => {
  try {
    const response = await fetchWithAuth(`/api/colaboradores/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar colaborador!");
    }

    return "Colaborador deletado!";
  } catch (error) {
    console.error(`Erro na requisição DELETE /api/colaboradores/${id}:`, error);
    throw error;
  }
};
