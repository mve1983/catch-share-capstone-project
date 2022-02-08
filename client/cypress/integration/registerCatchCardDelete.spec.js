/// <reference types="Cypress"/>

// This is a complete test of site functionality in general,
// it should register on page, then go to map site fill out a new catch card,
// after that delete his account

const register = {
  name: "cypressTest",
  email: "c@c.com",
  password: "111111",
  confirm: "111111",
};

describe("register on page and go to map page", () => {
  it("should go to tegister page", () => {
    cy.visit("/");
    cy.get('[data-testid="register-button"]').click();
  });
  it("should fill register fields", () => {
    cy.get('[id="name"]').type(register.name);
    cy.get('[id="email"]').type(register.email);
    cy.get('[id="password"]').type(register.password);
    cy.get('[id="confirmpassword"]').type(register.confirm);
  });
  it("should click the submit button", () => {
    cy.get('[data-testid="submit-register"]').click();
  });
  it("should click the menu button then go to map page", () => {
    cy.get('[data-testid="open-menu"]').click();
    cy.get('[data-testid="open-map"]').click();
  });
});

describe("click on map and fill catchform with minimum data", () => {
  it("should click the map", () => {
    cy.wait(1000);
    cy.get('[data-testid="map-wrapper"]').click("topLeft");
  });

  it("should fill the data", () => {
    cy.get('[id="date"]').type("2022-01-01");
    cy.get('[id="length"]').type("1");
    cy.get('[id="weight"]').type("1");
    cy.get('[id="depth"]').type("1");
  });

  it("should click the submit", () => {
    cy.get('[data-testid="submit-catch"]').click();
    cy.wait(3000);
  });
});

describe("got to account page and delete the test account", () => {
  it("should click the menu button then go to map page", () => {
    cy.get('[data-testid="open-menu"]').click();
    cy.get('[data-testid="open-account"]').click();
  });
  it("should click delete account", () => {
    cy.get('[data-testid="delete-account"]').click();
    cy.get('[data-testid="delete-confirm"]').click();
  });
});
