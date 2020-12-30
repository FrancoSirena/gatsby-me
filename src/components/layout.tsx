import React, { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import { ThemeProvider } from "./theme-context"
import Footer from "./footer"
import "../css/layout.css"

type LayoutPropsType = {
  children: ReactNode
}

type SiteMetaType = {
  site: { siteMetadata?: { title: string } }
}

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  const data = useStaticQuery<SiteMetaType>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider>
      <div className="page">
        <svg
          viewBox="0 0 100 100"
          className="triangle"
          aria-label="Left corner triangle"
        >
          <polygon id="e1_polygon" points="0 0, 0 100, 100 0" />
        </svg>
        <div className="site-content">
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <div className="content">
            <main>{children}</main>
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
