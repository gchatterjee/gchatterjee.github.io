const path = require('path')

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'index.js',
  },
}
