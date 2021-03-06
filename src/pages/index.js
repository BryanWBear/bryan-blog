import React from "react"
import { Link, graphql } from "gatsby"
import "./index.css"
import Sidebar from "../components/Sidebar/index.js"


// import '../css/index.css'; // add some style if you want!

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div className="container" style={{display: 'flex'}}>
      {/* <img src={slime} alt="Logo" /> */}
      <Sidebar/>
      <div className="blog-posts" style={{width: '70%'}}>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="blog-post-preview" style={{fontFamily: "Computer Modern Serif", display: "flex", flexDirection: "column", alignItems: "center"}}key={post.id}>
              <h1>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h1>
              <h2>{post.frontmatter.date}</h2>
              <p>{post.excerpt}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}



export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
