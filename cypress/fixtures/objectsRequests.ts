export const valuesReq = {
   user: {
      email: "hyago@email.com",
      senha: "1234567"
   },
   colab: {
      nome: "Cypress Test",
      email: "cypress.test@gmail.com",
      cpf: "919.053.750-50",
      cargo: "QA",
      telefone: "(79) 91274-5678",
      dataNascimento: "07/06/2000"
   },
   empresa: {
      nomeFantasia: "Cypress COP",
      razaoSocial: "Cypress Corporation",
      cnpj: "11.520.943/0001-61",
      estado: "Bahia",
      cidade: "Xique Xique",
      inscricaoMunicipal: "string",
      tipoEmpresa: "Privada",
      cep: "47400970",
      bairro: "Centro",
      logradouro: "Rua Coronel Manoel Teixeira",
      numero: "91",
      complemento: "casa",
      email: "cypress@gmail.com",
      telefone: "(79)9 9999-9999",
      representantes: [
         {
            nome: "Denisson Buarque",
            cpf: "835.058.080-16",
            email: "denissonB@email.com.br",
            telefone: "(79)9 9999-9998"
         }
      ]
   },
   contrato: {
      numeroContrato: "CT-2025-6666",
      descricao: "Desenvolvimento de testes automatizados",
      dataInicio: "2025-01-01",
      dataFim: "2025-12-31",
      termosDePagamento: "30",
      valorTotalPago: 60000,
      valorContrato: 120000,
      autoRenovacao: false,
      diasParaCancelamento: 15,
      motivoCancelamento: null,
      statusContrato: "ATIVO",
      tipoContrato: "Serviços",
      tags: "Testes",
      empresaId: 1,
      responsavelId: 1
   }
};