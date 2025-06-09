type DocumentoPayload = {
   contratoId: number;
   file: {
      fileName: string;
      mimeType: string;
      encoding: string;
      content: string;
   };
};

Cypress.Commands.add('postRegisterAuth', user => {
   cy.request({
      method: 'POST',
      url: '/auth/register',
      body: {
         email: user.email,
         senha: user.senha
      }
   })
})

Cypress.Commands.add('postLoginAuth', user => {
   cy.request({
      method: 'POST',
      url: '/auth/login',
      body: {
         email: user.email,
         senha: user.senha
      }
   })
})

Cypress.Commands.add('getListColab', () => {
   cy.request({
      method: 'GET',
      url: `/api/colaboradores`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('postColab', colab => {
   cy.request({
      method: 'POST',
      url: '/api/colaboradores',
      body: {
         nome: colab.nome,
         email: colab.email,
         cpf: colab.cpf,
         cargo: colab.cargo,
         telefone: colab.telefone,
         dataNascimento: colab.dataNascimento
      },
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getColabId', idColab => {
   cy.request({
      method: 'GET',
      url: `/api/colaboradores/${idColab}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('putColabId', idColab => {
   cy.request({
      method: 'PUT',
      url: `/api/colaboradores/${idColab}`,
      body: {
         nome: "Cypress Test edit",
         email: "cypress.edit@gmail.com",
         cpf: "919.053.750-50",
         cargo: "QA edit",
         telefone: "(79) 91274-5678",
         dataNascimento: "07/06/2000"
      },
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('deleteColab', idColab => {
   cy.request({
      method: 'DELETE',
      url: `/api/colaboradores/${idColab}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getListEmpresa', () => {
   cy.request({
      method: 'GET',
      url: `/api/empresa`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('postEmpresa', empresa => {
   cy.request({
      method: 'POST',
      url: '/api/empresa',
      body: {
         nomeFantasia: empresa.nomeFantasia,
         razaoSocial: empresa.razaoSocial,
         cnpj: empresa.cnpj,
         estado: empresa.estado,
         cidade: empresa.cidade,
         inscricaoMunicipal: empresa.inscricaoMunicipal,
         tipoEmpresa: empresa.tipoEmpresa,
         cep: empresa.cep,
         bairro: empresa.bairro,
         logradouro: empresa.logradouro,
         numero: empresa.numero,
         complemento: empresa.complemento,
         email: empresa.email,
         telefone: empresa.telefone,
         representantes: empresa.representantes

      },
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getEmpresaId', idEmpresa => {
   cy.request({
      method: 'GET',
      url: `/api/empresa/${idEmpresa}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('putEmpresaId', idEmpresa => {
   cy.request({
      method: 'PUT',
      url: `/api/empresa/${idEmpresa}`,
      body: {
         nomeFantasia: "Cypress XP",
         razaoSocial: "Cypress Xperience",
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
         representantes: []
      },
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('deleteEmpresa', idEmpresa => {
   cy.request({
      method: 'DELETE',
      url: `/api/empresa/${idEmpresa}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getListContrato', () => {
   cy.request({
      method: 'GET',
      url: `/api/contrato`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('postContrato', contrato => {
   cy.request({
      method: 'POST',
      url: '/api/contrato',
      body: {
         numeroContrato: contrato.numeroContrato,
         descricao: contrato.descricao,
         dataInicio: contrato.dataInicio,
         dataFim: contrato.dataFim,
         termosDePagamento: contrato.termosDePagamento,
         valorTotalPago: contrato.valorTotalPago,
         valorContrato: contrato.valorContrato,
         autoRenovacao: contrato.autoRenovacao,
         diasParaCancelamento: contrato.diasParaCancelamento,
         motivoCancelamento: contrato.motivoCancelamento,
         statusContrato: contrato.statusContrato,
         tipoContrato: contrato.tipoContrato,
         tags: contrato.tags,
         empresaId: contrato.empresaId,
         responsavelId: contrato.responsavelId
      },
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getContratoId', idContrato => {
   cy.request({
      method: 'GET',
      url: `/api/contrato/${idContrato}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('putContratoId', idContrato => {
   cy.request({
      method: 'PUT',
      url: `/api/contrato/${idContrato}`,
      body: {
         numeroContrato: "CT-2025-6666",
         descricao: "Desenvolvimento de testes automatizados com cypress",
         dataInicio: "2025-01-01",
         dataFim: "2025-12-31",
         termosDePagamento: "30",
         valorTotalPago: 60000,
         valorContrato: 120000,
         autoRenovacao: false,
         diasParaCancelamento: 7,
         motivoCancelamento: null,
         statusContrato: "ATIVO",
         tipoContrato: "Serviços",
         tags: "Testes",
         empresaId: 1,
         responsavelId: 1
      },
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('patchContrato', idContrato => {
   cy.request({
      method: 'PATCH',
      url: `/api/contrato/${idContrato}/arquivar`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getContratoStatus', statusContrato => {
   cy.request({
      method: 'GET',
      url: `/api/contrato/status/${statusContrato}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getContratoNaoArquivados', () => {
   cy.request({
      method: 'GET',
      url: `/api/contrato/nao-arquivados`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('getContratoArquivados', () => {
   cy.request({
      method: 'GET',
      url: `/api/contrato/arquivados`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('deleteContrato', idContrato => {
   cy.request({
      method: 'DELETE',
      url: `/api/contrato/${idContrato}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('downloadDocumento', idDocumento => {
   cy.request({
      method: 'GET',
      url: `/api/${idDocumento}/download`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` },
      failOnStatusCode: false
   })
})

Cypress.Commands.add('getListDocumento', idContrato => {
   cy.request({
      method: 'GET',
      url: `/api/documento/contrato/${idContrato}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

Cypress.Commands.add('deleteDocumento', idDocumento => {
   cy.request({
      method: 'DELETE',
      url: `/api/documento/${idDocumento}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

declare namespace Cypress {
   interface Representante {
      nome: string,
      cpf: string,
      email: string,
      telefone: string
   }

   interface Chainable<Subject = any> {
      postRegisterAuth(user: { email: string, senha: string }): Chainable<any>;
      postLoginAuth(user: { email: string, senha: string }): Chainable<any>;

      postColab(colab: {
         nome: string,
         email: string,
         cpf: string,
         cargo: string,
         telefone: string,
         dataNascimento: string
      }): Chainable<any>;
      deleteColab(idColab: string): Chainable<any>;
      getListColab(): Chainable<any>;
      getColabId(idColab: string): Chainable<any>;
      putColabId(idColab: string): Chainable<any>;

      postEmpresa(empresa: {
         nomeFantasia: string,
         razaoSocial: string,
         cnpj: string,
         estado: string,
         cidade: string,
         inscricaoMunicipal: string,
         tipoEmpresa: string,
         cep: string,
         bairro: string,
         logradouro: string,
         numero: string,
         complemento: string,
         email: string,
         telefone: string,
         representantes: Representante[]
      }): Chainable<any>;
      deleteEmpresa(idEmpresa: string): Chainable<any>;
      getListEmpresa(): Chainable<any>;
      getEmpresaId(idEmpresa: string): Chainable<any>;
      putEmpresaId(idEmpresa: string): Chainable<any>;

      postContrato(contrato: {
         numeroContrato: string,
         descricao: string,
         dataInicio: string,
         dataFim: string,
         termosDePagamento: string,
         valorTotalPago: number,
         valorContrato: number,
         autoRenovacao: boolean,
         diasParaCancelamento: number,
         motivoCancelamento: string | null,
         statusContrato: string,
         tipoContrato: string,
         tags: string,
         empresaId: number,
         responsavelId: number
      }): Chainable<any>;
      getListContrato(): Chainable<any>;
      getContratoId(idContrato: string): Chainable<any>;
      putContratoId(idContrato: string): Chainable<any>;
      patchContrato(idContrato: string): Chainable<any>;
      getContratoStatus(statusContrato: string): Chainable<any>;
      getContratoNaoArquivados(): Chainable<any>;
      getContratoArquivados(): Chainable<any>;
      deleteContrato(idContrato: string): Chainable<any>;

      downloadDocumento(idDocumento: string): Chainable<any>;
      getListDocumento(idContrato: string): Chainable<any>;
      deleteDocumento(idDocumento: string): Chainable<any>;
   }
}