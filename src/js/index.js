import React from 'react';
import { hydrate } from 'react-dom';

import style from '!postcss-loader!sass-loader!css/index.scss';
import App from './container/App';

const render = () => {
  if (typeof document === 'undefined') {
    return;
  }

  const dom = window._extensionDom || document.createElement('div');
  const styleDom = window._extensionStyleDom || document.createElement('style');

  window._extensionDom = dom;
  window._extensionStyleDom = styleDom;

  styleDom.innerText = style;
  dom.classList.add('extension-page-app-container');

  document.body.classList.add('has-extension');
  document.body.appendChild(dom);
  document.head.appendChild(styleDom);

  hydrate(
    <App />,
    dom
  );
};

render();
