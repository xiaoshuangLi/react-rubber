require('source-map-support/register');

var startServer = require('universal-webpack/server');
var settings = require('../webpack/universal-webpack-settings');
var config = require('../webpack/webpack.config');

startServer(config, settings);
