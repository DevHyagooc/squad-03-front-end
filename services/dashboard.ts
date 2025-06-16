import { fetchWithAuth } from "./auth"

// ===== TIPOS DE DADOS =====

export type Contrato = {
  id: number
  titulo: string
  descricao: string
  dataInicio: string
  dataFim: string
  status: string
  valorContrato: number
  empresaId: number
  arquivado: boolean
  // Adicione outros campos conforme sua API
}

export type Entregavel = {
  idEntregavel: number
  titulo: string
  descricao: string
  prazoEntrega: string
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDO" | "ATRASADO"
  responsavelId: number
  contratoId: number
}

export type DashboardMetrics = {
  contratosAtivos: number
  entregaveisPendentes: number
  contratosFinalizados: number
  notificacesUrgentes: number
}

// ===== SERVIÇOS DE CONTRATOS =====

/**
 * Lista todos os contratos
 * GET /api/contrato
 */
export async function getAllContratos(): Promise<Contrato[]> {
  const response = await fetchWithAuth(`/api/contrato`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar contratos"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  return await response.json()
}

/**
 * Lista contratos não arquivados
 * GET /api/contrato/nao-arquivados
 */
export async function getContratosAtivos(): Promise<Contrato[]> {
  const response = await fetchWithAuth(`/api/contrato/nao-arquivados`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar contratos ativos"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  return await response.json()
}

/**
 * Lista contratos arquivados
 * GET /api/contrato/arquivados
 */
export async function getContratosArquivados(): Promise<Contrato[]> {
  const response = await fetchWithAuth(`/api/contrato/arquivados`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar contratos arquivados"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  return await response.json()
}

/**
 * Lista contratos por status
 * GET /api/contrato/status/{status}
 */
export async function getContratosByStatus(status: string): Promise<Contrato[]> {
  const response = await fetchWithAuth(`/api/contrato/status/${encodeURIComponent(status)}`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar contratos por status"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  return await response.json()
}

// ===== SERVIÇOS DE ENTREGÁVEIS =====

/**
 * Lista todos os entregáveis
 * GET /api/entregaveis
 */
export async function getAllEntregaveis(): Promise<Entregavel[]> {
  const response = await fetchWithAuth(`/api/entregaveis`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar entregáveis"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  return await response.json()
}

/**
 * Lista entregáveis por contrato
 * GET /api/entregaveis/contratos/{contratoId}
 */
export async function getEntregaveisByContrato(contratoId: number): Promise<Entregavel[]> {
  const response = await fetchWithAuth(`/api/entregaveis/contratos/${contratoId}`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar entregáveis do contrato"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  return await response.json()
}

/**
 * Lista entregáveis por responsável
 * GET /api/entregaveis/responsaveis/{responsavelId}
 */
export async function getEntregaveisByResponsavel(responsavelId: number): Promise<Entregavel[]> {
  const response = await fetchWithAuth(`/api/entregaveis/responsaveis/${responsavelId}`)

  if (!response.ok) {
    let errorMsg = "Erro ao buscar entregáveis do responsável"
    try {
      const errorJson = await response.json()
      if (errorJson?.message) {
        errorMsg = errorJson.message
      }
    } catch {
      // ignora erro de parsing
    }
    throw new Error(errorMsg)
  }

  return await response.json()
}

// ===== FUNÇÕES UTILITÁRIAS =====

/**
 * Calcula métricas do dashboard baseado nos dados
 */
export function calculateDashboardMetrics(contratos: Contrato[], entregaveis: Entregavel[]): DashboardMetrics {
  const contratosAtivos = contratos.filter((c) => !c.arquivado).length
  const entregaveisPendentes = entregaveis.filter((e) => e.status === "PENDENTE" || e.status === "EM_ANDAMENTO").length
  const contratosFinalizados = contratos.filter((c) => c.arquivado).length

  // Entregáveis com prazo próximo (próximos 7 dias) ou atrasados
  const hoje = new Date()
  const proximosSete = new Date()
  proximosSete.setDate(hoje.getDate() + 7)

  const notificacesUrgentes = entregaveis.filter((e) => {
    const prazo = new Date(e.prazoEntrega)
    return e.status !== "CONCLUIDO" && (prazo < hoje || (prazo >= hoje && prazo <= proximosSete))
  }).length

  return {
    contratosAtivos,
    entregaveisPendentes,
    contratosFinalizados,
    notificacesUrgentes,
  }
}

/**
 * Formata data para exibição
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

/**
 * Verifica se um entregável está próximo do prazo (próximos 30 dias)
 */
export function isEntregavelProximo(entregavel: Entregavel): boolean {
  const hoje = new Date()
  const proximosTrinta = new Date()
  proximosTrinta.setDate(hoje.getDate() + 30)

  const prazo = new Date(entregavel.prazoEntrega)
  return prazo >= hoje && prazo <= proximosTrinta && entregavel.status !== "CONCLUIDO"
}

/**
 * Formata status do entregável para exibição
 */
export function formatEntregavelStatus(status: string): { label: string; className: string } {
  switch (status) {
    case "PENDENTE":
      return { label: "Pendente", className: "bg-gray-100 text-gray-800" }
    case "EM_ANDAMENTO":
      return { label: "Em andamento", className: "bg-blue-100 text-blue-800" }
    case "CONCLUIDO":
      return { label: "Concluído", className: "bg-green-100 text-green-800" }
    case "ATRASADO":
      return { label: "Atrasado", className: "bg-red-100 text-red-800" }
    default:
      return { label: status, className: "bg-gray-100 text-gray-800" }
  }
}

/**
 * Formata status do contrato para exibição
 */
export function formatContratoStatus(contrato: Contrato): { label: string; className: string } {
  if (contrato.arquivado) {
    return { label: "Finalizado", className: "bg-gray-100 text-gray-800" }
  }

  // Você pode adicionar mais lógica baseada no status do contrato
  return { label: "Ativo", className: "bg-green-100 text-green-800" }
}
