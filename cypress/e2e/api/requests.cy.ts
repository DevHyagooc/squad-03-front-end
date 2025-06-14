import { valuesReq } from "../../fixtures/objectsRequests"
describe('Requisições GetInfo', () => {

  context('Autenticação', () => {
    it('Logar usuário', () => {
      cy.postLoginAuth(valuesReq.user)
        .then(response => {
          expect(response.status).to.equal(200)
          Cypress.env('token', response.body.token)
        })
    })
  })

  context('Colaboradores', () => {
    it('Listar todos colaboradores', () => {
      cy.getListColab()
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })

    it('Criar novo colaborador', () => {
      cy.postColab(valuesReq.colab)
        .then(response => {
          expect(response.status).to.equal(201)
          cy.log(JSON.stringify(response.body))
          Cypress.env('idColab', response.body.idFuncionario)
        })
    })

    it('Buscar colaborador', () => {
      const idColab = Cypress.env('idColab')
      cy.getColabId(idColab)
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
        })
    })

    it('Editar colaborador', () => {
      const idColab = Cypress.env('idColab')
      cy.putColabId(idColab)
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
        })
    })

    it('Deletar colaborador', () => {
      const idColab = Cypress.env('idColab')
      cy.deleteColab(idColab)
        .then(response => {
          expect(response.status).to.equal(204)
        })
    })
  })

  context('Empresas', () => {
    it('Listar todas empresas', () => {
      cy.getListEmpresa()
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })

    it('Criar nova empresa', () => {
      cy.postEmpresa(valuesReq.empresa)
        .then(response => {
          expect(response.status).to.equal(201)
          cy.log(JSON.stringify(response.body))
          Cypress.env('idEmpresa', response.body.idOrgao)
        })
    })

    it('Buscar empresa', () => {
      const idEmpresa = Cypress.env('idEmpresa')
      cy.getEmpresaId(idEmpresa)
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
        })
    })

    it('Editar empresa', () => {
      const idEmpresa = Cypress.env('idEmpresa')
      cy.putEmpresaId(idEmpresa)
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
        })
    })

    it('Deletar empresa', () => {
      const idEmpresa = Cypress.env('idEmpresa')
      cy.deleteEmpresa(idEmpresa)
        .then(response => {
          expect(response.status).to.equal(204)
        })
    })
  })

  context('Contratos', () => {
    it('Listar todos os contratos', () => {
      cy.getListContrato()
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })

    it('Criar novo contrato', () => {
      cy.postContrato(valuesReq.contrato)
        .then(response => {
          expect(response.status).to.equal(201)
          cy.log(JSON.stringify(response.body))
          Cypress.env('idContrato', response.body.idContrato)
        })
    })

    it('Buscar contrato por ID', () => {
      const idContrato = Cypress.env('idContrato')
      cy.getContratoId(idContrato)
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
        })
    })

    it('Editar contrato', () => {
      const idContrato = Cypress.env('idContrato')
      cy.putContratoId(idContrato)
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
        })
    })

    it('Arquivar contrato', () => {
      const idContrato = Cypress.env('idContrato')
      cy.patchContrato(idContrato)
        .then(response => {
          expect(response.status).to.equal(204)
        })
    })

    it('Buscar contratos por status', () => {
      cy.getContratoStatus('ATIVO')
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })

    it('Buscar contratos não arquivados', () => {
      cy.getContratoNaoArquivados()
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })

    it('Buscar contratos arquivados', () => {
      cy.getContratoArquivados()
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })

    it('Deletar contrato', () => {
      const idContrato = Cypress.env('idContrato')
      cy.deleteContrato(idContrato)
        .then(response => {
          expect(response.status).to.equal(204)
        })
    })
  })
});
