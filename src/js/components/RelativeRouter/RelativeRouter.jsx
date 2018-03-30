import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import App from 'js/components/App';

const createChildrenRoutes = (basePath = '', routes = []) => {
  const items = routes.map((route = {}, i) => {
    const { path = '', children, ...others } = route;

    return (
      <Route path={`${basePath}${path}`} {...others} key={i}>
        { children }
      </Route>
    );
  });

  return items;
};

class RelativeRouter extends Component {
  render() {
    const {
      path = '',
      routes = [],
      location = {},
      ...others
    } = this.props;

    const items = createChildrenRoutes(path, routes);

    return (
      <App {...others}>
        <Switch location={location}>
          { items }
        </Switch>
      </App>
    );
  }
}

RelativeRouter.createChildrenRoutes = createChildrenRoutes;

export default RelativeRouter;
