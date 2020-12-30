import React from "react"
import { render, screen } from "@testing-library/react"
import { NavLinkAnchor, NavLinkText } from "../nav-link"

describe("(Component) NavLinkAnchor", () => {
  test("It should render a / when node is empty", () => {
    const emptyNode = undefined
    render(<NavLinkAnchor node={emptyNode}>Content</NavLinkAnchor>)

    screen.getByText("Content")
    expect(screen.getByText("Content").getAttribute("href")).toEqual("/")
  })

  test("It should render a `slug` when node has content", () => {
    const realNode: NodeType = {
      node: {
        frontmatter: {
          title: "Test",
          slug: "/my-slug",
          date: new Date().toLocaleString(),
          summary: "",
        },
      },
    }
    render(<NavLinkAnchor node={realNode}>Content</NavLinkAnchor>)

    screen.getByText("Content")
    expect(screen.getByText("Content").getAttribute("href")).toEqual("/my-slug")
  })
})

describe("(Component) NavLinkText", () => {
  test("It should render 'Home' when node is empty", () => {
    const emptyNode = undefined
    render(<NavLinkText node={emptyNode} />)

    screen.getByText("Home")
  })

  test("It should render the `title` when node has content", () => {
    const realNode: NodeType = {
      node: {
        frontmatter: {
          title: "Test Title",
          slug: "/my-slug",
          date: new Date().toLocaleString(),
          summary: "",
        },
      },
    }
    render(<NavLinkText node={realNode} />)

    screen.getByText("Test Title")
  })
})
