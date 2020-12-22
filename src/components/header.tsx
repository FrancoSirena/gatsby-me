import React, { ReactElement } from "react"
import { Link } from "gatsby"
import ToggleTheme from "./toggle-theme"

type HeaderType = {
  siteTitle: string
}

export default function Header({ siteTitle }: HeaderType): ReactElement {
  return (
    <>
      <header className="site-header">
        <div>
          <Link to="/" className="unstyled">
            <h1>{siteTitle}</h1>
          </Link>
        </div>
        <div className="site-header__theme">
          <ToggleTheme />
        </div>
      </header>
      <svg viewBox="0 0 300 100" className="separator">
        <polygon id="e1_polygon" points="0 0, 300 0, 150 100" />
      </svg>
    </>
  )
}
