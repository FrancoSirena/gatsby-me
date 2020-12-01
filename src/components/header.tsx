import React, { ReactElement } from "react"
import { Link } from "gatsby"
import ToggleTheme from "./toggle-theme"

type HeaderType = {
  siteTitle: string
}

export default function Header({ siteTitle }: HeaderType): ReactElement {
  return (
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
  )
}
