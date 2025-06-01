const BASE_URL = 'https://squad-03-back-end.onrender.com'
const user = 'admin'
const password = 'admin123'
const auth = btoa(`${user}:${password}`);

export const postRepresentante = async (representantes) => {
   try {
      const response = await fetch(`${BASE_URL}/api/representantes`, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
         },
         body: JSON.stringify({
            nome: representantes.nome,
            cpf: representantes.cpf,
            email: representantes.email,
            telefone: representantes.telefone,
            idOrgao: representantes.idOrgao
         })
      });
      if (!response.ok) {
         throw new Error('Erro ao criar representante!');
      }
      return response.json();
   } catch (error) {
      console.error('Erro na requisição POST:', error);
      throw error;
   }
}