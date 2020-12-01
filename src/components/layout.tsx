import React, { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import Social from "./social"
import { ThemeProvider } from "./theme-context"

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
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div className="content">
          <main>{children}</main>
          <aside>
            <Social />
          </aside>
        </div>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
