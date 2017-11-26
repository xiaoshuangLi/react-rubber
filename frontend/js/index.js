import { render } from 'react-dom';
import promise from 'es6-promise';

import 'css/index.scss';
import Global from './container/global';

promise.polyfill();

render(
  Global,
  document.getElementById('app')
);
