import React, { Component } from 'react';
import classnames from 'classnames';

import Mapper from 'js/components/Mapper';

class App extends Component {
  state = {};

  render() {
    const { className } = this.props;

    const cls = classnames({
      'pages-app-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        <Mapper />
      </div>
    );
  }
}

export default App;
