import React, { ReactElement } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type SiteMetadataType = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
    }
  }
}

type SEOPropTypes = {
  description: string
  lang: string
  meta: Array<any>
  title: string
}

function SEO({ description, lang, meta, title }: SEOPropTypes): ReactElement {
  const { site } = useStaticQuery<SiteMetadataType>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}>
      <html lang={lang} />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {meta.map(info => (
        <meta {...info} />
      ))}
      <title itemProp="name" lang="en">
        {title}
      </title>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
