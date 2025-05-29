const BASE_URL = 'https://squad-03-back-end.onrender.com'
const user = 'admin'
const password = 'admin123'
const auth = btoa(`${user}:${password}`);

export const getContratoList = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/contrato`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter lista de contratos')
        }
        return response.json();
    } catch (error) {
        console.error('Erro na requisição GET', error);
        throw error;
    }
};

export const getContratoId = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/contrato/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter contrato!');
        }
        return response.json();
    } catch (error) {
        console.error('Erro na requisição GET', error);
        throw error;
    }
};

export const updateContrato = async (id, contrato) => {
    try {
        const response = await fetch(`${BASE_URL}/api/contrato/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(contrato)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar contrato!');
        }
        return 'Orgão editado!';
    } catch (error) {
        console.error('Erro na requisição PUT', error)
        throw error;
    }
};