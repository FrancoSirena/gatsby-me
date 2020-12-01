import React, { ReactElement } from "react"
import { GitHub, LinkedIn, Twitter } from "./icons"

export default function Social(): ReactElement {
  return (
    <ul className="social">
      <li>
        <GitHub />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/FrancoSirena"
        >
          GitHub
        </a>
      </li>
      <li>
        <Twitter />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/francosirena"
        >
          Twitter
        </a>
      </li>
      <li>
        <LinkedIn />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/francosirena"
        >
          LinkedIn
        </a>
      </li>
    </ul>
  )
}
