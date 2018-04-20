import http from 'http';
import express from 'express';

import appConfig from '../config';

const { webserver: { port = 3000 } = {} } = appConfig;

const splitHtmlTemp = (strings, ...keys) => ({
  strings,
  keys,
});

const getItems = (num) => {
  let count = 0;
  let res = `
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .test-item {
        padding: 50px;
        color: white;
        text-shadow: 1px 1px 0 rgba(0,0,0, .1);
      }
    </style>
  `;

  while (count <= num) {
    res = `
      ${res}
      <div class="test-item" style="background: hsla(${(360 * count / num).toFixed(4)}, 90%, 65%, 1">
        ${count} ${(count === 0 || count === num) ? '我只想说一句表达我真诚意' : ''}
      </div>
    `;

    count += 1;
  }

  return res;
};

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
      <div id="app">
        ${'testHtml'}
        ${'stream'}
      </div>
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
    const list = [styles, getItems(100), compHtml, javascript];

    return partHtmlTemp.strings.reduce((a, b, index) => `${a}${list[index - 1]}${b}`);
  };
};

export default function (parameters = {}) {
  const app = new express();
  const server = new http.Server(app);

  app.use(express.static('./public'));

  /**
   * renderToString
   */

  app.use((req, res) => {
    res.send(createTempString(parameters)());
  });

  server.listen(port, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
  });
}
