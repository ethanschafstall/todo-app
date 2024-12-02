// https://on.cypress.io/api

describe('Create an account', () => {
  it('fill the form and submit it to create an account', () => {
    //Go to the /register page
    cy.visit('/register')

    //type in input
    cy.get('input[name="email"]').type('testuser@example.com')
    cy.get('input[name="password"]').type('1!TestPassword...')
    cy.get('input[name="confirmation"]').type('1!TestPassword...')

    //Click the create an account button
    cy.contains('Créer un compte').click()

    //Check if it has been redirected to /login
    cy.url().should('include', '/login')
  })
  it('empty value', () => {
    //Go to the /register page
    cy.visit('/register')

    //Click the create an account button without any value
    cy.contains('Créer un compte').click()

    //Check the error message has appeared
    cy.contains('Vous devez renseigner ce champ').should('be.visible')
    cy.contains('Le mot de passe doit faire au moins 5 caractères').should('be.visible')
  })
})