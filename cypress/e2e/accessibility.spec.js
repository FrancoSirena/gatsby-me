/// <reference types="Cypress" />

describe("[Dark Mode] Accessibility tests", () => {
  beforeEach(() => {
    cy.clearLocalStorage()

    cy.visit("/", {
      onBeforeLoad: function (window) {
        window.localStorage.setItem("theme", "dark")
      },
    })
      .get("main")
      .injectAxe()
  })
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y(undefined, {
      includedImpacts: ["critical", "serious"],
      runOnly: {
        type: "tag",
        values: ["wcag2a"],
      },
    })
  })
  it("Navigates to last blog post and checks for accessibility violations", () => {
    cy.get("a")
      .filter("[data-testid='link-post']")
      .first()
      .click()
      .get("body")
      .find("[data-testid='post-container']")
      .get("body")
    cy.checkA11y(undefined, {
      includedImpacts: ["critical", "serious"],
      runOnly: {
        type: "tag",
        values: ["wcag2a"],
      },
    })
  })
})

describe("[Regular Mode] Accessibility tests", () => {
  beforeEach(() => {
    cy.clearLocalStorage()

    cy.visit("/", {
      onBeforeLoad: function (window) {
        window.localStorage.setItem("theme", "regular")
      },
    })
      .get("main")
      .injectAxe()
  })
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y()
  })
  it("Navigates to last blog post and checks for accessibility violations", () => {
    cy.get("a")
      .filter("[data-testid='link-post']")
      .first()
      .click()
      .get("body")
      .find("[data-testid='post-container']")
      .get("body")

    cy.checkA11y(undefined, {
      includedImpacts: ["critical", "serious"],
    })
  })
})
