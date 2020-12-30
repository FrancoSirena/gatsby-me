import React, { ReactElement } from "react"
import { Link } from "gatsby"

type PostLinkType = {
  post: {
    frontmatter: FrontMatterType
  }
}

function PostLink({ post }: PostLinkType): ReactElement {
  return (
    <article className="post-link" data-testid="link-post-article">
      <header>
        <h1>
          <Link to={post.frontmatter.slug} data-testid="link-post">
            {post.frontmatter.title}
          </Link>
        </h1>
        <small data-testid="link-date" data-date={post.frontmatter.rawDate}>
          {post.frontmatter.date}
        </small>
      </header>
      <p>{post.frontmatter.summary}</p>
    </article>
  )
}

export default PostLink
