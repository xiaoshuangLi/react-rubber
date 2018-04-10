import webpack from 'webpack';
import baseConfig from './webpack.config.client';
import appConfig from '../config';

const config = baseConfig({
  mode: 'development',
});

config.devtool = 'source-map';

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      BABEL_ENV: JSON.stringify('development/client'),
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
);

if (config.entry.main.length !== 2 && config.entry.main[0] !== 'babel-polyfill') {
  throw new Error('Unexpected `main` webpack entry point detected');
}

config.entry.main = [
  `webpack-hot-middleware/client?path=http://${appConfig.webpack.devserver.host}:${appConfig.webpack.devserver.port}/__webpack_hmr`,
  'babel-polyfill',
  config.entry.main[1],
];

config.output.publicPath = `http://${appConfig.webpack.devserver.host}:${appConfig.webpack.devserver.port}${config.output.publicPath}`;

export default config;
