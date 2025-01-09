describe('Check', () => {
    it('deleting an account', () => {
        cy.visit('/register')
        cy.get('input[name="email"]').type('testuser3@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.get('input[name="confirmation"]').type('1!TestPassword...')
        cy.contains('Créer un compte').click()

        cy.visit('/login')
        cy.get('input[name="email"]').type('testuser3@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.contains('Connecter').click()

        cy.visit('/profile')
        cy.contains('Supprimer votre compte').click()
        cy.url().should('contain', '/register')
    })
})