const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
