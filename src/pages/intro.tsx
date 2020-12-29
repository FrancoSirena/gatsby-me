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

function Image(imgProps: LogoType): ReactElement {
  const data = useStaticQuery<PlaceholderImageType>(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "me.png" }) {
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

export default function Intro(): ReactElement {
  return (
    <div className="intro">
      <div className="intro-pic">
        <Image alt="Franco's picture" className="intro-pic__picture" />
      </div>
      <div className="intro-text">
        Hi there! My name is Franco Sirena and this is my personal blog in which
        I write tech notes and articles mostly related to javascript and web
        development. I am currently working with React and Node.js, so those are
        most likely the topics I will be covering here, because I do like
        working with it and I've been doing it for quite a while. Hope you find
        the content here valuable. Enjoy :)
      </div>
    </div>
  )
}
