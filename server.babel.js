//  enable runtime transpilation to use ES6/7 in node

var babelConfig = require('./babel')();
delete babelConfig.env;

require('babel-register')(babelConfig);
