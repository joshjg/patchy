/* eslint-disable strict */

'use strict';

const path = require('path');
const webpack = require('webpack');
const rucksack = require('rucksack-css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let appEntry;
let devtool;
let plugins;

if (process.env.NODE_ENV === 'staging') {
  appEntry = [path.join(__dirname, 'client/index.js')];
  devtool = 'cheap-module-source-map';
  plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      title: 'Patchy',
      appMountId: 'root',
      mobile: true,
    }),
    new FaviconsWebpackPlugin('./client/assets/favicon.png'),
  ];
} else {
  appEntry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'client/index.js'),
  ];
  devtool = 'cheap-module-eval-source-map';
  plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      title: 'Patchy',
      appMountId: 'root',
      mobile: true,
    }),
    // new FaviconsWebpackPlugin('./client/assets/favicon.png'),
  ];
}

module.exports = {
  entry: {
    app: appEntry,
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'react-addons-css-transition-group',
      'react-markdown',
      'socket.io-client',
      'react-css-modules',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name]-[hash].js',
  },
  devtool,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss',
      ],
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000&name=assets/[hash].[ext]',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.md$/,
      loader: 'raw',
    }, {
      test: /\.wav$/,
      loader: 'arraybuffer',
    }],
  },
  postcss: [rucksack({ autoprefixer: true })],
  plugins,
};
