import React, { ReactElement } from "react"
import { useThemeContext } from "./theme-context"

export default function ToggleTheme(): ReactElement {
  const { theme, toggleTheme } = useThemeContext()

  function onClick(): void {
    toggleTheme()
  }

  return (
    <button className={`btn-toggle `} onClick={onClick}>
      <div
        className={`btn-toggle__toggler btn-toggle__toggler--${
          theme == "dark" ? "on" : "off"
        }`}
      >
        {theme === "dark" ? "🌒" : "☀️"}
      </div>
      {/* {theme === "dark" ? "On" : "Off"} */}
    </button>
  )
}
