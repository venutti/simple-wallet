/// <reference types="cypress" />

describe("Account", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get("input[placeholder='Secret key']").as("secretKeyInput");
    cy.contains("button", "Import").as("importButton");
  });

  it("should load account information", () => {
    cy.get("@secretKeyInput").type(Cypress.env("SECRET_KEY"));
    cy.get("@importButton").click();

    cy.contains("h1", "Your Balance").should("be.visible");
    cy.contains("button", "Send").should("be.visible");
  });
});
