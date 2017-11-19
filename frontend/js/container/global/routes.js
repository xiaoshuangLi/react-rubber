import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import homeRoute from 'js/container/home/route';

import App from './components/App';
import NotFound from './components/NotFound';

const rootRoute = (
  <App>
    <Switch>
      { homeRoute }
{/*       <Redirect from="/" to="home" /> */}
      <Route path="*" component={NotFound} />
    </Switch>
  </App>
);

export default rootRoute;
