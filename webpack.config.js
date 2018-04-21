var path = require('path');
var projectFolder = path.resolve(__dirname);

module.exports = {
  context: projectFolder,
  devtool: 'source-map',
  mode: 'production',
  entry: {
    main: [
      path.resolve(projectFolder, 'lib/js/index'),
    ],
  },
  output: {
    path: path.resolve(projectFolder, 'lib'),
    publicPath: '/',
    filename: 'main.js',
    libraryTarget: 'umd',
    library: "ReactRubber",
  },
  resolve: {
    modules: [
      'lib',
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    // {
    //   'prop-types': {
    //     root: 'PropTypes',
    //     commonjs2: 'prop-types',
    //     commonjs: 'prop-types',
    //     amd: 'prop-types',
    //   },
    // },
    // {
    //   'classnames': {
    //     root: 'classnames',
    //     commonjs2: 'classnames',
    //     commonjs: 'classnames',
    //     amd: 'classnames',
    //   },
    // },
  ],
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
};
