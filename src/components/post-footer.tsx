import React, { ReactElement } from "react"
import { NavLinkAnchor, NavLinkText } from "./nav-link"

type PostFooterType = {
  next?: NodeType
  previous: NodeType
}

export default function PostFooter({
  next,
  previous,
}: PostFooterType): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <NavLinkAnchor node={next}>
        <div className="nav-footer__next">
          <NavLinkText node={next} />
        </div>
      </NavLinkAnchor>
      <NavLinkAnchor node={previous}>
        <div className="nav-footer__previous">
          <NavLinkText node={previous} />
        </div>
      </NavLinkAnchor>
    </div>
  )
}
