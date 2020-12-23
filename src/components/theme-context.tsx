import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
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
  const [theme, setTheme] = useState<Theme | undefined>(() => {
    if (typeof localStorage !== "undefined") {
      let preferredTheme = localStorage.getItem("theme")
      if (!preferredTheme) {
        preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
          ? "dark"
          : "regular"
      }
      return preferredTheme as Theme
    }
    return undefined
  })

  useEffect(() => {
    let preferredTheme = localStorage.getItem("theme")
    if (!preferredTheme) {
      preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
        ? "dark"
        : "regular"
    }

    setTheme(preferredTheme as Theme)
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("data-color-mode", "dark")
    } else {
      document.body.setAttribute("data-color-mode", "regular")
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
