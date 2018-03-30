import merge from 'lodash/merge';
import fs from 'fs';

import baseConfig from './config.base.json';
import developmentConfig from './config.development.json';
import productionConfig from './config.production.json';

const config = merge({}, baseConfig);

if (process.env.NODE_ENV === 'production') {
  merge(config, productionConfig);
} else {
  merge(config, developmentConfig);
}

if (process.env.PORT) {
  config.webserver.port = process.env.PORT;
}

if (process.env.CONFIG) {
  try {
    merge(config, JSON.parse(process.env.CONFIG));
  } catch (error) {
    console.error(error);
  }
}

export default config;
