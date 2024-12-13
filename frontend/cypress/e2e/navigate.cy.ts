describe('Check navigation', () => {
    it('from login to login by logo', () => { 
      //Go to the /login page
      cy.visit('/login')

      //Click the logo
      cy.contains('Todo').click()

      //Check url
      cy.url().should('include', '/login')
    })

    it('from login to about', () => {
      //Go to the /login page
      cy.visit('/login')

      //Click the about
      cy.contains('À Propos').click()

      //Check url
      cy.url().should('include', '/about')
    })

    it('from login to register', () => {
      //Go to the /login page
      cy.visit('/login')

      //Click the create account
      cy.contains('Créer votre compte').click()

      //Check url
      cy.url().should('include', '/register')
    })

    it('from login to dark theme login', () => {
      //Go to the /login page
      cy.visit('/login')

      //Click the logo
      cy.get('#theme-toggle').click()

      //Check url
      cy.get('html').should('have.class', 'dark')
      //cy.url().should('include', '/login')
    })

    it('from dark theme login to dark theme login by logo', () => {
      //Go to the /login page
      cy.visit('/login')

      //Go to dark mode
      cy.get('#theme-toggle').click()

      //Click the logo
      cy.contains('Todo').click()

      //Check url
      cy.get('html').should('have.class', 'dark')
      cy.url().should('include', '/login')
    })

    it('from dark theme login to dark theme about', () => {
      //Go to the /login page
      cy.visit('/login')

      //Go to dark mode
      cy.get('#theme-toggle').click()

      //Click the about
      cy.contains('À Propos').click()

      //Check url
      cy.get('html').should('have.class', 'dark')
      cy.url().should('include', '/about')
    })

    it('from dark theme login to dark theme register', () => {
      //Go to the /login page
      cy.visit('/login')

      //Go to dark mode
      cy.get('#theme-toggle').click()

      //Click the create account
      cy.contains('Créer votre compte').click()

      //Check url
      cy.get('html').should('have.class', 'dark')
      cy.url().should('include', '/register')
    })
    
    it('from dark theme login to login', () => {
      //Go to the /login page
      cy.visit('/login')
      //Go to dark mode
      cy.get('#theme-toggle').click()
      //Go to light mode
      cy.get('#theme-toggle').click()

      //Check url
      cy.get('html').should('not.have.class')
      cy.url().should('include', '/register')
    })
    //TODO password forgotten
    it('from register to login by logo', () => {
      //Go to the /register page
      cy.visit('/register')

      //Click the logo
      cy.contains('Todo').click()

      //Check url
      cy.url().should('include', '/login')
    })
    it('from register to login', () => {
      //Go to the /register page
      cy.visit('/register')

      //Click the link
      cy.contains('Connectez-vous').click()

      //Check url
      cy.url().should('include', '/login')
    })
    it('from register to about', () => {
      //Go to the /register page
      cy.visit('/register')

      //Click the link
      cy.contains('À Propos').click()

      //Check the url
      cy.url().should('include', '/about')
    })
    it('from register to dark theme register', () => {
      //Go to the /register page
      cy.visit('/register')

      //Go to dark mode
      cy.get('#theme-toggle').click()

      //check dark mode and url
      cy.url().should('include', '/register')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme register to dark theme login by logo', () => {
      cy.visit('/register')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.contains('Todo').click()
      cy.url().should('contains', '/login')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme register to dark theme login', () => {
      cy.visit('/register')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.contains('Connectez-vous').click()
      cy.url().should('contains', '/login')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme register to dark theme about', () => {
      cy.visit('/register')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.contains('À Propos').click()
      cy.url().should('contains', '/about')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme register to register', () => {
      cy.visit('/register')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.get('#theme-toggle').click() //Go to light mode
      cy.url().should('contains', '/register')
      cy.get('html').should('not.have.class')
    })
    it('from about to login by logo', () => {
      cy.visit('/about')
      cy.contains('Todo').click()
      cy.url().should('include', '/login')
    })
    it('from about to about', () => {
      cy.visit('/about')
      cy.contains('À Propos').click()
      cy.url().should('include', '/about')
    })
    it('from about to route by logo', () => {
      //TODO
      cy.visit('/about')
    })
    it('from about to route by nav', () => {
      //TODO
    })
    it('from about to dark theme about', () => {
      cy.visit('/about')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.url().should('include', '/about')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme about to dark theme login by logo', () => {
      cy.visit('/about')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.contains('Todo').click()
      cy.url().should('include', '/login')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme about to dark theme about', () => {
      cy.visit('/about')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.contains('À Propos').click()
      cy.url().should('include', '/about')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme about to dark theme route by logo', () => {
      //TODO
      cy.visit('/about')
    })
    it('from dark theme about to about', () => {
      cy.visit('/about')
      cy.get('#theme-toggle').click() //Go to dark mode
      cy.get('#theme-toggle').click() //Go to light mode
      cy.url().should('contains', '/about')
      cy.get('html').should('not.have.class')
    })
    it('from route to route by logo', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from route to route', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from route to about', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from route to profile', () => {
      //Go to the / page
      cy.visit('/')
    })
    //TODO if diconnect light theme
    it('from route to dark theme route', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from dark theme route to dark theme route by logo', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from dark theme route to dark theme route', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from dark theme route to dark theme route', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from dark theme route to dark theme about', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from dark theme route to dark theme profile', () => {
      //Go to the / page
      cy.visit('/')
    })
    //TODO if disconnect dark theme
    it('from dark theme route to route', () => {
      //Go to the / page
      cy.visit('/')
    })
    it('from profile to route by logo', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from profile to route', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from profile to about', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from profile to profile', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from profile to register', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    //TODO if disconnect light theme
    it('from profile to dark theme profile', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from dark theme profile to dark theme route by logo', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from dark theme profile to dark theme route', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from dark theme profile to dark theme about', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from dark theme profile to dark theme profile', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from dark theme profile to dark theme register', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    //TODO if disconnect dark theme
    it('from dark theme profile to profile', () => {
      //Go to the /profile page
      cy.visit('/profile')
    })
    it('from 404 to login by logo', () => {
      cy.visit('/404')
      cy.contains('Todo').click()
      cy.url().should('contains', '/login')
    })
    it('from 404 to login', () => {
      cy.visit('/404')
      cy.contains('Retournez sur la page principale').click()
      cy.url().should('include', '/login')
    })
    it('from 404 to route by logo', () => {
      //TODO
      cy.visit('/404')
    })
    it('from 404 to route by nav', () => {
      //TODO
      cy.visit('/404')
    })
    it('from 404 to about', () => {
      cy.visit('/404')
      cy.contains('À Propos').click()
      cy.url().should('include', '/about')
    })
    it('from 404 to profile', () => {
      //TODO
      cy.visit('/404')
    })
    //TODO from 404 disconnect
    it('from 404 to dark theme 404', () => {
      cy.visit('/404')
      cy.get('#theme-toggle').click() //Dark mode
      cy.url().should('include', '/404')
      cy.get('html').should('not.have.class')
    })
    it('from dark theme 404 to dark theme login by logo', () => {
      cy.visit('/404')
      cy.get('#theme-toggle').click() //Dark mode
      cy.contains('Todo').click()
      cy.url().should('include', '/404')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme 404 to dark theme login', () => {
      cy.visit('/404')
      cy.get('#theme-toggle').click() //Dark mode
      cy.contains('Retournez sur la page principale').click()
      cy.url().should('include', '/login')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme 404 to dark theme route by logo', () => {
      //TODO
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme route by nav', () => {
      //TODO
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme route', () => {
      //TODO
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme about', () => {
      cy.visit('/404')
      cy.get('#theme-toggle').click() //Dark mode
      cy.contains('À Propos').click()
      cy.url().should('include', '/about')
      cy.get('html').should('have.class', 'dark')
    })
    it('from dark theme 404 to dark theme profile', () => {
      //TODO
      cy.visit('/404')
    })
    //TODO 404 dark theme disconnect
    it('from dark theme 404 to 404', () => {
      cy.visit('/404')
      cy.get('#theme-toggle').click() //Dark mode
      cy.get('#theme-toggle').click() //Light mode
      cy.url().should('include', '/404')
      cy.get('html').should('not.have.class')
    })
  })