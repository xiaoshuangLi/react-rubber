import http from 'http';
import express from 'express';

import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
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

const splitHtmlTemp = (strings, ...keys) => ({
  strings,
  keys,
});

const partHtmlTemp = splitHtmlTemp`
  <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="content-language" content="zh-CN">
      <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">
      <meta name="format-detection" content="telephone=no>
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <title>标题</title>
      ${'string'}
    </head>
    <body>
      <div id="app">${'stream'}</div>
      ${'string'}
    </body>
  </html>
`;

const getStyleAndJavascript = (parameters = {}) => {
  const chunks = parameters.chunks();
  const { javascript = {}, styles = {} } = chunks;

  const stylesHtml = Object.values(styles)
    .reduce((a, b) => `${a}<link href="${b}" rel="stylesheet">`, '');
  const javascriptHtml = Object.values(javascript)
    .reduce((a, b) => `${a}<script src="${b}"></script>`, '');

  return {
    styles: stylesHtml,
    javascript: javascriptHtml,
  };
};

const createTempString = (parameters = {}) => {
  const obj = getStyleAndJavascript(parameters);
  const { javascript = '', styles = '' } = obj;

  return (comp) => {
    const compHtml = comp ? renderToString(comp) : '';
    const list = [styles, compHtml, javascript];

    return partHtmlTemp.strings.reduce((a, b, index) => `${a}${list[index - 1]}${b}`);
  };
};

const createStreamString = (parameters = {}) => {
  const obj = getStyleAndJavascript(parameters);

  const { javascript = '', styles = '' } = obj;
  const { keys = [], strings = [] } = partHtmlTemp;

  let start = '';
  let end = '';

  strings.forEach((item = '', index) => {
    if (index <= keys.indexOf('stream')) {
      start = `${start}${item}${index === 0 ? styles : ''}`;
    } else {
      end = `${end}${index === strings.length - 1 ? javascript : ''}${item}`;
    }
  });

  return {
    start,
    end,
  };
};

export default function (parameters = {}) {
  const app = new express();
  const server = new http.Server(app);

  app.use(express.static('./public'));

  /**
   * renderToString
   */

  // app.use((req, res) => {
  //   const store = createStore();
  //   const comp = (
  //     <Provider store={store}>
  //       <StaticRouter location={req.url} context={{}}>
  //         { routers }
  //       </StaticRouter>
  //     </Provider>
  //   );

  //   res.send(createTempString(parameters)(comp));
  // });

  /**
   * renderToNodeStream
   */

  app.use((req, res) => {
    const store = createStore();
    const comp = (
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          { routers }
        </StaticRouter>
      </Provider>
    );

    const obj = createStreamString(parameters);
    const stream = renderToNodeStream(comp);

    res.write(obj.start);
    stream.pipe(res, { end: false });
    stream.on('end', () => {
      res.write(obj.end);
      res.end();
    });
  });

  server.listen(port, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
  });
}
