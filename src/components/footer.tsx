import React, { ReactElement } from "react"
import { Link } from "gatsby"
import Social from "./social"

export default function Footer(): ReactElement {
  return (
    <footer>
      <div>
        <Link to="/">
          Franco Sirena {new Date().getFullYear()}
        </Link>
      </div>
      <Social />
    </footer>
  )
}
