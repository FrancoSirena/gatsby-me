import React from "react"
import { screen, render } from "@testing-library/react"
import Footer from "../footer"

describe("(Component) Footer", () => {
  test("It should render name, social links and a gatsby info", () => {
    const year = new Date().getFullYear()
    render(<Footer />)

    screen.getByText(`Franco Sirena ${year}`)
    screen.getByText("GitHub")
    screen.getByText("Twitter")
    screen.getByText("LinkedIn")
  })
})
