/// <reference types="Jest" />

import React, { ReactElement } from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { ThemeContext, ThemeProvider, useThemeContext } from "../theme-context"

function Dummy(): ReactElement {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <>
      My theme is: {theme} <button onClick={toggleTheme}>Toggle</button>{" "}
    </>
  )
}

describe("(Component) ThemeProvider", () => {
  let originalMatch: (q: string) => MediaQueryList
  beforeEach(() => {
    originalMatch = window.matchMedia
  })
  afterEach(() => {
    window.matchMedia = originalMatch
    localStorage.clear()
  })
  test("It should read user preferred color scheme on first load, regular mode", () => {
    window.matchMedia = () =>
      ({
        matches: false,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
      } as MediaQueryList)
    render(
      <ThemeProvider>
        <Dummy />
      </ThemeProvider>
    )

    screen.getByText("My theme is: regular")
  })

  test("It should read user preferred color scheme on first load, dark mode", () => {
    window.matchMedia = () =>
      ({
        matches: true,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
      } as MediaQueryList)
    render(
      <ThemeProvider>
        <Dummy />
      </ThemeProvider>
    )

    screen.getByText("My theme is: dark")
  })

  test("It should read previously defined theme using localStorage", () => {
    localStorage.setItem("theme", "dark")
    window.matchMedia = () =>
      ({
        matches: false,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
      } as MediaQueryList)

    render(
      <ThemeProvider>
        <Dummy />
      </ThemeProvider>
    )

    screen.getByText("My theme is: dark")
  })

  test("It should let user toggle them and update localStorage", () => {
    window.matchMedia = () =>
      ({
        matches: false,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
      } as MediaQueryList)

    render(
      <ThemeProvider>
        <Dummy />
      </ThemeProvider>
    )

    screen.getByText("My theme is: regular")

    fireEvent.click(screen.getByText("Toggle"))

    screen.getByText("My theme is: dark")

    expect(localStorage.getItem("theme")).toEqual("dark")
  })

  test("It should work with ThemeContext defaults", () => {
    render(<Dummy />)

    screen.getByText("My theme is: regular")

    fireEvent.click(screen.getByText("Toggle"))

    screen.getByText("My theme is: regular")
  })
})
