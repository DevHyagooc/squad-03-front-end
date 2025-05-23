const BASE_URL = 'https://squad-03-back-end.onrender.com'
const user = 'admin'
const password = 'admin123'
const auth = btoa(`${user}:${password}`);

export const getOrgaoContratanteList = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/orgao-contratante`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter lista de orgaos contratantes')
        }
        return response.json();
    } catch (error) {
        console.error('Erro na requisição GET:', error);
        throw error;
    }
};

export const getOrgaoContratanteId = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/orgao-contratante/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter orgão contratante!');
        }
        return response.json();
    } catch (error) {
        console.error('Erro na requisição GET', error);
        throw error;
    }
};

export const deleteOrgaoContratante = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/orgao-contratante/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar orgão contratante!');
        }
        return 'Orgão deletado!';
    } catch (error) {
        console.error('Erro na requisição DELETE:', error)
        throw error;
    }
};

export const updateOrgaoContratante = async (id, org ) => {
    try {
        const response = await fetch(`${BASE_URL}/api/orgao-contratante/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(org)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar orgão contratante!');
        }
        return 'Orgão editado!';
    } catch (error) {
        console.error('Erro na requisição PUT', error)
        throw error;
    }
};