// contratoService.ts (ou .js)
import { fetchWithAuth } from "./auth";

const BASE_PATH = "/api/contrato"; // já que a base URL completa é concatenada dentro de fetchWithAuth

/**
 * Retorna a lista completa de contratos.
 */
export const getContratoList = async (): Promise<any[]> => {
  try {
    const response = await fetchWithAuth(`${BASE_PATH}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao obter lista de contratos");
    }
    return await response.json();
  } catch (err) {
    console.error("Erro na requisição GET /contrato", err);
    throw err;
  }
};

/**
 * Retorna um contrato pelo ID.
 */
export const getContratoById = async (id: string | number): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${BASE_PATH}/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao obter contrato!");
    }
    return await response.json();
  } catch (err) {
    console.error(`Erro na requisição GET /contrato/${id}`, err);
    throw err;
  }
};

/**
 * Atualiza (PUT) um contrato pelo ID.
 */
export const updateContrato = async (
  id: string | number,
  contrato: object
): Promise<string> => {
  try {
    const response = await fetchWithAuth(`${BASE_PATH}/${id}`, {
      method: "PUT",
      body: JSON.stringify(contrato),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar contrato!");
    }
    return "Contrato atualizado com sucesso!";
  } catch (err) {
    console.error(`Erro na requisição PUT /contrato/${id}`, err);
    throw err;
  }
};

/**
 * Retorna a lista de contratos filtrados por status.
 */
export const getContratoListByStatus = async (
  status: string
): Promise<any[]> => {
  try {
    const response = await fetchWithAuth(`${BASE_PATH}/status/${status}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao obter lista de contratos por status");
    }
    return await response.json();
  } catch (err) {
    console.error(
      `Erro na requisição GET /contrato/status/${status}`,
      err
    );
    throw err;
  }
};

/**
 * Retorna a lista de contratos arquivados.
 */
export const getContratoListArquivados = async (): Promise<any[]> => {
  try {
    const response = await fetchWithAuth(`${BASE_PATH}/arquivados`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao obter lista de contratos arquivados");
    }
    return await response.json();
  } catch (err) {
    console.error("Erro na requisição GET /contrato/arquivados", err);
    throw err;
  }
};

/**
 * Retorna a lista de contratos não arquivados.
 */
export const getContratoListNaoArquivado = async (): Promise<any[]> => {
  try {
    const response = await fetchWithAuth(`${BASE_PATH}/nao-arquivados`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao obter lista de contratos não arquivados");
    }
    return await response.json();
  } catch (err) {
    console.error(
      "Erro na requisição GET /contrato/nao-arquivados",
      err
    );
    throw err;
  }
};


/**
 * Cria um novo contrato.
 * @param contrato Objeto contendo os dados do contrato conforme payload:
 * {
 *   numeroContrato: string,
 *   descricao: string,
 *   dataInicio: string,
 *   dataFim: string,
 *   termosDePagamento: string,
 *   valorTotalPago: number,
 *   valorContrato: number,
 *   autoRenovacao: boolean,
 *   diasParaCancelamento: number,
 *   motivoCancelamento: string,
 *   statusContrato: string,
 *   tipoContrato: string,
 *   tags: string,
 *   empresaId: number,
 *   responsavelId: string
 * }
 * @returns O contrato criado (objeto retornado pelo backend).
 */
export const createContrato = async (contrato: object): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${BASE_PATH}`, {
      method: "POST",
      body: JSON.stringify(contrato),
    });

    if (!response.ok) {
      // Tenta ler uma mensagem de erro do corpo, se existir
      let errorMsg = "Erro ao criar contrato!";
      try {
        const errBody = await response.json();
        if (errBody?.message) {
          errorMsg = errBody.message;
        }
      } catch {}
      throw new Error(errorMsg);
    }

    // Retorna o objeto de contrato criado pelo servidor (ex: com ID gerado)
    return await response.json();
  } catch (err) {
    console.error("Erro na requisição POST /contrato:", err);
    throw err;
  }
};