import { valuesReq } from "../../fixtures/objectsRequests"
// const baseUrl = Cypress.env("baseSystemUrl")
const baseUrl = 'http://localhost:3000'
const user = valuesReq.user.email
const password = valuesReq.user.senha

describe('Colaboradores', () => {
   beforeEach(() => {
      cy.visit(baseUrl)
      cy.login(user, password)
      cy.url()
         .should('include', `${baseUrl}/pageInterna`)
   })
   it('Acessar Page Colaboradores ', () => {
      cy.visit(`${baseUrl}/pageInterna/colaboradores`)
      cy.url()
         .should('include', `${baseUrl}/pageInterna/colaboradores`)
   })

   it('Criar Novo Colaborador', () => {
      cy.visit(`${baseUrl}/pageInterna/colaboradores`)
      cy.createColab(valuesReq.colab)
      cy.contains(valuesReq.colab.nome)
   })

   it('Editar Colaborador', () => {
      cy.visit(`${baseUrl}/pageInterna/colaboradores`)
      cy.editarColab(valuesReq.colab.nome)
      cy.contains(valuesReq.colab.nome)
   })

   it('Deletar Colaborador', () => {
      cy.visit(`${baseUrl}/pageInterna/colaboradores`)
      cy.deletarColab(valuesReq.colab.nome)
      cy.contains(valuesReq.colab.nome)
         .should('not.exist')
   })
})