const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: './dist',
      port: 3001,
      hot: !isProduction, // Отключаем HMR на продакшене
    },
    plugins: [
      new MiniCssExtractPlugin(),
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
      new HtmlWebpackPlugin({
        title: isProduction ? 'Production' : 'Development',
        template: './src/index.pug',
        filename: 'index.html'
      })
    ],
    optimization: {
      minimize: isProduction, // Минификация только на продакшене
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
};
