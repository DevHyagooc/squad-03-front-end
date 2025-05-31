const BASE_URL = "https://squad-03-back-end.onrender.com"
const user = "admin"
const password = "admin123"
const auth = btoa(`${user}:${password}`)

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
})

// Interfaces para Agregados
export interface AgregadoRequest {
    funcao: string
    dataInicio: string
    dataFim: string | null
    contratoId: number
    colaboradorId: number
}

export interface AgregadoResponse {
    idAgregado: number
    funcao: string
    dataInicio: string
    dataFim: string | null
    contratoId: number
    colaboradorId: number
    colaborador: {
        idFuncionario: number
        nome: string
        email: string
        cargo: string
    }
    contrato: {
        idContrato: number
        numeroContrato: string
        descricao: string
    }
}

// Funções para API de Agregados
export async function createAgregado(agregado: AgregadoRequest): Promise<AgregadoResponse> {
    const response = await fetch(`${BASE_URL}/api/agregado`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(agregado),
    })

    if (!response.ok) {
        throw new Error(`Erro ao criar agregado: ${response.status}`)
    }

    return response.json()
}

export async function getAgregadosByContrato(contratoId: number): Promise<AgregadoResponse[]> {
    const response = await fetch(`${BASE_URL}/api/agregado/contrato/${contratoId}`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erro ao listar agregados: ${response.status}`)
    }

    return response.json()
}

export async function getContratosByColaborador(colaboradorId: number): Promise<AgregadoResponse[]> {
    const response = await fetch(`${BASE_URL}/api/agregado/colaborador/${colaboradorId}`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erro ao listar contratos do colaborador: ${response.status}`)
    }

    return response.json()
}

export async function updateAgregado(id: number, agregado: AgregadoRequest): Promise<AgregadoResponse> {
    const response = await fetch(`${BASE_URL}/api/agregado/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(agregado),
    })

    if (!response.ok) {
        throw new Error(`Erro ao atualizar agregado: ${response.status}`)
    }

    return response.json()
}

export async function deleteAgregado(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/agregado/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erro ao excluir agregado: ${response.status}`)
    }
}

export async function getColaboradorList(): Promise<Colaborador[]> {
    const response = await fetch(`${BASE_URL}/api/colaboradores`, {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erro ao obter lista de colaboradores: ${response.status}`)
    }

    return response.json()
}

export interface Colaborador {
    idFuncionario: number
    nome: string
    email: string
    cpf: string
    cargo: string
    telefone: string
    dataNascimento: string
}
