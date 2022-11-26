import 'cypress-file-upload';

describe('Test dodawania oferty', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('user@testowy.com');
    cy.get('#password').type('12345678');

    cy.get('.flex > .p-element').should('not.be.disabled');
    cy.get('.flex > .p-element').click();
  });
  it('Dodawanie oferty', () => {
    cy.wait(1000);
    cy.get('#dropdown-user').click();
    cy.get('[routerlink="dodaj-ogloszenie"] > .p-3').click();
    cy.get(':nth-child(1) > .add-offer-option').trigger('mouseover');
    cy.get(':nth-child(1) > .add-offer-option > :nth-child(1)').click();

    cy.get('.flex-col.gap-y-4 > :nth-child(1) > .p-inputtext').type(
      'Ogloszenie testowe nr1'
    );
    cy.get(
      '.flex-col > :nth-child(1) > .p-inputwrapper > .w-full > .p-inputtext'
    ).type('123');
    cy.get(
      '.flex-col > :nth-child(2) > .p-inputwrapper > .w-full > .p-inputtext'
    ).type('100000');
    cy.get(':nth-child(4) > .p-inputtext').type('Kalisz');
    cy.get('.p-inputtextarea').type(
      'Testowy opis nieruchomosci, testowy opis nieruchomosci. Test test test.'
    );
    cy.get('#mainPhoto').attachFile('zdj-test.jpg');

    cy.get(
      ':nth-child(9) > :nth-child(1) > .p-element > .w-full > .p-dropdown-label'
    ).click();
    cy.get('[ng-reflect-label="wolnostojący"] > .p-ripple').click();
    cy.get(':nth-child(3) > .p-element > .w-full > .p-dropdown-label').click();
    cy.get('[ng-reflect-label="cegła"] > .p-ripple').click();

    cy.get(
      ':nth-child(11) > :nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box'
    ).click();
    cy.get(
      ':nth-child(11) > :nth-child(2) > .p-element > .p-checkbox > .p-checkbox-box'
    ).click();
    cy.get(
      ':nth-child(11) > :nth-child(3) > .p-element > .p-checkbox > .p-checkbox-box'
    ).click();
    cy.get(
      ':nth-child(13) > :nth-child(3) > .p-element > .p-checkbox > .p-checkbox-box'
    ).click();

    cy.get('.items-end > .p-element').click();

    cy.get('#afterAddOfferDiv').contains('Oferta pomyślnie dodana');
    cy.url().should(
      'eq',
      'http://localhost:4200/dodaj-ogloszenie/oferta-dodana'
    );

    cy.get('#userAccountButton').click();
    cy.url().should('eq', 'http://localhost:4200/uzytkownik/ogloszenia');
    cy.wait(5000);

    cy.contains('Ogloszenie testowe nr1');

    cy.get(
      ':nth-child(1) > .min-w-full > :nth-child(1) > .flex > .ng-star-inserted'
    ).click();

    cy.contains('Ogloszenie testowe nr1');
    cy.contains(
      'Testowy opis nieruchomosci, testowy opis nieruchomosci. Test test test.'
    );
    cy.contains('wolnostojący');
    cy.contains('rolety antywłamaniowe, monitoring, ochrona');
  });
});

describe('Próba dodania oferty bez logowania', () => {
  it('Wejście na strone dodawania oferty', () => {
    cy.visit('/dodaj-ogloszenie/dom/sprzedaz');
    cy.url().should('eq', 'http://localhost:4200/login');
  });
});

