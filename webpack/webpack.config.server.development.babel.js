import config from './webpack.config.server';
import settings from '../config';

export default {
  ...config,
  output: {
    ...config.output,
    publicPath: `http://${settings.webpack.devserver.host}:${settings.webpack.devserver.port}${config.output.publicPath}`,
  },
};
