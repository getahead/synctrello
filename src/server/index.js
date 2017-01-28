require('babel-register');
require('babel-polyfill');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const config = require('./config').default;
const rootDir = require('path').resolve(__dirname, '..', '..');
const webpackIsomorphicAssets = require('../../webpack/assets').default;

if (!process.env.NODE_ENV) {
  throw new Error('Environment variable NODE_ENV must be set to development or production.');
}

global.Promise = require('../common/configureBluebird');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets)
  .server(rootDir, () => {
    require('./main');
  });
