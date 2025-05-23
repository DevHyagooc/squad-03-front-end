const BASE_URL = 'https://squad-03-back-end.onrender.com';
const user = 'admin'
const password = 'admin123'
const auth = btoa(`${user}:${password}`);

export const postColaborador = async (colaborador) => {
   try {
      const response = await fetch(`${BASE_URL}/api/colaboradores`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
         },
         body: JSON.stringify({
            nome: colaborador.nome,
            email: colaborador.email,
            cpf: colaborador.cpf,
            cargo: colaborador.cargo,
            telefone: colaborador.telefone
         })
      });
      if (!response.ok) {
         throw new Error('Erro ao criar colaborador!');
      }
      return response.json();
   } catch (error) {
      console.error('Erro na requisição POST:', error);
      throw error;
   }
};

export const getColaboradorList = async () => {
   try {
      const response = await fetch(`${BASE_URL}/api/colaboradores`, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
         }
      });
      if (!response.ok) {
         throw new Error('Erro ao obter lista de colaboradores!');
      }
      return response.json();
   } catch (error) {
      console.error('Erro na requisição GET:', error);
      throw error;
   }
};

export const getColaboradorId = async (id) => {
   try {
      const response = await fetch(`${BASE_URL}/api/colaboradores/${id}`, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
         }
      });
      if (!response.ok) {
         throw new Error('Erro ao obter colaborador!');
      }
      return response.json();
   } catch (error) {
      console.error('Erro na requisição GET:', error);
      throw error;
   }
};

export const putColaborador = async (id, colaborador) => {
   try {
      const response = await fetch(`${BASE_URL}/api/colaboradores/${id}`, {
         method: "PUT",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
         },
         body: JSON.stringify({
            nome: colaborador.nome,
            email: colaborador.email,
            cpf: colaborador.cpf,
            cargo: colaborador.cargo,
            telefone: colaborador.telefone
         })
      });
      if (!response.ok) {
         throw new Error('Erro ao editar colaborador!');
      }
      return response.json();
   } catch (error) {
      console.error('Erro na requisição PUT:', error);
      throw error;
   }
};

export const deleteColaborador = async (id_colaborador) => {
   try {
      const response = await fetch(`${BASE_URL}/api/colaboradores/${id_colaborador}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
         }
      });
      if (!response.ok) {
         throw new Error('Erro ao deletar colaborador!');
      }
      return 'Usuário deletado!';
   } catch (error) {
      console.error('Erro na requisição DELETE:', error);
      throw error;
   }
};

export const updateColaborador = async (id, colaborador ) => {
    try {
        const response = await fetch(`${BASE_URL}/api/colaboradores/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(colaborador)
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