describe('Check', () => {
    it('adding task', () => {
        cy.visit('/register')
        cy.get('input[name="email"]').type('testuser4@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.get('input[name="confirmation"]').type('1!TestPassword...')
        cy.contains('Créer un compte').click()

        cy.visit('/login')
        cy.get('input[name="email"]').type('testuser4@example.com')
        cy.get('input[name="password"]').type('1!TestPassword...')
        cy.contains('Connecter').click()

        cy.should('contain', 'Aucune tâche ...')

        cy.get('input[name="text"]').type('Laundry')
        cy.contains('Ajouter').click()

        cy.contains('Aucune tâche ...').should('not.exist')
    })
})