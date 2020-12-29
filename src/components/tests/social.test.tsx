import React from "react"
import { screen, render } from "@testing-library/react"
import Social from "../social"

describe("(Component) Social", () => {
  test("It should render all my social links", () => {
    const GITHUB_URL = "https://github.com/FrancoSirena"
    const TWITTER_URL = "https://twitter.com/francosirena"
    const LINKEDIN_URL = "https://linkedin.com/in/francosirena"

    render(<Social />)

    screen.getByText("GitHub")
    expect(
      screen
        .getByText("GitHub")
        .previousElementSibling?.getAttribute("data-icon")
    ).toEqual("github")
    expect(screen.getByTestId("github").getAttribute("href")).toEqual(
      GITHUB_URL
    )

    screen.getByText("Twitter")
    expect(
      screen
        .getByText("Twitter")
        .previousElementSibling?.getAttribute("data-icon")
    ).toEqual("twitter")
    expect(screen.getByTestId("twitter").getAttribute("href")).toEqual(
      TWITTER_URL
    )

    screen.getByText("LinkedIn")
    expect(
      screen
        .getByText("LinkedIn")
        .previousElementSibling?.getAttribute("data-icon")
    ).toEqual("linkedin-in")
    expect(screen.getByTestId("linkedin").getAttribute("href")).toEqual(
      LINKEDIN_URL
    )
  })
})
