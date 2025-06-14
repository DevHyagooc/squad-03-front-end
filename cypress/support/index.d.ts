declare namespace Cypress {
   interface Representante {
      nome: string,
      cpf: string,
      email: string,
      telefone: string
   }

   interface Chainable<Subject = any> {

      //INTERFACES PARA TESTES DE REQUISIÇÕES VIA API
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

      //INTERFACES PARA TESTES DE REQUISIÇÕES VIA GUI
      login(user: string, senha: string): Chainable<any>;
      createColab(colab: {
         nome: string,
         email: string,
         cpf: string,
         cargo: string,
         telefone: string,
         dataNascimento: string
      }): Chainable<any>;
      editarColab(nome: string): Chainable<any>;
      deletarColab(nome: string): Chainable<any>;
   }
}