const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new TerserPlugin,
    new CssMinimizerPlugin(),
    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, 'eslintrc.js'),
      context: path.resolve(__dirname, 'src'),
      extensions: ['js', 'mjs', 'ts'],
    }),
    new StylelintPlugin({
      overrideConfigFile: path.resolve(__dirname, 'stylelint.config.mjs'),
      context: path.resolve(__dirname, 'src'),
      extensions: ['css', 'scss'],
    }),
    new HtmlWebpackPlugin( {
      template: './src/index.pug',
      filename: 'index.html'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          }
        }, 'css-loader'],
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]

  },
};
