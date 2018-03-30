import React from 'react';

import Bundle from 'js/components/Bundle';
import RelativeRouter from 'js/components/RelativeRouter';

const createBundle = load => props => (
  <Bundle once load={load}>
    {Comp => <Comp {...props} />}
  </Bundle>
);

const routes = [
  {
    exact: true,
    component: createBundle(() => import('./pages/Test')),
  },
  {
    path: '/bad',
    component: createBundle(() => import('./pages/Bad')),
  },
];

const rootRoute = (
  <RelativeRouter path="/home" routes={routes} />
);

export default rootRoute;
