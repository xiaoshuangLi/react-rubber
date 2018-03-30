import express from 'express';
import webpack from 'webpack';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.client.development';
import appConfig from '../config';

config.mode = 'development';

const compiler = webpack(config);
const devserver = new express();

devserver.use(webpackDevMiddleware(compiler, {
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  stats: {
    colors: true,
  },
}));

devserver.use(webpackHotMiddleware(compiler));

devserver.listen(appConfig.webpack.devserver.port, (error) => {
  if (error) {
    console.error(error.stack || error);
    throw error;
  }

  console.log('[webpack-dev-server] Runing');
});
