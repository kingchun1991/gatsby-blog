/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import eleline from "../../images/eleline.png"

function SEO({
  description,
  lang,
  url,
  meta,
  keywords,
  title,
  image,
  type,
  noindex,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const index = noindex ? `noindex follow` : `index, follow`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `robots`,
          content: `${index}`,
        },
        {
          name: `viewport`,
          content: `width=device-width,initial-scale=1`,
        },
        {
          name: `google-site-verification`,
          content: `2yCmnAfMaC5adIBMLX2XVPF6DMoBMcQIpkbGASFxROE`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:locate`,
          content: `ja_JP`,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          property: `og:url`,
          content: `${url}`,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteUrl}${image}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:site`,
          content: `@${site.siteMetadata.author}`,
        },
        {
          name: `twitter:creator`,
          content: `@${site.siteMetadata.author}`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  keywords: [],
  description: ``,
  image: eleline,
  type: `article`,
  noindex: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string,
  noindex: PropTypes.bool,
}

export default SEO
