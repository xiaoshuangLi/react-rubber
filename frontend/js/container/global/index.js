import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { store, history } from './store';
import routes from './routes';

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  </Provider>
);

