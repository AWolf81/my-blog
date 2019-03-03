# My personal blog

It's a customized version of gatsby-contentful-starter that is including the following changes:

- Gatsby v2 (base repo was at v1 - so I migrated it, would be not needed with contentful-userland starter)
- Modified routing to blog.alexanderwolf.tech/{$slug} from /blog/{$slug}
- Prettier with Husky in pre-commit hook
- Eslint
- Customized styling & changed everything to [styled-components](https://www.styled-components.com/)
- Deployed to Netlify with continous deployment (devel & master branch)
- Preview API for devServer
- Disqus for commenting
- [React-Share](https://www.npmjs.com/package/react-share) for social sharing
- Syntax highlighting with [gatsby-remark-prsimjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/)
- Reading time estimation with [gatsby-remark-readingtime](https://www.gatsbyjs.org/packages/gatsby-remark-reading-time/)

You can find more details about how I created the setup in this [post](https://blog.alexanderwolf.tech/creating-a-blog-with-gatsby-and-contentful).

## Blog

You can find a live version of the code on [blog.alexanderwolf.tech](blog.alexanderwolf.tech)

## Todos

- [ ] Add a logo/header that's available on each post
- [ ] Use PreviewAPI on Netlify devel deployment - not working yet
- [ ] Check codesandbox embeds
- [ ] Check routing as static pages are difficult to add (e.g. /privacy)

# Blog based on Contentful Gatsby Starter Blog

Create a [Gatsby](http://gatsbyjs.com/) blog powered by [Contentful](https://www.contentful.com). This is a simplified version of the [Gatsby Contentful Starter](https://github.com/contentful-userland/gatsby-contentful-starter) which is maintained by our Community.

![The index page of the starter blog](https://rawgit.com/contentful-userland/gatsby-contentful-starter/master/screenshot.jpg 'The index page of the starter blog')

Static sites are scalable, secure and have very little required maintenance. They come with a drawback though. Not everybody feels good editing files, building a project and uploading it somewhere. This is where Contentful comes into play.

With Contentful and Gatsby you can connect your favorite static site generator with an API that provides an easy to use interface for people writing content and automate the publishing using services like [Travis CI](https://travis-ci.org/) or [Netlify](https://www.netlify.com/).

## Features (from base)

- Simple content model and structure. Easy to adjust to your needs.
- Use the [synchronization feature](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/synchronization) of our [Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/).
- Responsive/adaptive images via [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) and our [Images API](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/synchronization/initial-synchronization-of-entries-of-a-specific-content-type).

## Getting started

See our [official Contentful getting started guide](https://www.contentful.com/developers/docs/tutorials/general/get-started/).

## Crucial Commands

### `npm run dev`

Run the project locally with live reload in development mode.

### `npm run build`

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

### `npm run serve`

Spin up a production-ready server with your blog. Don't forget to build your page beforehand.

## Deployment

See the [official Contentful getting started guide](https://www.contentful.com/developers/docs/tutorials/general/get-started/).

## Contribution

Feel free to open pull requests to fix bugs. If you want to add features, please have a look at the [original version](https://github.com/contentful-userland/gatsby-contentful-starter). It is always open to contributions and pull requests.

You can learn more about how Contentful userland is organized by visiting [our about repository](https://github.com/contentful-userland/about).
