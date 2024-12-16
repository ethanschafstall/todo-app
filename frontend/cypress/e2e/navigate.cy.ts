const LOGIN_URL = '/login'
const ABOUT_URL = '/about'
const REGISTER_URL = '/register'
const URL_404 = '/404'
const ROUTE_URL = 'http://localhost:4173/'
const PROFIL_URL = '/profile'
const THEME_TOGGLE = '#theme-toggle'
const LOGO_TEXT = 'Todo'
const ABOUT_TEXT = 'À Propos'
const CREATE_ACCOUNT_TEXT = 'Créer votre compte'
const CREATE_ACCOUNT_BUTTON = 'Créer un compte'
const CONNECT_TEXT = 'Connectez-vous'
const DARK_MODE_CLASS = 'dark'
const CONNECT_BUTTON_TEXT = 'Connecter'
const ROUTE_TEXT = 'Mes Tâches'
const LOGGED_BUTTON = '#headlessui-menu-button-v-2'
const PROFIL_LINK = '#headlessui-menu-item-v-4'
const DELETE_ACCOUNT_TEXT = 'Supprimer votre compte'
const REDIRECT_TEXT_404 = 'Retournez sur la page principale'

//Create an account to login
//createAccount()
function createAccount()
{
  //cy.exec('localStorage.clear()');
  //cy.exec('sessionStorage.clear()');
  cy.clearCookies();

  cy.visit(REGISTER_URL)
  cy.get('input[name="email"]').type('testuser@example.com')
  cy.get('input[name="password"]').type('1!TestPassword...')
  cy.get('input[name="confirmation"]').type('1!TestPassword...')
  cy.contains(CREATE_ACCOUNT_BUTTON).click()
}
function login()
{
  cy.visit('/login')
  cy.get('input[name="email"]').type('testuser@example.com')
  cy.get('input[name="password"]').type('1!TestPassword...')
  cy.contains(CONNECT_BUTTON_TEXT).click()
}

describe('Check navigation', () => {
    it('login', () => {
      cy.visit(LOGIN_URL)
    })
    it('about', () => {
      cy.visit(ABOUT_URL)
    })
    it('register', () => {
      cy.visit(REGISTER_URL)
    })
    it('404', () => {
      cy.visit(URL_404)
    })

    it('from login to login by logo', () => { 
      cy.visit(LOGIN_URL)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('include', LOGIN_URL)
    })

    it('from login to about', () => {
      cy.visit(LOGIN_URL)
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('include', ABOUT_URL)
    })

    it('from login to register', () => {
      cy.visit(LOGIN_URL)
      cy.contains(CREATE_ACCOUNT_TEXT).click()
      cy.url().should('include', REGISTER_URL)
    })

    it('from login to dark theme login', () => {
      cy.visit(LOGIN_URL)
      cy.get(THEME_TOGGLE).click()
      cy.get('html').should('have.class', DARK_MODE_CLASS)
      cy.url().should('include', LOGIN_URL)
    })

    it('from dark theme login to dark theme login by logo', () => {
      cy.visit(LOGIN_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(LOGO_TEXT).click()
      cy.get('html').should('have.class', DARK_MODE_CLASS)
      cy.url().should('include', LOGIN_URL)
    })

    it('from dark theme login to dark theme about', () => {
      cy.visit(LOGIN_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(ABOUT_TEXT).click()
      cy.get('html').should('have.class', DARK_MODE_CLASS)
      cy.url().should('include', ABOUT_URL)
    })

    it('from dark theme login to dark theme register', () => {
      cy.visit(LOGIN_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(CREATE_ACCOUNT_TEXT).click()
      cy.get('html').should('have.class', DARK_MODE_CLASS)
      cy.url().should('include', REGISTER_URL)
    })

    it('from dark theme login to login', () => {
      cy.visit(LOGIN_URL)
      cy.get(THEME_TOGGLE).click()
      cy.get(THEME_TOGGLE).click()
      cy.get('html').should('not.have.class')
      cy.url().should('include', LOGIN_URL)
    })

    //TODO password forgotten

    it('from register to login by logo', () => {
      cy.visit(REGISTER_URL)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('include', LOGIN_URL)

    })
    it('from register to login', () => {
      cy.visit(REGISTER_URL)
      cy.contains(CONNECT_TEXT).click()
      cy.url().should('include', LOGIN_URL)
    })

    it('from register to about', () => {
      cy.visit(REGISTER_URL)
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('include', ABOUT_URL)
    })

    it('from register to dark theme register', () => {
      cy.visit(REGISTER_URL)
      cy.get(THEME_TOGGLE).click()
      cy.url().should('include', REGISTER_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme register to dark theme login by logo', () => {
      cy.visit(REGISTER_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.contains(LOGO_TEXT).click()
      cy.url().should('contains', LOGIN_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme register to dark theme login', () => {
      cy.visit(REGISTER_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.contains(CONNECT_TEXT).click()
      cy.url().should('contains', LOGIN_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme register to dark theme about', () => {
      cy.visit(REGISTER_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('contains', ABOUT_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme register to register', () => {
      cy.visit(REGISTER_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.get(THEME_TOGGLE).click() //Go to light mode
      cy.url().should('contains', REGISTER_URL)
      cy.get('html').should('not.have.class')
    })

    it('from about to login by logo', () => {
      cy.visit(ABOUT_URL)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('include', LOGIN_URL)
    })

    it('from about to about', () => {
      cy.visit(ABOUT_URL)
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('include', ABOUT_URL)
    })

    it('from about to route by logo', () => {
      createAccount()
      login()
      cy.visit(ABOUT_URL)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from about to route by nav', () => {
      createAccount()
      login()
      cy.visit(ABOUT_URL)
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from about to dark theme about', () => {
      cy.visit(ABOUT_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.url().should('include', ABOUT_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme about to dark theme login by logo', () => {
      cy.visit(ABOUT_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.contains(LOGO_TEXT).click()
      cy.url().should('include', LOGIN_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme about to dark theme about', () => {
      cy.visit(ABOUT_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('include', ABOUT_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme about to dark theme route by logo', () => {
      createAccount()
      login()
      cy.visit(ABOUT_URL)
      cy.contains(THEME_TOGGLE).click()
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme about to dark theme route', () => {
      createAccount()
      login()
      cy.visit(ABOUT_URL)
      cy.contains(THEME_TOGGLE).click()
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme about to about', () => {
      cy.visit(ABOUT_URL)
      cy.get(THEME_TOGGLE).click() //Go to dark mode
      cy.get(THEME_TOGGLE).click() //Go to light mode
      cy.url().should('contains', ABOUT_URL)
      cy.get('html').should('not.have.class')
    })

    it('from route to route by logo', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from route to route', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from route to about', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('contain', ABOUT_URL)
    })

    it('from route to profile', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.get(LOGGED_BUTTON).click()
      cy.get(PROFIL_LINK).click()
      cy.url().should('contain', PROFIL_URL)
    })

    //TODO if diconnect light theme

    it('from route to dark theme route', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.get(THEME_TOGGLE).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme route to dark theme route by logo', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme route to dark theme route', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme route to dark theme about', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('contain', ABOUT_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme route to dark theme profile', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.get(THEME_TOGGLE).click()
      cy.get(LOGGED_BUTTON).click()
      cy.get(PROFIL_LINK).click()
      cy.url().should('contain', PROFIL_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    //TODO if disconnect dark theme

    it('from dark theme route to route', () => {
      createAccount()
      login()
      cy.visit(ROUTE_URL)
      cy.get(THEME_TOGGLE).click()
      cy.get(THEME_TOGGLE).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('not.have.class')
    })

    it('from profile to route by logo', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from profile to route', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from profile to about', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('contain', ABOUT_URL)
    })

    it('from profile to profile', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(LOGGED_BUTTON).click()
      cy.get(PROFIL_LINK).click()
      cy.url().should('contain', PROFIL_URL)
    })

    it('from profile to register', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.contains(DELETE_ACCOUNT_TEXT).click()
      cy.url().should('contain', REGISTER_URL)
    })

    //TODO if disconnect light theme

    it('from profile to dark theme profile', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(THEME_TOGGLE).click()
      cy.url().should('contain', PROFIL_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme profile to dark theme route by logo', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme profile to dark theme route', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme profile to dark theme about', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('contain', ABOUT_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme profile to dark theme profile', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(THEME_TOGGLE).click()
      cy.get(LOGGED_BUTTON).click()
      cy.get(PROFIL_LINK).click()
      cy.url().should('contain', PROFIL_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme profile to dark theme register', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(THEME_TOGGLE).click()
      cy.contains(DELETE_ACCOUNT_TEXT).click()
      cy.url().should('contain', REGISTER_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    //TODO if disconnect dark theme

    it('from dark theme profile to profile', () => {
      createAccount()
      login()
      cy.visit(PROFIL_URL)
      cy.get(THEME_TOGGLE).click()
      cy.url().should('contain', PROFIL_URL)
      cy.get('html').should('not.have.class')
    })

    it('from 404 to login by logo', () => {
      cy.visit(URL_404)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('contains', LOGIN_URL)
    })

    it('from 404 to login', () => {
      cy.visit(URL_404)
      cy.contains(REDIRECT_TEXT_404).click()
      cy.url().should('include', LOGIN_URL)
    })

    it('from 404 to route by logo', () => {
      createAccount()
      login()
      cy.visit(URL_404)
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from 404 to route by nav', () => {
      createAccount()
      login()
      cy.visit(URL_404)
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
    })

    it('from 404 to about', () => {
      cy.visit(URL_404)
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('include', ABOUT_URL)
    })

    it('from 404 to profile', () => {
      createAccount()
      login()
      cy.visit(URL_404)
      cy.get(LOGGED_BUTTON).click()
      cy.get(PROFIL_LINK).click()
      cy.url().should('contain', PROFIL_URL)
    })

    //TODO from 404 disconnect

    it('from 404 to dark theme 404', () => {
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.url().should('include', URL_404)
      cy.get('html').should('not.have.class')
    })

    it('from dark theme 404 to dark theme login by logo', () => {
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.contains(LOGO_TEXT).click()
      cy.url().should('include', LOGIN_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme 404 to dark theme login', () => {
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.contains(REDIRECT_TEXT_404).click()
      cy.url().should('include', LOGIN_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme 404 to dark theme route by logo', () => {
      createAccount()
      login()
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.contains(LOGO_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme 404 to dark theme route by nav', () => {
      createAccount()
      login()
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.contains(ROUTE_TEXT).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme 404 to dark theme route', () => {
      createAccount()
      login()
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.contains(REDIRECT_TEXT_404).click()
      cy.url().should('equal', ROUTE_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme 404 to dark theme about', () => {
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.contains(ABOUT_TEXT).click()
      cy.url().should('include', ABOUT_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    it('from dark theme 404 to dark theme profile', () => {
      createAccount()
      login()
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.get(LOGGED_BUTTON).click()
      cy.get(PROFIL_LINK).click()
      cy.url().should('include', PROFIL_URL)
      cy.get('html').should('have.class', DARK_MODE_CLASS)
    })

    //TODO 404 dark theme disconnect

    it('from dark theme 404 to 404', () => {
      cy.visit(URL_404)
      cy.get(THEME_TOGGLE).click() //Dark mode
      cy.get(THEME_TOGGLE).click() //Light mode
      cy.url().should('include', URL_404)
      cy.get('html').should('not.have.class')
    })
  })