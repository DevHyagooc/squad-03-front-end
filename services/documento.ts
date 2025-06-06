// src/services/documentoService.ts

import { Documento } from "@/components/DocumentosContrato";
import { fetchWithAuth } from "@/services/auth";


/**
 * Lista todos os documentos de um contrato.
 * GET /api/documento/contrato/:contratoId
 */
export const getDocumentosByContrato = async (
  contratoId: number | string
): Promise<Documento[]> => {
  try {
    const response = await fetchWithAuth(
      `/api/documento/contrato/${contratoId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter documentos do contrato");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição GET documentos do contrato", error);
    throw error;
  }
};

/**
 * Faz o upload de um arquivo para um contrato específico.
 * POST /api/documento/upload?contratoId=:contratoId
 */
export const uploadDocumento = async (
  contratoId: number | string,
  file: File
): Promise<Documento> => {
  try {
    const token = localStorage.getItem("token") ?? "";
    const formData = new FormData();
    formData.append("file", file);

    const API_BASE_URL = "https://squad-03-back-end.onrender.com";
    const url = `${API_BASE_URL}/api/documento/upload?contratoId=${encodeURIComponent(
      contratoId.toString()
    )}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Não definimos Content-Type para que o navegador
        // marque corretamente como multipart/form-data
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer upload do documento");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no upload do documento", error);
    throw error;
  }
};

/**
 * Faz o download de um documento pelo ID.
 * GET /api/documento/:idDocumento/download
 */
export const downloadDocumento = async (idDocumento: number | string): Promise<Blob> => {
  try {
    const token = localStorage.getItem("token") ?? "";
    const API_BASE_URL = "https://squad-03-back-end.onrender.com";
    const url = `${API_BASE_URL}/api/documento/${idDocumento}/download`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer download do documento");
    }

    return await response.blob();
  } catch (error) {
    console.error("Erro no download do documento", error);
    throw error;
  }
};

/**
 * Deleta um documento pelo ID.
 * DELETE /api/documento/:id
 */
export const deleteDocumento = async (id: number | string): Promise<string> => {
  try {
    const response = await fetchWithAuth(`/api/documento/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar documento");
    }

    return "Documento deletado!";
  } catch (error) {
    console.error("Erro na requisição DELETE documento", error);
    throw error;
  }
};
