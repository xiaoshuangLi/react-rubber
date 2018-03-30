import http from 'http';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import routers from 'js/container/global/routes';

import appConfig from '../config';

const { webserver: { port = 3000 } = {} } = appConfig;

const createStore = (state = {}) => ({
  getState: () => state,
  subscribe: _ => _,
  dispatch: _ => _,
});

const createTemp = (parameters = {}) => {
  const chunks = parameters.chunks();
  const { javascript = {}, styles = {} } = chunks;

  const stylesHtml = Object.values(styles)
    .reduce((a, b) => `${a}<link href="${b}" rel="stylesheet">`, '');
  const javascriptHtml = Object.values(javascript)
    .reduce((a, b) => `${a}<script src="${b}"></script>`, '');

  return (comp) => {
    const compHtml = comp ? renderToString(comp) : '';

    return `
      <!DOCTYPE html>
        <html>
        <head>
          <meta http-equiv="content-language" content="zh-CN">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <meta name="viewport" content="initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">
          <meta name="format-detection" content="telephone=no>
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <title>标题</title>
          ${stylesHtml}
        </head>
        <body>
          <div id="app">${compHtml}</div>
          ${javascriptHtml}
        </body>
      </html>
    `;
  };
};

export default function (parameters = {}) {
  const app = new express();
  const server = new http.Server(app);

  app.use(express.static('./public'));

  app.use((req, res) => {
    const store = createStore();
    const comp = (
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          { routers }
        </StaticRouter>
      </Provider>
    );

    res.send(createTemp(parameters)(comp));
  });

  server.listen(port, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
  });
}
