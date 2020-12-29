import React from "react"
import { screen, render } from "@testing-library/react"
import PostFooter from "../post-footer"

describe("(Component) PostFooter", () => {
  test("It should render a `next` link and a `previous` link", () => {
    const next: NodeType = {
      node: {
        frontmatter: {
          title: "Next Item",
          slug: "slug-next",
          summary: "",
          date: new Date(),
        },
      },
    }
    const previous: NodeType = {
      node: {
        frontmatter: {
          title: "Previous Item",
          slug: "slug-previous",
          summary: "",
          date: new Date(),
        },
      },
    }
    render(<PostFooter previous={previous} next={next} />)

    expect(
      screen.getByText("Next Item").parentElement?.getAttribute("href")
    ).toEqual("/slug-next")

    expect(
      screen.getByText("Previous Item").parentElement?.getAttribute("href")
    ).toEqual("/slug-previous")
  })
})
