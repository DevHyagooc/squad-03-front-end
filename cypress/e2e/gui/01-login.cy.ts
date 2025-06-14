import { valuesReq } from "../../fixtures/objectsRequests"
const baseUrl = Cypress.env("baseSystemUrl")
const user = valuesReq.user.email
const password = valuesReq.user.senha
describe('Login', () => {
   beforeEach(() => {
      cy.visit(baseUrl)
   })
   it('Validar Login Incorreto', () => {
      const userIncorret = "teste@erro.com"
      const passwordIncorret = "123123456"
      const messageError = "Falha ao fazer login!"
      cy.login(userIncorret, passwordIncorret)

      cy.contains(messageError).should('be.visible')
   })
   it('Validar Login', () => {
      cy.login(user, password)
      cy.url().should('include', `${baseUrl}/pageInterna`)
   });
})
