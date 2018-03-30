import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Bad extends Component {
  render() {
    const { className, children } = this.props;

    const cls = classnames({
      'components-bad-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        bad
      </div>
    );
  }
}

Bad.propTypes = {};
Bad.defaultProps = {};

export default Bad;
