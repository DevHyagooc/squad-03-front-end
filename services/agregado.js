const BASE_URL = "https://squad-03-back-end.onrender.com"
const user = "admin"
const password = "admin123"
const auth = btoa(`${user}:${password}`)

// Criar agregado
export const createAgregado = async (agregado) => {
  try {
    const response = await fetch(`${BASE_URL}/api/agregado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(agregado),
    })

    if (!response.ok) {
      throw new Error(`Erro ao criar agregado: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Erro ao criar agregado:", error)
    throw error
  }
}

// Listar agregados de um contrato
export const getAgregadosByContrato = async (contratoId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/agregado/contrato/${contratoId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao listar agregados: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Erro ao listar agregados do contrato:", error)
    throw error
  }
}

// Listar contratos de um colaborador
export const getContratosByColaborador = async (colaboradorId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/agregado/colaborador/${colaboradorId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao listar contratos do colaborador: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Erro ao listar contratos do colaborador:", error)
    throw error
  }
}

// Atualizar agregado
export const updateAgregado = async (id, agregado) => {
  try {
    const response = await fetch(`${BASE_URL}/api/agregado/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(agregado),
    })

    if (!response.ok) {
      throw new Error(`Erro ao atualizar agregado: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Erro ao atualizar agregado:", error)
    throw error
  }
}

// Deletar agregado
export const deleteAgregado = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/agregado/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao excluir agregado: ${response.status}`)
    }

    return "Agregado excluído com sucesso!"
  } catch (error) {
    console.error("Erro ao excluir agregado:", error)
    throw error
  }
}

// Listar colaboradores
export const getColaboradorList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/colaboradores`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao obter lista de colaboradores: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Erro ao obter lista de colaboradores:", error)
    throw error
  }
}
