const BASE_URL = 'https://viacep.com.br/ws/';

export const getLocal = async (CEP) => {
  try {
    const response = await fetch(`${BASE_URL}/${CEP}/json`);
    if (!response.ok) {
      throw new Error('Erro ao obter dados');
    }
    return response.json();
  } catch (error) {
    console.error('Erro na requisição GET:', error);
    throw error;
  }
};