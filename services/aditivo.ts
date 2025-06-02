const BASE_URL = "https://squad-03-back-end.onrender.com";
const user = "admin";
const password = "admin123";
const auth = btoa(`${user}:${password}`);

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Basic ${auth}`,
});

const getFormDataHeaders = () => ({
  Authorization: `Basic ${auth}`,
});

// Interfaces para Aditivos
export interface AditivoRequest {
  tipo: string;
  descricaoMudancas: string;
  justificativa: string;
  dataVigencia: string; // formato "YYYY-MM-DD"
  contratoId: number;
}

export interface AditivoDocumentoResponse {
  idDocumento: number;
  nomeArquivo: string;
  mimeType: string;
  tamanho: number;
  criadoEm: string;
}

export interface AditivoResponse {
  idAditivoContractual: number;
  tipo: string;
  descricaoMudancas: string;
  justificativa: string;
  dataVigencia: string; // formato "YYYY-MM-DD"
  criadoEm: string;
  contratoSimplesDTO: {
    idContrato: number;
    numeroContrato: string;
    descricao: string;
  };
  documentos: AditivoDocumentoResponse[];
}

// ─── 1. CRIAR ADITIVO ─────────────────────────────────────────────────────────
export async function createAditivo(
  aditivo: AditivoRequest
): Promise<AditivoResponse> {
  const response = await fetch(`${BASE_URL}/api/aditivo`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(aditivo),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar aditivo: ${response.status}`);
  }
  return response.json();
}

// ─── 2. ATUALIZAR ADITIVO ─────────────────────────────────────────────────────
export async function updateAditivo(
  idAditivo: number,
  aditivo: AditivoRequest
): Promise<AditivoResponse> {
  const response = await fetch(`${BASE_URL}/api/aditivo/${idAditivo}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(aditivo),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar aditivo: ${response.status}`);
  }
  return response.json();
}

// ─── 3. DELETAR ADITIVO ───────────────────────────────────────────────────────
export async function deleteAditivo(idAditivo: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/aditivo/${idAditivo}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Erro ao excluir aditivo: ${response.status}`);
  }
  // não retorna corpo, apenas status 204 ou 200
}

// ─── 4. UPLOAD DE DOCUMENTO DE ADITIVO ────────────────────────────────────────
export async function uploadAditivoDocument(
  idAditivoContractual: number,
  file: File
): Promise<AditivoDocumentoResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${BASE_URL}/api/aditivo/documento/upload?aditivoId=${encodeURIComponent(
    idAditivoContractual.toString()
  )}`;

  const response = await fetch(url, {
    method: "POST",
    headers: getFormDataHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro ao anexar documento: ${response.status}`);
  }
  return response.json();
}

// ─── 5. LISTAR DOCUMENTOS DE UM ADITIVO ───────────────────────────────────────
export async function getAditivoDocuments(
  aditivoId: number
): Promise<AditivoDocumentoResponse[]> {
  const response = await fetch(
    `${BASE_URL}/api/aditivo/documento/aditivo/${aditivoId}`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao listar documentos: ${response.status}`);
  }
  return response.json();
}

// ─── 6. DOWNLOAD DE DOCUMENTO DE ADITIVO ──────────────────────────────────────
export async function downloadAditivoDocument(
  documentoId: number
): Promise<Blob> {
  const response = await fetch(
    `${BASE_URL}/api/aditivo/documento/${documentoId}/download`,
    {
      headers: getFormDataHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao baixar documento: ${response.status}`);
  }
  return response.blob();
}

// ─── 7. DELETAR DOCUMENTO DE ADITIVO ─────────────────────────────────────────
export async function deleteAditivoDocument(documentoId: number): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/api/aditivo/documento/${documentoId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao excluir documento: ${response.status}`);
  }
}

// ─── 8. LISTAR ADITIVOS DE UM CONTRATO ────────────────────────────────────────
export async function getAditivosByContrato(
  contratoId: number
): Promise<AditivoResponse[]> {
  const response = await fetch(
    `${BASE_URL}/api/aditivo/contrato/${contratoId}`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao listar aditivos: ${response.status}`);
  }
  return response.json();
}
