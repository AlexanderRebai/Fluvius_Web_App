describe('pages test', () => {
  beforeEach(() => {
    cy.login('Robbert', '12345678');
  });
  
  it('show categories', () => {
    cy.visit('http://localhost:3000/dashboard');
    cy.get('[data-cy=categorie]').should('have.length', 8);
    cy.get('[data-cy=categorie_name]').eq(0).contains('Nutsvoorzieningen');
    cy.get('[data-cy=categorie_doelstellingname]').eq(0).contains('Reductie Houtafval');
  });

  it('click categorie', () => {
    cy.visit('http://localhost:3000/dashboard');
    cy.get('[data-cy=categorie]').eq(0).click();

    cy.get('[data-cy=doelstelling]').should('have.length', 3);
    cy.get('[data-cy=doelstelling_name]').eq(2).contains('Energie verbruik');
    cy.get('[data-cy=doelstelling_threshold]').eq(2).contains('Drempelwaarde: 5');
  });

  it('click doelstelling', () => {
    cy.visit('http://localhost:3000/dashboard/categoriedetailpage/1');
    cy.get('[data-cy=doelstelling]').eq(0).click();

    cy.get('[data-cy=datasource]').should('have.length', 1);
    cy.get('[data-cy=datasource_name]').eq(0).contains('Afval Reductie');
    cy.get('[data-cy=datasource_waarde]').eq(0).contains('Waarde: 0 Ton');
  });
});

