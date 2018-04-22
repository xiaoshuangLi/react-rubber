var config = require('./webpack.config.js');

const externals = [
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
  {
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
  },
  {
    'classnames': {
      root: 'classnames',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames',
    },
  },
];

config.externals = config.externals || [];
config.externals = config.externals.concat(externals);

module.exports = config;