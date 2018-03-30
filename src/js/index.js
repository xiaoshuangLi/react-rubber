import { hydrate } from 'react-dom';

import 'css/index.scss';
import Global from './container/global';

hydrate(
  Global,
  document.getElementById('app')
);
