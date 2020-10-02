import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import "katex/dist/katex.min.css"
import "../pages/index.css"
import Img from "gatsby-image"
import { DiscussionEmbed } from "disqus-react"


// import '../css/blog-post.css'; // make it pretty!

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { markdownRemark: post } = data // data.markdownRemark holds your post data
  // let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid


  // TODO: need to move this value to .env file
  const disqusConfig = {
    shortname: 'bryanwbear',
    config: { identifier: post.frontmatter.title },
  }

  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1 style={{marginBottom: "5rem", textAlign: "center"}}>{post.frontmatter.title}</h1>
        {/* <Img fluid={featuredImgFluid} /> */}
        <div
          className="blog-post-content"
          style={{fontFamily: "Computer Modern Serif", marginLeft: '15rem', marginRight: '15rem'}}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <DiscussionEmbed {...disqusConfig} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`