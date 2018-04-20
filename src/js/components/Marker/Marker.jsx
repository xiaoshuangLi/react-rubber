import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Marker extends Component {
  constructor(props) {
    super(props);

    this.boxRef = createRef();
  }

  static propTypes = {
    selector: PropTypes.string,
  };

  static defaultProps = {
    selector: '',
  };

  state = {};

  componentDidMount() {
    this._setScroll();
  }

  _setScroll() {
    const { selector } = this.props;

    const contentEle = this.boxRef.current.contentRef.current;
    const contentRect = contentEle.getBoundingClientRect();

    const targetEle = contentEle.querySelector(selector);
    const targetRect = targetEle.getBoundingClientRect();

    const scrollTop = targetRect.top - contentRect.top;

    contentEle.scrollTop = scrollTop;
  }

  render() {
    const { className, children, ...others } = this.props;

    const cls = classnames({
      'components-marker-render': true,
      [className]: !!className,
    });

    return (
      <Box className={cls} ref={this.boxRef} {...others}>
        { children }
      </Box>
    );
  }
}

export default Marker;
