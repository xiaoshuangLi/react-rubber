var bluebird_options = {
  cancellation: true,
};

if (process.env.NODE_ENV !== 'production') {
  // Enable warnings
  bluebird_options.warnings = true;
  // Enable long stack traces
  bluebird_options.longStackTraces = true;
  // Enable monitoring
  bluebird_options.monitoring = true;
}

require('bluebird').config(bluebird_options);
require('babel-runtime/core-js/promise').default = require('bluebird');