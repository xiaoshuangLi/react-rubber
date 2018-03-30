import { serverConfiguration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import config from './webpack.config';

export default serverConfiguration(config, settings);
