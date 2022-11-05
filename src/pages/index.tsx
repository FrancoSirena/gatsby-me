import React, { ReactElement } from "react"

import Layout from "../components/layout"
import { SEO } from "../components/seo"
import Posts from "../components/posts"
import Intro from "./intro"

export default function IndexPage(): ReactElement {
  return (
    <Layout>
      <Intro />
      <Posts />
    </Layout>
  )
}

export const Head = () => <SEO title="Home" />