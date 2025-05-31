const BASE_URL = "https://squad-03-back-end.onrender.com"
const user = "admin"
const password = "admin123"
const auth = btoa(`${user}:${password}`)

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
})

// Interfaces para Repactuações
export interface RepactuacaoRequest {
    indice: string
    dataBase: string
    valorAnterior: number
    valorRepactuado: number
    justificativa: string
    contratoId: number
}

export interface RepactuacaoResponse {
    idRepactuacao: number
    indice: string
    dataBase: string
    valorAnterior: number
    valorRepactuado: number
    justificativa: string
    contratoId: number
    contrato: {
        idContrato: number
        numeroContrato: string
        descricao: string
    }
}

// Funções para API de Repactuações
export async function createRepactuacao(repactuacao: RepactuacaoRequest): Promise<RepactuacaoResponse> {
    const response = await fetch(`${BASE_URL}/api/repactuacao`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(repactuacao),
    })

    if (!response.ok) {
        throw new Error(`Erro ao criar repactuação: ${response.status}`)
    }

    return response.json()
}

export async function getRepactuacoesByContrato(contratoId: number): Promise<RepactuacaoResponse[]> {
    const response = await fetch(`${BASE_URL}/api/repactuacao/contrato/${contratoId}`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erro ao listar repactuações: ${response.status}`)
    }

    return response.json()
}

export async function getRepactuacao(id: number): Promise<RepactuacaoResponse> {
    const response = await fetch(`${BASE_URL}/api/repactuacao/${id}`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erro ao buscar repactuação: ${response.status}`)
    }

    return response.json()
}

export async function updateRepactuacao(id: number, repactuacao: RepactuacaoRequest): Promise<RepactuacaoResponse> {
    const response = await fetch(`${BASE_URL}/api/repactuacao/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(repactuacao),
    })

    if (!response.ok) {
        throw new Error(`Erro ao atualizar repactuação: ${response.status}`)
    }

    return response.json()
}

export async function deleteRepactuacao(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/repactuacao/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erro ao excluir repactuação: ${response.status}`)
    }
}
