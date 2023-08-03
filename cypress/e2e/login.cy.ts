/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.contains("button", "Create account").as("createAccountButton");
    cy.get("input[placeholder='Secret key']").as("secretKeyInput");
    cy.contains("button", "Import").as("importButton");
  });

  it("creates a new account", () => {
    cy.get("@createAccountButton").click();
    cy.wait(6000);
    cy.url().should("include", "/account");
  });

  it("imports an existing account", () => {
    cy.get("@secretKeyInput").type(Cypress.env("SECRET_KEY"));
    cy.get("@importButton").click();
    cy.url().should("include", "/account");
  });
});
