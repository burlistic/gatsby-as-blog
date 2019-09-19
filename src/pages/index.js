import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"



class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulBlog.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {/* <Bio /> */}
        {posts.map(({ node }) => {
          const title = node.blog || node.slug
          return (
            <article key={node.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.date}</small>
              </header>
              <section>
                {documentToReactComponents(node.richText.json)}
                


                <p
                  dangerouslySetInnerHTML={{
                    __html: 'html goes here!',
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}



export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlog {
      edges {
        node {
          blog
          date
          slug
          image {
            fluid {
              src
            }
          }
          richText {
            json
          }
        }
      }
    }
  }
`
