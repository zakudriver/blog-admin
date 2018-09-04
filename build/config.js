const path = require('path');
const constants = require('./constants');

// 静态资源访问域名（CDN）
// const STATICDOMAIN = constants.APP_ENV === 'prod' ? '.' : '';

module.exports = {
  index: path.resolve(__dirname, `./../dist/index.html`),
  outputPath: path.resolve(__dirname, `./../dist`),
  outputPublicPath: '/',

  assetsDirectory: 'static',
  sourceMap: false,
  extractCss: constants.APP_ENV !== 'dev',
  bundleAnalyzerReport: process.env.npm_config_report,

  devServer: {
    contentBase: './', //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    host: '127.0.0.1',
    port: 7000,
    hot: true,
    inline: true, //实时刷新
    hot: true, //Enable webpack's Hot Module Replacement feature
    compress: true, //Enable gzip compression for everything served
    overlay: true, //Shows a full-screen overlay in the browser
    stats: 'errors-only', //To show only errors in your bundle
    open: true //When open is enabled, the dev server will open the browser.
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' }
    //   }
    // }
  }
};
