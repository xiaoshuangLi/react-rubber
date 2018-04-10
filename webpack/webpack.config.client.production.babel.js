import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import baseConfig from './webpack.config.client';

const config = baseConfig({
  mode: 'production',
  development: false,
  useMiniCssExtractPlugin: true,
});

config.devtool = 'hidden-source-map';

config.performance = {
  hints: false,
};

config.optimization = {
  runtimeChunk: {
    name: 'manifest',
  },
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: false,
    cacheGroups: {
      vendor: {
        name: 'vendor',
        chunks: 'initial',
        priority: -10,
        reuseExistingChunk: false,
        test: /[\\/]node_modules[\\/]/,
      },
    },
  },
  minimizer: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        warnings: false,
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          warnings: false,
          collapse_vars: true,
          reduce_vars: true,
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
    }),
  ],
};

config.plugins.push(
  new CleanPlugin(
    [path.relative(config.context, config.output.path)],
    { root: config.context }
  ),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new Visualizer({
    filename: '../public/bundle-stats.html',
  })
);

export default config;
