import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Danger extends PureComponent {
  static propTypes = {
    html: PropTypes.string,
  };

  static defaultProps = {
    html: '',
  };

  render() {
    const { className, html, ...others } = this.props;

    const cls = classnames({
      'components-danger-render': true,
      [className]: !!className,
    });

    const dangerouslySetInnerHTML = {
      __html: html,
    };

    return (
      <div
        className={cls}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...others}
        />
    );
  }
}

export default Danger;
