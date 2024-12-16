const DISCONNECT_BUTTON = '#headlessui-menu-item-v-4'

describe('Check', () => {
    it('creating an account', () => {
        cy.visit('/register')
        cy.get('input[name="email"]').type('testuser2@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.get('input[name="confirmation"]').type('1!TestPassword...')
        cy.contains(CREATE_ACCOUNT_BUTTON).click()
        cy.url().should('contain', LOGIN_URL) //We consider that redirection to the login page is an account created
    })
    it('login into the account', () => {
        cy.visit('/login')
        cy.get('input[name="email"]').type('testuser@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.contains(CONNECT_BUTTON_TEXT).click()
        cy.url().should('equal', ROUTE_URL) //In that case the test to create the account worked
    })
    it('disconnecting', () => {
        cy.visit('/')
        cy.get(LOGGED_BUTTON).click()
        cy.get(DISCONNECT_BUTTON).click()
        cy.url().should('contain', LOGIN_URL) //Should redirect to the login menu
    })
})