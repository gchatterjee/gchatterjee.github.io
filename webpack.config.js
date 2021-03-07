const path = require('path')

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    index: './src/index.js',
    postload: './src/postload.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js',
  },
}
