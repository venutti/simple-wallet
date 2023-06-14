/// <reference types="cypress" />

describe("Send", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get("input[placeholder='Secret key']").as("secretKeyInput");
    cy.contains("button", "Import").as("importButton");
  });

  it("should send XLM to another account", () => {
    cy.get("@secretKeyInput").type(Cypress.env("SECRET_KEY"));
    cy.get("@importButton").click();

    cy.contains("p", "Lumens").then(($balance) => {
      const initialBalance = parseFloat($balance.text().split(" ")[0]);
      cy.wrap(initialBalance).as("initialBalance");
    });

    cy.contains("button", "Send").click();

    cy.get("input[placeholder='Amount']").type("100");
    cy.get("input[placeholder='Destination']").type(
      Cypress.env("DEST_PUBLIC_KEY")
    );

    cy.contains("div", "Send XLM").contains("button", "Send").click();
    cy.wait(8000);

    cy.contains("p", "Lumens").then(($balance) => {
      const finalBalance = parseFloat($balance.text().split(" ")[0]);
      cy.get("@initialBalance").should("be.greaterThan", finalBalance);
    });
  });
});
