#!/usr/bin/env node

/* eslint-disable no-console, global-require, strict */

'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const historyApiFallback = require('connect-history-api-fallback');
const chalk = require('chalk');

const config = require('./config');
const sockets = require('./sockets');

if (config.env === 'development') {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack.config');

  const app = express();
  const server = http.createServer(app);
  const io = socketio(server);

  server.listen(config.api.port, () => console.log(chalk.green(`API listening on port ${config.api.port}`)));

  sockets(io);

  const client = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/api/**': {
        target: `http://localhost:${config.api.port}`,
        pathRewrite: { '^/api': '' },
      },
    },
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
  });

  client.use('/', express.static(path.join(__dirname, '../build')));
  client.listen(config.port, () => console.log(chalk.green(`Dev server listening on port ${config.port}`)));
} else if (config.env === 'production') {
  const app = express();
  const server = http.createServer(app);
  const io = socketio(server);
  server.listen(config.port);

  app.use(historyApiFallback());
  app.use('/', express.static(path.join(__dirname, '../build')));
  // app.listen(config.port, () => console.log(chalk.green(`Listening on port ${config.port}`)));

  sockets(io);
}
