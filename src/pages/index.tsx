import React, { ReactElement } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../components/posts"

export default function IndexPage(): ReactElement {
  return (
    <Layout>
      <SEO title="Home" />
      <Posts />
    </Layout>
  )
}
