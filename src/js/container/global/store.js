import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import promiseThunk from './promiseThunk';

let initState;

if (typeof window !== 'undefined' && window.__data) {
  initState = window.__data;
}

const configureStore = (history, initialState) => {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [reduxRouterMiddleware, promiseThunk, thunkMiddleware];

  const finalCreateStore = applyMiddleware(...middleware)(createStore);

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = combineReducers({
        ...reducers,
        routing: routerReducer,
      });
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const createStoreWithHistory = (history) => {
  return configureStore(history, initState);
};

const history = createBrowserHistory();
const store = createStoreWithHistory(history);

export {
  store,
  history,
  configureStore,
};
