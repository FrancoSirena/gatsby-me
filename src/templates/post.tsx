import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "./post.css"

type MarkdownRemarkType = {
  markdownRemark: {
    html: string
    frontmatter: FrontMatterType
  }
}

type TemplateType = {
  data: MarkdownRemarkType
}

export default function Template({ data }: TemplateType): ReactElement {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
