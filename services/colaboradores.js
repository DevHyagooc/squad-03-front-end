const BASE_URL = 'https://squad-03-back-end.onrender.com';

export const postColaborador = async (colaborador) => {
   try {
      const response = await fetch(`${BASE_URL}/api/funcionarios`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
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
         throw new Error('Erro ao criar colaborador');
      }
      return response.json();
   } catch (error) {
      console.error('Erro na requisição GET:', error);
      throw error;
   }
};