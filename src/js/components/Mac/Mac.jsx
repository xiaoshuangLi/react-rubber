import React, { Component, createRef } from 'react';
import { hydrate } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getStatreFromProps } from 'js/common';

import Box from '../Box';

const defaultState = {
  visible: true,
  maximize: false,
};

let dom;
const defaultRect = {
  top: 100,
  left: 100,
};

const create = () => {
  if (typeof document === 'undefined') {
    return;
  }

  if (!dom) {
    dom = document.createElement('dom');
    dom.classList.add('extension-mac-container');
    document.body.appendChild(dom);
  }

  return dom;
};

const open = (opts = {}, target = create()) => {
  const { children, ...others } = opts;

  if (!target) {
    return;
  }

  if (others.controlled) {
    console.warn('This function "Mac.open" not supprt controlled Mac yet. -_- !!');
  }

  const element = (
    <Mac rect={defaultRect} {...others} controlled={false}>
      { children }
    </Mac>
  );

  hydrate(
    element,
    target
  );
};

const close = () => {
  hydrate(
    null,
    dom
  );
};

class Mac extends Component {
  constructor(props) {
    super(props);

    this.boxRef = createRef();
  }

  static propTypes = {
    visible: PropTypes.bool,
    maximize: PropTypes.bool,
    controlled: PropTypes.bool,
    title: PropTypes.node,
    onClickClose: PropTypes.func,
    onClickMin: PropTypes.func,
    onClickMax: PropTypes.func,
    onDoubleClickTitle: PropTypes.func,
  };

  static defaultProps = {
    visible: true,
    maximize: false,
    controlled: false,
    title: `I'm the title of Mac window.`,
    onClickClose: undefined,
    onClickMin: undefined,
    onClickMax: undefined,
    onDoubleClickTitle: undefined,
  };

  static getDerivedStateFromProps(nextProps = {}, prevState = {}) {
    return getStatreFromProps(nextProps, prevState, defaultState);
  };

  state = {};

  componentDidMount() {
    this._syncStateFromProps();
  }

  onClickClose = (e) => {
    const { onClickClose, controlled } = this.props;

    e.stopPropagation();
    onClickClose && onClickClose();

    if (!controlled) {
      close();
    }
  };

  onClickMin = (e) => {
    const { onClickMin } = this.props;

    e.stopPropagation();
    onClickMin && onClickMin();

    this._set({
      visible: false,
    });
  };

  onClickMax = (e) => {
    const { maximize } = this.state;
    const { onClickMax } = this.props;

    e.stopPropagation();
    onClickMax && onClickMax();

    this._set({
      maximize: !maximize,
    });
  };

  onDoubleClickTitle = () => {
    const { maximize } = this.state;
    const { onDoubleClickTitle } = this.props;

    onDoubleClickTitle && onDoubleClickTitle();

    this._set({
      maximize: !maximize,
    });
  }

  _set(obj) {
    const { controlled } = this.props;

    if (controlled) {
      return;
    }

    this.setState(obj);
  }

  _getMacStyle() {
    const { maximize } = this.state;
    const box = this.boxRef.current;

    if (!box || !maximize) {
      return {};
    }

    const { state: { rect = {} } = {} } = box;
    const { left, top } = rect;

    return {
      transform: `translate(-${left}px, -${top}px)`,
    };
  }

  _syncStateFromProps(nextProps = this.props, prevState = this.state) {
    const newState = getStatreFromProps(nextProps, prevState, defaultState);

    this.setState(newState);
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <div className="mac-title" onDoubleClick={this.onDoubleClickTitle} draggable={false}>
        <div className="icons">
          <span className="icon close" onClick={this.onClickClose} />
          <span className="icon min" onClick={this.onClickMin} />
          <span className="icon max" onClick={this.onClickMax} />
        </div>
        <div className="title">
          { title }
        </div>
      </div>
    );
  }

  renderContent() {
    const { children } = this.props;

    return (
      <div className="mac-content">
        { children }
      </div>
    );
  }

  render() {
    const {
      className,
      maximize,
      visible,
      title,
      onClickClose,
      onClickMin,
      onClickMax,
      onDoubleClickTitle,
      onResize,
      ...others
    } = this.props;

    const stateVisible = this.state.visible;
    const stateMaximize = this.state.maximize;

    const cls = classnames({
      'components-mac-render': true,
      'mac-visible': !!stateVisible,
      'mac-maximize': !!stateMaximize,
      [className]: !!className,
    });

    const titleNode = this.renderTitle();
    const macStyle = this._getMacStyle();

    return (
      <div className={cls} style={macStyle}>
        <Box
          clean
          className="mac-box"
          title={titleNode}
          ref={this.boxRef}
          onResize={this.onResize}
          {...others}>
          { this.renderContent() }
        </Box>
      </div>
    );
  }
}

Mac.open = open;
Mac.close = close;

export default Mac;
