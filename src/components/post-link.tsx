import React, { ReactElement } from "react"
import { Link } from "gatsby"

type PostLinkType = {
  post: {
    frontmatter: FrontMatterType
  }
}

function PostLink({ post }: PostLinkType): ReactElement {
  return (
    <article className="post-link">
      <h1>
        <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
      </h1>
      <p>{post.frontmatter.summary}</p>
    </article>
  )
}

export default PostLink
