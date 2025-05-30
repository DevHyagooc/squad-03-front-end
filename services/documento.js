const BASE_URL = "https://squad-03-back-end.onrender.com"
const user = "admin"
const password = "admin123"
const auth = btoa(`${user}:${password}`)

// Listar documentos de um contrato
export const getDocumentosByContrato = async (contratoId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/documento/contrato/${contratoId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    })
    if (!response.ok) {
      throw new Error("Erro ao obter documentos do contrato")
    }
    return response.json()
  } catch (error) {
    console.error("Erro na requisição GET documentos do contrato", error)
    throw error
  }
}

// Upload de documento
export const uploadDocumento = async (contratoId, file) => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${BASE_URL}/api/documento/upload?contratoId=${contratoId}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Erro ao fazer upload do documento")
    }
    return response.json()
  } catch (error) {
    console.error("Erro no upload do documento", error)
    throw error
  }
}

// Download de documento
export const downloadDocumento = async (idDocumento) => {
  try {
    const response = await fetch(`${BASE_URL}/api/documento/${idDocumento}/download`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erro ao fazer download do documento")
    }

    // Retorna o blob para download
    const blob = await response.blob()
    return blob
  } catch (error) {
    console.error("Erro no download do documento", error)
    throw error
  }
}

// Deletar documento
export const deleteDocumento = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/documento/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })
    if (!response.ok) {
      throw new Error("Erro ao deletar documento")
    }
    return "Documento deletado!"
  } catch (error) {
    console.error("Erro na requisição DELETE documento", error)
    throw error
  }
}
