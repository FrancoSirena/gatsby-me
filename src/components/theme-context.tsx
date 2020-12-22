import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"

export const ThemeContext = createContext<ThemeContextType>({
  theme: "regular",
  toggleTheme: () => null,
})

export function useThemeContext(): ThemeContextType {
  return useContext(ThemeContext)
}

type ThemeProviderType = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderType): ReactElement {
  const [theme, setTheme] = useState(
    (): Theme => {
      if (typeof localStorage !== "undefined") {
        let preferredTheme = localStorage.getItem("theme")
        if (!preferredTheme) {
          preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
            ? "dark"
            : "regular"
        }
        return preferredTheme as Theme
      }
      return "regular"
    }
  )

  useEffect(() => {
    let preferredTheme = localStorage.getItem("theme")
    if (!preferredTheme) {
      preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
        ? "dark"
        : "regular"
    }

    setTheme(preferredTheme as Theme)
  }, [])

  useLayoutEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("data-dark-mode", "")
    } else {
      document.body.removeAttribute("data-dark-mode")
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "regular" : "dark"
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
