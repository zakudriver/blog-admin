const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const constants = require('./constants');
const config = require('./config');
const {
  assetsPath,
  resolve
} = require('./utils');
const env = require('./env');

const options = {
  stylesDir: resolve('src/styles/less'),
  antDir: resolve('node_modules/antd'),
  varFile: resolve('src/styles/less/vars.less'),
  mainLessFile: resolve('src/styles/less/index.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background',
    '@border-color-base'
  ],
  indexFileName: 'index.html',
  generateOnce: false // generate color.less on each compilation
}

const basePlugins = [
  new webpack.DefinePlugin(env),
  new MomentLocalesPlugin({
    localesToKeep: ['es-us', 'zh-cn']
  }),
  new CopyWebpackPlugin([{
    from: resolve('public'),
    to: config.assetsDirectory,
    ignore: ['.*']
  }]),
  new MonacoWebpackPlugin(),
  new AntDesignThemePlugin(options)
];

const devPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'public/index.html',
    inject: true
  }),
  new ForkTsCheckerWebpackPlugin({
    async: false,
    tslint: config.tsLintPath
  })
];

const prodPlugins = [
  new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  new HtmlWebpackPlugin({
    filename: config.index,
    template: 'public/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: assetsPath('css/[name].[hash].css'),
    chunkFilename: assetsPath('css/[name].[id].[hash].css')
  })
];

if (config.bundleAnalyzerReport) {
  const {
    BundleAnalyzerPlugin
  } = require('webpack-bundle-analyzer');
  prodPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins);