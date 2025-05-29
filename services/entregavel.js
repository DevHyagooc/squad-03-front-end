const BASE_URL = 'https://squad-03-back-end.onrender.com'
const user = 'admin'
const password = 'admin123'
const auth = btoa(`${user}:${password}`)

export const getEntregavelList = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/entregaveis`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
        if (!res.ok) {
            throw new Error('Erro ao obter lista de entregáveis')
        }
        return res.json();
    } catch (error) {
        console.error('Erro na requisição GET list:', error)
        throw error
    }
}

export const getEntregavelId = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/api/entregaveis/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })

        if (!res.ok) {
            throw new Error(`Erro ao obter entregável com id ${id}`)
        }

        return res.json()
    } catch (error) {
        console.error('Erro na requisição GET por id:', error)
        throw error
    }
}

export const postEntregavel = async (ent) => {
    try {
        const res = await fetch(`${BASE_URL}/api/entregaveis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify({
                // nome: ent.nome,
                descricao: ent.descricao,
                prazoEntrega: ent.prazoEntrega,
                status: ent.status,
                responsavelId: ent.responsavelId,
                contratoId: ent.contratoId
            })
        })

        if (!res.ok) {
            throw new Error('Erro ao criar entregável!')
        }

        return res.json()
    } catch (error) {
        console.error('Erro na requisição POST:', error)
        throw error
    }
}

export const updateEntregavel = async (id, entregavel) => {
    try {
        const res = await fetch(`${BASE_URL}/api/entregaveis/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(entregavel)
        })

        if (!res.ok) {
            throw new Error(`Erro ao atualizar entregável ${id}!`)
        }

        return 'Entregável atualizado!'
    } catch (error) {
        console.error('Erro na requisição PUT:', error)
        throw error
    }
}


export const deleteEntregavel = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/api/entregaveis/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
        if (!res.ok) {
            throw new Error(`Erro ao deletar entregável ${id}!`)
        }
        return 'Entregável deletado!'
    } catch (error) {
        console.error('Erro na requisição DELETE:', error)
        throw error
    }
}

export const getEntregaveisByContratoId = async (contratoId) => {
    try {
        const res = await fetch(`${BASE_URL}/api/entregaveis/contratos/${contratoId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
        if (!res.ok) {
            throw new Error(`Erro ao buscar entregáveis do contrato ${contratoId}`)
        }
        return res.json()
    } catch (error) {
        console.error('Erro na requisição GET por contratoId:', error)
        throw error
    }
}