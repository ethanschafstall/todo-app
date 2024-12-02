// https://on.cypress.io/api

describe('Login button', () => {
  it('visits the login url and test the button to connect', () => {
    cy.visit('/register')
    cy.contains('Créer un compte').click()
    //cy.contains('button', 'Connecter')
  })
})
