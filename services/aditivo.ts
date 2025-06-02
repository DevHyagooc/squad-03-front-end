const BASE_URL = "https://squad-03-back-end.onrender.com"
const user = "admin"
const password = "admin123"
const auth = btoa(`${user}:${password}`)

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
})

const getFormDataHeaders = () => ({
    Authorization: `Basic ${auth}`,
})

// Interfaces para Aditivos
export interface AditivoRequest {
    tipo: string
    descricaoMudancas: string
    justificativa: string
    dataVigencia: string
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
    dataVigencia: string
    criadoEm: string
    contratoSimplesDTO: {
        idContrato: number
        numeroContrato: string
        descricao: string
    }
    documentos: AditivoDocumentoResponse[]
}

// Funções para API de Aditivos

export async function createAditivo(aditivo: AditivoRequest): Promise<AditivoResponse> {
    const response = await fetch(`${BASE_URL}/api/aditivo`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(aditivo),
    })

    if (!response.ok) {
        throw new Error(`Erro ao criar aditivo: ${response.status}`)
    }

    return response.json()
}

// Atenção: aqui foi alterado para enviar 'aditivoId' como parâmetro de query e só enviar o file no FormData
export async function uploadAditivoDocument(
    idAditivoContractual: number,
    file: File
): Promise<AditivoDocumentoResponse> {
    // Cria um FormData só com o arquivo
    const formData = new FormData()
    formData.append("file", file)

    // Monta a URL com ?aditivoId=...
    const url = `${BASE_URL}/api/aditivo/documento/upload?aditivoId=${encodeURIComponent(
        idAditivoContractual.toString()
    )}`

    const response = await fetch(url, {
        method: "POST",
        headers: getFormDataHeaders(), // somente Authorization; o browser define o Content-Type multipart/form-data corretamente
        body: formData,
    })

    if (!response.ok) {
        throw new Error(`Erro ao anexar documento: ${response.status}`)
    }

    return response.json()
}

export async function getAditivoDocuments(
    aditivoId: number
): Promise<AditivoDocumentoResponse[]> {
    const response = await fetch(
        `${BASE_URL}/api/aditivo/documento/aditivo/${aditivoId}`,
        {
            headers: getHeaders(),
        }
    )

    if (!response.ok) {
        throw new Error(`Erro ao listar documentos: ${response.status}`)
    }

    return response.json()
}

export async function downloadAditivoDocument(documentoId: number): Promise<Blob> {
    const response = await fetch(
        `${BASE_URL}/api/aditivo/documento/${documentoId}/download`,
        {
            headers: getFormDataHeaders(),
        }
    )

    if (!response.ok) {
        throw new Error(`Erro ao baixar documento: ${response.status}`)
    }

    return response.blob()
}

export async function deleteAditivoDocument(documentoId: number): Promise<void> {
    const response = await fetch(
        `${BASE_URL}/api/aditivo/documento/${documentoId}`,
        {
            method: "DELETE",
            headers: getHeaders(),
        }
    )

    if (!response.ok) {
        throw new Error(`Erro ao excluir documento: ${response.status}`)
    }
}

export async function getAditivosByContrato(
    contratoId: number
): Promise<AditivoResponse[]> {
    const response = await fetch(
        `${BASE_URL}/api/aditivo/contrato/${contratoId}`,
        {
            headers: getHeaders(),
        }
    )

    if (!response.ok) {
        throw new Error(`Erro ao listar aditivos: ${response.status}`)
    }

    return response.json()
}
