describe('Test strony głównej', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Strona główna');
  });
});

describe('Test strony logowania', () => {
  it('Odwiedzenie strony logowania', () => {
    cy.visit('/login');
    cy.contains('Adres email');
    cy.contains('Hasło');
  });
});
