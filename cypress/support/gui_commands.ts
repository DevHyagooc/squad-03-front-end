Cypress.Commands.add('login', (user, password) => {
   cy.get('#email')
      .should('be.visible')
      .type(user)
   cy.get('#senha')
      .should('be.visible')
      .type(password)
   cy.get('#submit-login')
      .should('be.visible')
      .click()
})

declare namespace Cypress {
   interface Chainable<Subject = any> {
      login(user: string, senha: string): Chainable<any>;
   }
}