import React, { ReactElement } from "react"
import { Link } from "gatsby"
import Social from "./social"

export default function Footer(): ReactElement {
  return (
    <footer>
      <div>
        <Link to="/" className="unstyled">
          Franco Sirena {new Date().getFullYear()}
        </Link>
      </div>
      <Social />
      <div className="footnote">
        Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  )
}
