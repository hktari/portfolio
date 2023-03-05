/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const util = require('util');

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

const createMarkdownPages = async (contentType, componentType, createContext, { graphql, actions, reporter }) => {

  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark( filter: {fields: {contentType: {eq: "${contentType}"}}}, sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
            contentType
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your content of type ${contentType}`,
      result.errors
    )
    return
  }

  const contentNodes = result.data.allMarkdownRemark.nodes

  // Create blog posts pages and project pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (contentNodes.length > 0) {
    contentNodes.forEach((curNode, index) => {
      createPage({
        path: curNode.fields.slug,
        component: componentType,
        context: {
          id: curNode.id,
          ...createContext(curNode, index, contentNodes)
        },
      })
    })
  }
}


/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  await createMarkdownPages(
    'blog',
    blogPost,
    (node, index, allNodes) => {
      const previousPostId = index === 0 ? null : allNodes[index - 1].id
      const nextPostId = index === allNodes.length - 1 ? null : allNodes[index + 1].id
      return {
        previousPostId,
        nextPostId
      }
    }, { graphql, actions, reporter })


}

// extracts 'test' from a file path string like '/home/hktari/source/web/portfolio/gatsby-starter-blog/content/test/projects/tinefrizer.md'
const extractContentTypeFromFilePath = (filePath) => {

  const matchFirstFolderAfterContent = /\/content\/([\w]*)\//
  const match = filePath.match(matchFirstFolderAfterContent)

  if (!match) {
    return undefined
  }
  const contentType = match[1]

  return contentType
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const contentSlug = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: contentSlug,
    })

    const contentType = extractContentTypeFromFilePath(node.fileAbsolutePath)

    if (!contentType) {
      reporter.panicOnBuild(
        `Failed to extract content type of the given file: ${node.fileAbsolutePath}. Make sure your content files are inside a subfolder of the 'content' folder.`,
        node
      )
      return
    }

    createNodeField({
      name: `contentType`,
      node,
      value: contentType,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    
    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
    
    type Fields {
      contentType: String
      slug: String
    }
  `)
}
