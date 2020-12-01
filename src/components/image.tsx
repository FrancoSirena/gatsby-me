import React, { ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

type PlaceholderImageType = {
  placeholderImage?: {
    childImageSharp?: {
      fluid: FluidObject | FluidObject[]
    }
  }
}

function Image(): ReactElement {
  const data = useStaticQuery<PlaceholderImageType>(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default Image
