import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Iconfont extends Component {
  render() {
    const { type, theme, className, ...others } = this.props;
    const cls = classnames({
      iconfont: true,
      [`iconfont-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
      [className]: !!className,
    });

    return (
      <i className={cls} {...others} />
    );
  }
}

Iconfont.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
};

Iconfont.defaultProps = {
  type: '',
  theme: 'default',
};

export default Iconfont;
