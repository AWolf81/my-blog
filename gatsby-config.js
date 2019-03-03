let contentfulConfig;
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful');
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  host: isProduction ? 'cdn.contentful.com' : 'preview.contentful.com',
  accessToken: isProduction
    ? process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken
    : process.env.CONTENTFUL_PREVIEW_TOKEN || contentfulConfig.previewToken,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  );
}

const config = {
  siteMetadata: {
    twitterHandle: '@awolf81',
    url: 'https://blog.alexanderwolf.tech/',
    siteUrl: 'https://blog.alexanderwolf.tech/',
    title: 'Blog - Alexander Wolf',
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-social-cards`,
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: '>',
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {
                sh: 'bash',
                js: 'javascript',
              },
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
  ],
};

// optional plugins or production only plugins

if (isProduction) {
  // Tracking only in production
  // we're tracking with-out ip logging
  // Todo: Add an opt-out button
  const trackingId = process.env.GOOGLE_TRACKING_ID;

  if (trackingId) {
    config.plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: trackingId,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        cookieDomain: process.env.GOOGLE_COOKIE_DOMAIN,
      },
    });
  }
}

module.exports = config;
