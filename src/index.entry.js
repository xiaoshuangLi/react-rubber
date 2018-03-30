require('../bluebird');

if (module.hot) {
  module.hot.accept('./js/index', () => require('./js/index'));
}

require('./js/index');
