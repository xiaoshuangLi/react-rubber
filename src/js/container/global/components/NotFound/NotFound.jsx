import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    const { className, children } = this.props;

    const cls = classnames({
      'components-not-found-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        <Link
          className="text"
          to="/home"
          data-before="Not Found"
          data-after="Go To Homepage"
          />
        { children }
      </div>
    );
  }
}

export default NotFound;
