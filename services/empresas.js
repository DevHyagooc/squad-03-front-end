const BASE_URL = 'https://squad-03-back-end.onrender.com'
const user = 'admin'
const password = 'admin123'
const auth = btoa(`${user}:${password}`);

export const getEmpresaList = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/empresa`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao obter lista de empresas')
        }
        return response.json();
    } catch (error) {
        console.error('Erro na requisição GET:', error);
        throw error;
    }
};

export const getEmpresaId = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/empresa/${id}`, {
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

export const deleteEmpresa = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/empresa/${id}`, {
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

export const updateEmpresa = async (id, emp) => {
    try {
        const response = await fetch(`${BASE_URL}/api/empresa/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(emp)
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

export const postEmpresa = async (emp) => {
    try {
        const response = await fetch(`${BASE_URL}/api/empresa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify({
                idOrgao: emp.idOrgao,
                nomeFantasia: emp.nomeFantasia,
                razaoSocial: emp.razaoSocial,
                cnpj: emp.cnpj,
                numeroEmpresa: emp.numeroEmpresa,
                estado: emp.estado,
                cidade: emp.cidade,
                inscricaoMunicipal: emp.inscricaoMunicipal,
                tipoEmpresa: emp.tipoEmpresa,
                cep: emp.cep,
                bairro: emp.bairro,
                logradouro: emp.logradouro,
                numero: emp.numero,
                complemento: emp.complemento,
                email: emp.email,
                telefone: emp.telefone,
                representantes: emp.representantes,
            })
        });
        if (!response.ok) {
            throw new Error('Erro ao criar orgão contratante!');
        }
        return response.json();
    } catch (error) {
        console.error('Erro na requisição POST', error);
    }
};