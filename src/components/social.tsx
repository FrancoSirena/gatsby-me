import React, { ReactElement } from "react"
import { GitHub, LinkedIn, Twitter } from "./icons"

export default function Social(): ReactElement {
  return (
    <ul className="social">
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/FrancoSirena"
          data-testid="github"
        >
          <GitHub />
          <span className="name">GitHub</span>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/francosirena"
          data-testid="twitter"
        >
          <Twitter />
          <span className="name">Twitter</span>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/francosirena"
          data-testid="linkedin"
        >
          <LinkedIn />
          <span className="name">LinkedIn</span>
        </a>
      </li>
    </ul>
  )
}
