var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

var projectFolder = path.resolve(__dirname, '../');
var outputPath = path.resolve(projectFolder, '../lib');

module.exports = {
  context: projectFolder,
  devtool: 'source-map',
  mode: 'production',
  performance: {
    hints: false,
  },
  entry: {
    main: [
      path.resolve(projectFolder, 'src/js/index'),
    ],
  },
  output: {
    path: path.resolve(projectFolder, 'lib'),
    publicPath: '/',
    filename: 'index.js',
    library: {
      root: "ReactRubber",
      amd: "ReactRubber",
      commonjs: "react-rubber"
    },
    libraryTarget: "umd"
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /^(?!.*(_inline)).*\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /_inline\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'js/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /_inline\.svg$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
            },
          },
          {
            loader: 'svg-react-loader',
          },
        ],
      },
      {
        test: /^(?!.*(_b|_inline)).*\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'img/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      },
      {
        test: /_b\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[hash:8].[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true,
              outputStyle: 'expanded',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
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
  },
  plugins: [
    new CleanPlugin(
      [path.relative(projectFolder, outputPath)],
      { root: projectFolder }
    ),
  ],
};
