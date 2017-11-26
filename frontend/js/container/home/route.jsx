import React from 'react';

import Bundle from 'js/components/Bundle';
import RelativeRouter from 'js/components/RelativeRouter';

const createBundle = path => (props) => {
  const load = () => import(`${path}`);

  return (
    <Bundle once load={load}>
      {Comp => <Comp {...props} />}
    </Bundle>
  );
};

const routes = [
  {
    exact: true,
    component: createBundle('./pages/Test'),
  },
  {
    path: '/bad',
    component: createBundle('./pages/Bad'),
  },
];

const rootRoute = (
  <RelativeRouter path="/home" routes={routes} />
);

export default rootRoute;
