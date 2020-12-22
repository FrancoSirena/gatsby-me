import React, { ReactElement } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../components/posts"

export default function IndexPage(): ReactElement {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="intro">
        Hi there! My name is Franco Sirena and this is my personal blog in which
        I write tech notes and articles mostly related to javascript and web
        development. I am currently working with React and Node.js, so those are
        most likely the topics I will be covering here, because I do like
        working with it and I've been doing it for quite a while. Hope you find
        the content here valuable. Enjoy :)
      </div>
      <Posts />
    </Layout>
  )
}
