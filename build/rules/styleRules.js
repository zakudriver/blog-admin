const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./../config');
const { resolve } = require('./../utils');
const theme = require('./../../theme');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [require('bourbon').includePaths, resolve('src/styles')]
  }
};

const lessLoader = {
  loader: 'less-loader',
  options: {
    // modifyVars: {
    //   '@primary-color': '#000'
    // },
    javascriptEnabled: true,
    enableJavascript: true
  }
};

const typingsForCssModulesLoader = {
  loader: 'typings-for-css-modules-loader',
  options: {
    modules: true,
    namedExport: true,
    camelCase: true,
    sass: true
  }
};

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    // provide a cache directory where cache items should be stored
    cacheDirectory: resolve('.cache-loader')
  }
};

module.exports = [
  {
    test: /\.css$/,
    include: [resolve('node_modules')],
    use: [config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader', cacheLoader, 'css-loader']
  },
  // {
  //   test: /\.scss$/,
  //   include: [resolve('src')],
  //   rules: [{
  //     use: [
  //       config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
  //       typingsForCssModulesLoader,
  //       'postcss-loader',
  //       sassLoader
  //     ]
  //   }]
  // },
  {
    // for ant design
    test: /\.less$/,
    rules: [
      {
        use: [
          config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          // 'postcss-loader',
          lessLoader
        ]
      }
    ]
    // use: [config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', lessLoader]
  }
];
