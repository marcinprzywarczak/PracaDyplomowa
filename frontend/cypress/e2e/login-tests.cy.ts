describe('Test strony logowania', () => {
  it('Odwiedzenie strony logowania', () => {
    cy.visit('/login');
    cy.contains('Adres email');
    cy.contains('Hasło');
  });
});

describe('Test logowania zakończony niepowodzeniem', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Niepoprawny adres email', () => {
    cy.get('#email').type('user');
    cy.get('#password').type('haslo');

    cy.get('.flex > .p-element').should('be.disabled');
    cy.get('form.ng-invalid > :nth-child(1)').should(
      'contain',
      'Niepoprawny adres e-mail!'
    );
    cy.contains('Niepoprawny adres e-mail!');
  });

  it('Niepoprawny dane', () => {
    cy.get('#email').type('user@testowy.com');
    cy.get('#password').type('haslo');

    cy.get('.flex > .p-element').should('not.be.disabled');
    cy.get('.flex > .p-element').click();
    cy.get('form.ng-dirty > :nth-child(1)').should(
      'contain',
      'Wprowadzono niepoprawne dane logowania'
    );

    cy.contains('Wprowadzono niepoprawne dane logowania');
  });
});

describe('Test logowania zakończony sukcesem', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Logowanie zakończone sukcesem', () => {
    cy.get('#email').type('user@testowy.com');
    cy.get('#password').type('12345678');

    cy.get('.flex > .p-element').should('not.be.disabled');
    cy.get('.flex > .p-element').click();

    cy.url().should('eq', 'http://localhost:4200/dashboard');

    cy.get('#dropdown-user-name').should('contain', 'User Testowy');
  });
});
