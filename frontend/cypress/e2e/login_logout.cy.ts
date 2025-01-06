const DISCONNECT_BUTTON = '#headlessui-menu-item-v-5'

describe('Check', () => {
    it('creating an account', () => {
        cy.visit('/register')
        cy.get('input[name="email"]').type('testuser2@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.get('input[name="confirmation"]').type('1!TestPassword...')
        cy.contains('Créer un compte').click()
        cy.url().should('contain', '/login') //We consider that redirection to the login page is an account created
    })
    it('login into the account', () => {
        cy.visit('/login')
        cy.get('input[name="email"]').type('testuser2@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.contains('Connecter').click()
        cy.url().should('equal', 'http://localhost:4173/') //In that case the test to create the account worked
    })
    it('disconnecting', () => {
        cy.visit('/register')
        cy.get('input[name="email"]').type('testuser@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.get('input[name="confirmation"]').type('1!TestPassword...')
        cy.contains('Créer un compte').click()

        cy.visit('/login')
        cy.get('input[name="email"]').type('testuser@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.contains('Connecter').click()

        cy.visit('/')
        cy.get('#headlessui-menu-button-v-2').click()
        cy.get(DISCONNECT_BUTTON).click()
        cy.get('#headlessui-menu-button-v-2').should('not.exist')
    })
})