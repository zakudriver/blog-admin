const tsconfigPathWebpackPlugin = 'tsconfig-paths-webpack-plugin'

const config = require('./config')
const constants=require('./constants')

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.tsx']
  },
  output: {
    pathinfo: true,
    path:config.outputPath,
    filename:config.outputFilename,
    publicPath:config.outputPublicPath
  },
  resolve:{
    extensions: constants.FILE_EXTENSIONS,
  }
}