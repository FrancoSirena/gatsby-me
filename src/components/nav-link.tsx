import React, { ReactElement, ReactNode } from "react"
import { Link } from "gatsby"

type NavLinkType = {
  node?: NodeType
  children: ReactNode
}

export function NavLinkAnchor({ node, children }: NavLinkType): ReactElement {
  const to: string = !node?.node ? "/" : node.node.frontmatter.slug

  return (
    <Link className="nav-footer" to={to}>
      {children}
    </Link>
  )
}

export function NavLinkText({ node }: { node?: NodeType }): ReactElement {
  if (!node?.node) {
    return <>Home</>
  }
  return <>{node.node.frontmatter.title}</>
}
