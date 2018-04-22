var config = require('./webpack.config.js');

const externals = [];

config.externals = config.externals || [];
config.externals = config.externals.concat(externals);
config.output.filename = 'index.umd.js';

module.exports = config;