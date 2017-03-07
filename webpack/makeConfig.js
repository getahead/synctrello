import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import config from '../src/server/config';
import constants from './constants';
import ip from 'ip';
import nib from 'nib';
import path from 'path';
import webpack from 'webpack';
import webpackIsomorphicAssets from './assets';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);
const devtools = 'cheap-module-eval-source-map';

const loaders = {
  css: '',
  styl: '!stylus-loader',
};

const serverIp = config.remoteHotReload
  ? ip.address() // Dynamic IP address enables hot reload on remote devices.
  : 'localhost';

const makeConfig = (options) => {
  const {
    isDevelopment,
  } = options;

  const stylesLoaders = Object.keys(loaders).map((ext) => {
    const prefix = 'css-loader';
    const extLoaders = prefix + loaders[ext];
    const loader = isDevelopment
      ? `style-loader!${extLoaders}`
      : ExtractTextPlugin.extract('style-loader', extLoaders);
    return {
      loader,
      test: new RegExp(`\\.(${ext})$`),
    };
  });

  const config = {
    hotPort: constants.HOT_RELOAD_PORT,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'client/index.js'),
      ] : [
        path.join(constants.SRC_DIR, 'client/index.js'),
      ],
    },
    module: {
      loaders: [
        {
          loader: 'url-loader?limit=10000',
          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
        }, {
          loader: 'url-loader?limit=1',
          test: /favicon\.ico$/,
        }, {
          loader: 'url-loader?limit=100000',
          test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
        }, {
          test: /\.js$/,
          exclude: constants.NODE_MODULES_DIR,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react', 'stage-1'],
            plugins: [
              ['transform-runtime', {
                helpers: false,
                polyfill: false,
                regenerator: false,
              }],
            ],
            env: {
              production: {
                plugins: [
                  'transform-react-constant-elements',
                ]
              }
            }
          }
        },
        ...stylesLoaders,
      ]
    },
    stylus: {
      use: [nib()],
      import: [
        '~nib/lib/nib/index.styl',
        path.join(constants.SRC_DIR, 'client/app/variables'),
        path.join(constants.SRC_DIR, 'client/app/mixins')
      ]
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`,
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/assets/',
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            IS_BROWSER: true,
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
          },
        }),
      ];
      if (isDevelopment) {
        plugins.push(
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          webpackIsomorphicToolsPlugin.development(),
        );
      } else {
        plugins.push(
          new ExtractTextPlugin('app-[hash].css', {
            allChunks: true,
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              screw_ie8: true,
              warnings: false,
            },
          }),
          webpackIsomorphicToolsPlugin,
        );
      }
      return plugins;
    })(),
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        react$: require.resolve(path.join(constants.NODE_MODULES_DIR, 'react')),
      },
    },
  };

  return config;
};

export default makeConfig;
