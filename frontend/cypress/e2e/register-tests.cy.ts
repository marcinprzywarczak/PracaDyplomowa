describe('Test strony rejestracji', () => {
  it('Odwiedzenie strony rejestracji', () => {
    cy.visit('/register');
    cy.contains('Adres email');
    cy.contains('Imię');
    cy.contains('Nazwisko');
    cy.contains('Numer telefonu');
    cy.contains('Hasło');
    cy.contains('Potwierdź hasło');
    cy.contains('Awatar');
    cy.contains('Zarejestruj');
    cy.get('.justify-center > .p-element').should('be.disabled');
    cy.get('.p-checkbox-box').click();
    cy.contains('Nazwa firmy');
    cy.contains('NIP');
    cy.contains('REGON');
    cy.contains('Ulica');
    cy.contains('Numer budynku');
    cy.contains('Miejscowość');
    cy.contains('Kod pocztowy');
    cy.contains('Logo firmy');
  });
});

describe('Testy rejestracji', () => {
  beforeEach(() => {
    cy.visit('/register');
  });
  it('Błędy walidacji podczas rejestracji', () => {
    cy.get('#email').type('user.testtest.com');
    cy.get('#first_name').type('User');
    cy.get('#sure_name').type('Testowy');
    cy.get('#phone_number').type('123 123 123');
    cy.get('#password').type('12345678');
    cy.get('#password_conf').type('123456789');
    cy.contains('Hasło i powtórzone hasło muszą być takie same!');
    cy.contains('Niepoprawny adres e-mail!');
    cy.get('.justify-center > .p-element').should('be.disabled');
  });

  it('Pomyślnie przeprowadzona rejestracja', () => {
    cy.get('#email').type('user.test@test.com');
    cy.get('#first_name').type('Jan');
    cy.get('#sure_name').type('Kowalski');
    cy.get('#phone_number').type('123 123 123');
    cy.get('#password').type('12345678');
    cy.get('#password_conf').type('12345678');
    cy.get('.justify-center > .p-element').should('not.be.disabled');
    cy.get('.justify-center > .p-element').click();
    cy.url().should('eq', 'http://localhost:4200/dashboard');

    cy.get('#dropdown-user-name').should('contain', 'Jan Kowalski');
  });
});
