import React, { ReactElement } from "react"
import { graphql, useStaticQuery } from "gatsby"
import PostLink from "./post-link"

type EdgeType = {
  node: {
    id: string
    excerpt: string
    frontmatter: FrontMatterType
  }
}

type MarkdownType = {
  allMarkdownRemark: {
    edges: Array<EdgeType>
  }
}

export default function Posts(): ReactElement {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery<MarkdownType>(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              slug
              title
              summary
            }
          }
        }
      }
    }
  `)
  return (
    <nav className="navigation-post-links">
      {edges.map(edge => (
        <PostLink key={edge.node.id} post={edge.node} />
      ))}
    </nav>
  )
}
