const path = require('path')
const config = require('./config')

exports.assetsPath = function (dir) {
  return path.posix.join(config.assetsDirectory, dir)
}

exports.resolve = function (dir) {
  return path.join(__dirname, './../', dir)
}