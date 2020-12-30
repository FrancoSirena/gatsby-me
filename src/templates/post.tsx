import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "./post.css"
import SEO from "../components/seo"
import PostFooter from "../components/post-footer"

type MarkdownRemarkType = {
  markdownRemark: {
    html: string
    frontmatter: FrontMatterType
    date: string
  }
  previous: {
    edges: Array<NodeType>
  }
  next: {
    edges: Array<NodeType>
  }
}

type TemplateType = {
  data: MarkdownRemarkType
}

export default function Template({ data }: TemplateType): ReactElement {
  const {
    markdownRemark,
    previous: {
      edges: [previous],
    },
    next: {
      edges: [next],
    },
  } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div className="blog-post-container" data-testid="post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <hr />
      <PostFooter next={next} previous={previous} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $date: Date) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        unformattedDate: date
        slug
        title
      }
    }
    previous: allMarkdownRemark(
      limit: 1
      filter: { frontmatter: { date: { lt: $date } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
    next: allMarkdownRemark(
      limit: 1
      filter: { frontmatter: { date: { gt: $date } } }
      sort: { order: ASC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`
