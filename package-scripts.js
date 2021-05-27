require("dotenv").config();

// Note: Netlify build command needs to be changed from npm run build
//       to npm start build
module.exports = {
  scripts: {
    dev: 'gatsby develop',
    build: 'cross-env GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true ACTIVE_ENV=production gatsby build --log-pages',
    postbuild: 'npm start percy',
    clean: 'gatsby clean',
    herokuPostbuild: 'gatsby build',
    percy: `cross-env PERCY=${process.env.PERCY_TOKEN} npx percy snapshot ./public`,
    serve: 'gatsby serve',
    setup: 'npm install --no-save contentful-import yargs-parser axios chalk && node ./setup.js'
  }
};
