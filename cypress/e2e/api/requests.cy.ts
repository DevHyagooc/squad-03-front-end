import { valuesReq } from "../../../cypress/fixtures/constRequests"
describe('Requisições GetInfo', () => {

  context('Autenticação', () => {
    it.skip('Registrar usuário', () => {
      cy.postRegisterAuth(valuesReq.user)
        .then(response => {
          expect(response.status).to.equal(200)
        })
    })

    it('Logar usuário', () => {
      cy.postLoginAuth(valuesReq.user)
        .then(response => {
          expect(response.status).to.equal(200)
          Cypress.env('token', response.body.token)
        })
    })
  })

  context('Colaboradores', () => {
    it('Criar novo colaborador', () => {
      cy.postColab(valuesReq.colab)
        .then(response => {
          expect(response.status).to.equal(201)
          Cypress.env('idColab', response.body.idFuncionario)
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

})
