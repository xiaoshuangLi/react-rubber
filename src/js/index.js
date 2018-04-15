import { hydrate } from 'react-dom';

import 'css/index.scss';
import App from './container/App';

const render = () => {
  if (typeof document === 'undefined') {
    return;
  }

  const dom =  document.createElement('div');
  dom.classList.add('extension-page-app-container');
  document.body.appendChild(dom);

  hydrate(
    App,
    dom
  );
};

render();
