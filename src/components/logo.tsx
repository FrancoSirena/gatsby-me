import React, { ReactElement, StyleHTMLAttributes } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

type PlaceholderImageType = {
  placeholderImage?: {
    childImageSharp?: {
      fluid: FluidObject | FluidObject[]
    }
  }
}

type LogoType = {
  className?: string
  alt: string
  style?: StyleHTMLAttributes<Img>
}

function Logo(imgProps: LogoType): ReactElement {
  const data = useStaticQuery<PlaceholderImageType>(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <Img fluid={data.placeholderImage.childImageSharp.fluid} {...imgProps} />
  )
}

export default Logo
