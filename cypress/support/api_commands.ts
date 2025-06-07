

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

Cypress.Commands.add('deleteColab', idColab => {
   cy.request({
      method: 'DELETE',
      url: `/api/colaboradores/${idColab}`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
   })
})

declare namespace Cypress {
   interface Chainable<Subject = any> {
      postRegisterAuth(user: { email: string; senha: string }): Chainable<any>;
      postLoginAuth(user: { email: string; senha: string }): Chainable<any>;
      postColab(colab: { nome: string, email: string, cpf: string, cargo: string, telefone: string, dataNascimento: string }): Chainable<any>;
      deleteColab(idColab: string): Chainable<any>;
   }
}