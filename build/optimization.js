const constants = require('./constants');
const config = require('./config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports =
  constants.APP_ENV === 'dev'
    ? {}
    : {
        runtimeChunk: {
          name: 'manifest'
        },
        splitChunks: {
          cacheGroups: {
            default: false,
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all'
            }
          }
        },
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: config.sourceMap,
            extractComments: false,
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: true, // Note `mangle.properties` is `false` by default.
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_fnames: false
            }
          }),
          new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
              reduceIdents: false,
              autoprefixer: false
            }
          })
        ]
      };
