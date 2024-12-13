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
      cy.get('html').invoke('addClass', 'dark')

      //Click the create account
      cy.contains('Créer votre compte').click()

      //Check url
      cy.get('html').should('have.class', 'dark')
      cy.url().should('include', '/register')
    })
    
    it('from dark theme login to login', () => {
      //Go to the /login page
      cy.visit('/login')
    })
    //TODO password forgotten
    it('from register to login by logo', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from register to login', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from register to about', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from register to dark theme register', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from dark theme register to dark theme login by logo', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from dark theme register to dark theme login', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from dark theme register to dark theme about', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from dark theme register to register', () => {
      //Go to the /register page
      cy.visit('/register')
    })
    it('from about to login by logo', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from about to login', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from about to route by logo', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from about to route', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from about to dark theme about', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from dark theme about to dark theme login by logo', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from dark theme about to dark theme login', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from dark theme about to dark theme route by logo', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from dark theme about to dark theme route', () => {
      //Go to the /about page
      cy.visit('/about')
    })
    it('from dark theme about to about', () => {
      //Go to the /about page
      cy.visit('/about')
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
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from 404 to login by nav', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from 404 to login', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from 404 to route by logo', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from 404 to route by nav', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from 404 to route', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from 404 to about', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from 404 to profile', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    //TODO from 404 disconnect
    it('from 404 to dark theme 404', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme login by logo', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme login by nav', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme login', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme route by logo', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme route by nav', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme route', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme about', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    it('from dark theme 404 to dark theme profile', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
    //TODO 404 dark theme disconnect
    it('from dark theme 404 to 404', () => {
      //Go to the /profile page
      cy.visit('/404')
    })
  })