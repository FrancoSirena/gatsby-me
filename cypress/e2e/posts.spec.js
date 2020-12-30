/// <reference types="Cypress" />

describe("List all posts by date", () => {
  beforeEach(() => {
    cy.clearLocalStorage()

    cy.visit("/", {
      onBeforeLoad: function (window) {
        window.localStorage.setItem("theme", "dark")
      },
    })
  })

  it("It should list all posts sorted by date", () => {
    cy.get('[data-testid="link-date"]').then(items => {
      const dates = items.map((_, item) => item.dataset.date)
      const expected = dates
        .map((_, d) => new Date(d))
        .sort((a, b) => b.getTime() - a.getTime())
        .map((_, d) => d.toISOString().split("T")[0])
      expect(Object.values(dates).slice(0, -2)).to.eql(
        Object.values(expected).slice(0, -2)
      )
    })
  })

  it("It should navigate to the correct post and show next and previous buttons", () => {
    cy.get('[data-testid="link-post-article"]:nth-child(2)')
      .find("a")
      .first()
      .as("post")
    cy.get('[data-testid="link-post-article"]:nth-child(1)')
      .find("a")
      .first()
      .invoke("text")
      .as("previous")
    cy.get('[data-testid="link-post-article"]:nth-child(3)')
      .find("a")
      .first()
      .invoke("text")
      .as("next")
    cy.get('[data-testid="link-post-article"]:nth-child(4)')
      .find("a")
      .first()
      .invoke("text")
      .as("next-previous")
    cy.get("@post").click().invoke("text").as("post-title")
    cy.get("@post-title").then(item =>
      cy.get("h1").invoke("text").should("contain", item)
    )
    cy.get("@previous")
      .then(item => {
        cy.get("div").findAllByText(item)
      })
      .get("@next")
      .then(item => cy.get("div").findAllByText(item))
      .parent()
      .click()
      .get("@next")
      .then(item => cy.get("h1").invoke("text").should("contain", item))
      .get("@next-previous")
      .then(item => {
        cy.get("div").findAllByText(item)
      })
      .get("@post-title")
      .then(item => {
        cy.get("div").findAllByText(item)
      })
  })

  it("It should render a HOME link for fist and last posts", () => {
    cy.get('[data-testid="link-post-article"]:first-child')
      .find("a")
      .first()
      .as("last")
    cy.get('[data-testid="link-post-article"]:last-child')
      .find("a")
      .first()
      .as("first")
    cy.get("@last").click().invoke("text").as("last-title")
    cy.get("@last-title")
      .then(item => {
        cy.get("body").findAllByText(item).get("div").findAllByText("Home")
      })
      .get("h1")
      .findByText("!Complicated")
      .click()
      .get("body")
      .get("@first")
      .click()
      .invoke("text")
      .then(item => {
        cy.get("body").findByText(item).get("div").findByText("Home")
      })
  })
})
