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

    //Click the create an account button
    cy.contains('Créer un compte').click()

    //Check the error message has appeared 3 times
    cy.contains('Vous devez renseigner ce champ').should('be.visible') //TODO check if it appears 3 times
  })
  it('invalid email', () => {
    //Go to the /register page
    cy.visit('/register')

    //type in input
    cy.get('input[name="email"]').type('InvalidEmail')

    //Click the create an account button
    cy.contains('Créer un compte').click()

    //Check the error message has appeared
    cy.contains('Format email incorrect').should('be.visible')
  })
  it('invalid password', () => {
    //Go to the /register page
    cy.visit('/register')

    //type in input
    cy.get('input[name="password"]').type('1')

    //Check the error message has appeared
    cy.contains('Le mot de passe doit faire au moins 5 caractères').should('be.visible')
  })
  it('password not matching', () => {
    //Go to the /register page
    cy.visit('/register')

    //type in input
    cy.get('input[name="password"]').type('password1')
    cy.get('input[name="confirmation"]').type('password2')

    //Check the error message has appeared
    cy.contains('Les mots de passe ne correspondent pas').should('be.visible')
  })
})