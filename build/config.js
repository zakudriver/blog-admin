const path = require('path')

const constants = require('./constants')
const { assetsPath } = require('./utils')

module.exports = {
  outputPath: path.resolve(__dirname, './../dist'),
  outputPublicPath: '/',
  outputFilename: constants.NODE_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[chunkhash].js'),
  outputChunkFilename: constants.NODE_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[id].[chunkhash].js'),

  assetsDirectory: 'static'
}