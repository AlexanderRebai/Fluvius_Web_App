//Testen runnen mbv yarn test
describe("Start application", () => {
  it("shoud launch application", () => {
    cy.visit("http://localhost:3000");
    cy.get("form").should("exist");
  });
});

describe("Login", () => {
  it("should login a known user", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=username_input]").type("Robbert");
    cy.get("[data-cy=password_input]").type("12345678");
    cy.get("[data-cy=login_btn]").click();
    cy.get("[data-cy=cardbox]").should("be.visible");
  });

  it("should deny a wrong login combination", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=username_input]").type("Robbert");
    cy.get("[data-cy=password_input]").type("123");
    cy.get("[data-cy=login_btn]").click();
    cy.get(".swal-title").contains("Error");
  });
});

describe("Login e-id", () => {
  it("should login a known user", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=e-id_btn]").click();
    cy.get("[data-cy=kaartnummer_input]").type("11.11.11-123.45");
    cy.get("[data-cy=password_input]").type("1234");
    cy.get("[data-cy=login_btn]").click();
    cy.get("[data-cy=cardbox]").should("be.visible");
  });
});

