import React, { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import Social from "./social"
import { ThemeProvider } from "./theme-context"
import Footer from "./footer"

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
        <svg viewBox="0 0 100 100" className="triangle">
          <polygon id="e1_polygon" points="0 0, 0 100, 100 0" />
        </svg>
        <div className="body">
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
