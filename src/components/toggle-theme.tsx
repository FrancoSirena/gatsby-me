import React, { ReactElement, useEffect, useState } from "react"
import { useThemeContext } from "./theme-context"

export default function ToggleTheme(): ReactElement {
  const { theme, toggleTheme } = useThemeContext()
  const [themeOn, setThemeOn] = useState<"on" | "off">("off")

  function onClick(): void {
    toggleTheme()
  }

  useEffect(() => {
    setThemeOn(theme === "dark" ? "on" : "off")
  }, [theme])

  return (
    <button
      className="btn-toggle"
      title="Change theme"
      aria-label="Change theme"
      onClick={onClick}
    >
      <div className={`btn-toggle__toggler btn-toggle__toggler--${themeOn}`}>
        {theme === "dark" ? "🌒" : "☀️"}
      </div>
    </button>
  )
}