describe('Dodawanie oferty - błędy walidacji', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('user@testowy.com');
    cy.get('#password').type('12345678');

    cy.get('.flex > .p-element').should('not.be.disabled');
    cy.get('.flex > .p-element').click();
  });
  it('Dodanie oferty zakończone niepowodzeniem - błędy walidacji', () => {
    cy.wait(1000);
    cy.get('#dropdown-user').click();
    cy.get('[routerlink="dodaj-ogloszenie"] > .p-3').click();
    cy.get(':nth-child(1) > .add-offer-option').trigger('mouseover');
    cy.get(':nth-child(1) > .add-offer-option > :nth-child(1)').click();
    cy.get('.items-end > .p-element').click();
    cy.get('.flex-col.gap-y-4 > :nth-child(1)').should(
      'contain',
      'Tytuł jest wymagany!'
    );
    cy.get('.flex-col.gap-y-4 > .flex-col > :nth-child(1)').should(
      'contain',
      'Powierzchnia jest wymagana!'
    );
    cy.get('.flex-col.gap-y-4 > .flex-col > :nth-child(2)').should(
      'contain',
      'Cena jest wymagana!'
    );
    cy.get('.flex-col.gap-y-4 > :nth-child(4)').should(
      'contain',
      'Lokalizacja jest wymagana!'
    );
    cy.get('.flex-col.gap-y-4 > :nth-child(5)').should(
      'contain',
      'Opis jest wymagany!'
    );
    cy.get('.flex-col.gap-y-4 > :nth-child(7) > .ng-star-inserted').should(
      'contain',
      'Zdjęcie główne jest wymagane!'
    );
    cy.url().should(
      'eq',
      'http://localhost:4200/dodaj-ogloszenie/dom/sprzedaz'
    );
  });
});

describe('Edycja oferty', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('user@testowy.com');
    cy.get('#password').type('12345678');

    cy.get('.flex > .p-element').should('not.be.disabled');
    cy.get('.flex > .p-element').click();
  });
  it('Edycja oferty zakończona sukcesem', () => {
    cy.wait(1000);
    cy.get('#dropdown-user').click();
    cy.get(
      '#dropdown-content-user > [routerlink="uzytkownik/ogloszenia"] > .p-3'
    ).click();
    cy.get(
      ':nth-child(1) > .min-w-full > .flex-col > .w-full > .ng-star-inserted > a > .p-element'
    ).click();
    cy.get('.flex-col.gap-y-4 > :nth-child(1) > .p-inputtext').clear();
    cy.get('.flex-col.gap-y-4 > :nth-child(1) > .p-inputtext').type(
      'Ogloszenie testowe nr1 - edycja'
    );
    cy.get('.items-end > .p-element').click();
    cy.url().should('eq', 'http://localhost:4200/uzytkownik/ogloszenia');
    cy.contains('Ogloszenie testowe nr1 - edycja');
    cy.contains('Ogłoszenie pomyślnie zaktualizowane!');
  });
});

describe('Zakończenie i przywrócenie ogłoszenia', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('user@testowy.com');
    cy.get('#password').type('12345678');

    cy.get('.flex > .p-element').should('not.be.disabled');
    cy.get('.flex > .p-element').click();
    cy.wait(5000);
  });
  it('Zakończenie i przywrócenie ogłoszenia zakończone sukcesem', () => {
    cy.get('#dropdown-user').click();
    cy.get(
      '#dropdown-content-user > [routerlink="uzytkownik/ogloszenia"] > .p-3'
    ).click();
    let title = '';
    cy.get(
      ':nth-child(1) > .min-w-full > .flex-col > .w-full > #offerLink > #offerTitle'
    ).then(($test) => {
      const offerTitle = $test.text();
      cy.get(
        ':nth-child(1) > .min-w-full > .flex-col > .w-full > .ng-star-inserted > [ptooltip="Zakończ ogłoszenie"]'
      ).click();
      cy.get('.p-button-danger').click();
      cy.contains('Ogłoszenie pomyślnie zakończone.');

      cy.get('[aria-pressed="false"]').click();

      cy.contains(offerTitle);
      cy.get('.min-w-full > .flex-col > .w-full > .p-element').click();

      cy.get('.p-button-danger').click();

      cy.contains('Ogłoszenie pomyślnie przywrócone.');

      cy.get('[aria-pressed="false"]').click();
      cy.contains(offerTitle);
    });
  });
});

describe('Edycja ogłoszenia, którego użytkownik nie jest autorem', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('user@testowy.com');
    cy.get('#password').type('12345678');
    cy.get('.flex > .p-element').should('not.be.disabled');
    cy.get('.flex > .p-element').click();
    cy.wait(5000);
  });
  it('Próba edycji ogłoszenia, którego zalogowany użytkownik nie jest autorem', () => {
    cy.visit('http://localhost:4200/ogloszenie/1/edytuj');
    cy.url().should('eq', 'http://localhost:4200/brak-dostepu');
  });
});
