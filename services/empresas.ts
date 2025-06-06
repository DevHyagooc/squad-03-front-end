// src/services/empresaService.ts

import { Empresa } from "@/app/pageInterna/empresas/page";
import { fetchWithAuth } from "@/services/auth";

/**
 * GET /api/empresa
 * Retorna a lista completa de empresas.
 */
export const getEmpresaList = async (): Promise<Empresa[]> => {
  try {
    const response = await fetchWithAuth("/api/empresa", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter lista de empresas");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição GET /api/empresa:", error);
    throw error;
  }
};

/**
 * GET /api/empresa/:id
 * Retorna uma empresa pelo ID.
 */
export const getEmpresaById = async (
  id: number | string
): Promise<Empresa> => {
  try {
    const response = await fetchWithAuth(`/api/empresa/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter empresa!");
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na requisição GET /api/empresa/${id}:`, error);
    throw error;
  }
};

/**
 * DELETE /api/empresa/:id
 * Exclui uma empresa pelo ID.
 */
export const deleteEmpresa = async (id: number | string): Promise<string> => {
  try {
    const response = await fetchWithAuth(`/api/empresa/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar empresa!");
    }

    return "Empresa deletada!";
  } catch (error) {
    console.error(`Erro na requisição DELETE /api/empresa/${id}:`, error);
    throw error;
  }
};

/**
 * PUT /api/empresa/:id
 * Atualiza uma empresa existente.
 */
export const updateEmpresa = async (
  id: number | string,
  emp: Partial<Empresa>
): Promise<string> => {
  try {
    const response = await fetchWithAuth(`/api/empresa/${id}`, {
      method: "PUT",
      body: JSON.stringify(emp),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar empresa!");
    }

    return "Empresa atualizada!";
  } catch (error) {
    console.error(`Erro na requisição PUT /api/empresa/${id}:`, error);
    throw error;
  }
};

/**
 * POST /api/empresa
 * Cria uma nova empresa.
 */
export const postEmpresa = async (
  emp: Empresa
): Promise<Empresa> => {
  try {
    // Monta o payload exatamente como sua API espera
    const payload: Empresa = {
      idOrgao: emp.idOrgao,
      nomeFantasia: emp.nomeFantasia,
      razaoSocial: emp.razaoSocial,
      cnpj: emp.cnpj,
      estado: emp.estado,
      cidade: emp.cidade,
      inscricaoMunicipal: emp.inscricaoMunicipal,
      tipoEmpresa: emp.tipoEmpresa,
      cep: emp.cep,
      bairro: emp.bairro,
      logradouro: emp.logradouro,
      numero: emp.numero,
      complemento: emp.complemento,
      email: emp.email,
      telefone: emp.telefone,
      representantes: emp.representantes,
    };

    const response = await fetchWithAuth("/api/empresa", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar empresa!");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição POST /api/empresa:", error);
    throw error;
  }
};
