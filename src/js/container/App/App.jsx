import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    const { className } = this.props;

    const cls = classnames({
      'pages-app-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        App
      </div>
    );
  }
}

export default App;
