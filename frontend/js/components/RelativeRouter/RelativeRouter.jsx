import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import App from 'js/components/App';

const createChildrenRoute = (routes = []) => (props) => {
  const { match = {} } = props;
  const { url = '' } = match;

  const items = routes.map((route = {}, i) => {
    const { path = '', children, ...others } = route;

    return (
      <Route path={`${url}${path}`} {...others} key={i}>
        { children }
      </Route>
    );
  });

  return (
    <App>
      <Switch>
        { items }
      </Switch>
    </App>
  );
};

class RelativeRouter extends Component {
  render() {
    const {
      path = '',
      children,
      routes = [],
      ...others
    } = this.props;

    return (
      <Route path={path} {...others} component={createChildrenRoute(routes)}>
        { children }
      </Route>
    );
  }
}

RelativeRouter.createChildrenRoute = createChildrenRoute;

export default RelativeRouter;
