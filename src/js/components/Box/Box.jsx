import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getStatreFromProps, CLASS_NAME_PREFIX } from 'js/utils';

import Drag from '../Drag';

const defaultState = {
  rect: {
    left: 0,
    top: 0,
    width: 500,
    height: 300,
  },
};

class Box extends Component {
  static propTypes = {
    title: PropTypes.node,
    clean: PropTypes.bool, // clean default css style
    controlled: PropTypes.bool, // controlled component or not, false => props only work in didMount to initialize state
    onResize: PropTypes.func,
  };

  static defaultProps = {
    title: null,
    clean: false,
    controlled: false,
    onResize: undefined,
    rect: undefined,
  };

  static getDerivedStateFromProps(nextProps = {}, prevState = {}) {
    const { controlled } = nextProps;

    if (!controlled) {
      return {};
    }

    return getStatreFromProps(nextProps, prevState, defaultState);
  };

  state = {};

  componentDidMount() {
    this._syncStateFromProps();
  }

  onMoveTitle = (e = {}) => {
    this._setRect((rect = {}) => ({
      left: rect.left + e.offsetX,
      top: rect.top + e.offsetY,
    }));
  };

  onMoveBorderTop = (e = {}) => {
    const {
      offsetY,
    } = e;

    this._setRect((rect = {}) => ({
      top: rect.top + offsetY,
      height: rect.height - offsetY,
    }));
  };

  onMoveBorderBottom = (e = {}) => {
    const {
      offsetY,
    } = e;

    this._setRect((rect = {}) => ({
      height: rect.height + offsetY,
    }));
  };

  onMoveBorderLeft = (e = {}) => {
    const {
      offsetX,
    } = e;

    this._setRect((rect = {}) => ({
      left: rect.left + offsetX,
      width: rect.width - offsetX,
    }));
  };

  onMoveBorderRight = (e = {}) => {
    const {
      offsetX,
    } = e;

    this._setRect((rect = {}) => ({
      width: rect.width + offsetX,
    }));
  };

  onMoveCornerTopLeft = (e = {}) => {
    const {
      offsetX = 0,
      offsetY = 0,
    } = e;

    this._setRect((rect = {}) => ({
      top: rect.top + offsetY,
      left: rect.left + offsetX,
      width: rect.width - offsetX,
      height: rect.height - offsetY,
    }));
  };

  onMoveCornerTopRight = (e = {}) => {
    const {
      offsetX = 0,
      offsetY = 0,
    } = e;

    this._setRect((rect = {}) => ({
      top: rect.top + offsetY,
      width: rect.width + offsetX,
      height: rect.height - offsetY,
    }));
  };

  onMoveCornerBottomLeft = (e = {}) => {
    const {
      offsetX = 0,
      offsetY = 0,
    } = e;

    this._setRect((rect = {}) => ({
      left: rect.left + offsetX,
      width: rect.width - offsetX,
      height: rect.height + offsetY,
    }));
  };

  onMoveCornerBottomRight = (e = {}) => {
    const {
      offsetX = 0,
      offsetY = 0,
    } = e;

    this._setRect((rect = {}) => ({
      width: rect.width + offsetX,
      height: rect.height + offsetY,
    }));
  };

  _syncStateFromProps(nextProps = this.props, prevState = this.state) {
    const newState = getStatreFromProps(nextProps, prevState, defaultState);

    this.setState(newState);
  }

  _setRect(cb) {
    const { controlled } = this.props;

    if (controlled) {
      this._setPropsRect(cb);
    } else {
      this._setStateRect(cb);
    }
  }

  _getNewRect(oldRect = {}, cb) {
    const { onResize } = this.props;

    const obj = cb(oldRect);
    let newRect = Object.assign({}, oldRect, obj);

    if (onResize) {
      newRect = onResize(newRect);
    }

    return newRect;
  }

  _setPropsRect(cb) {
    const { rect = {} } = this.props;

    this._getNewRect(rect, cb);
  }

  _setStateRect(cb) {
    this.setState((state = {}) => {
      const { rect = {} } = state;
      const newRect = this._getNewRect(rect, cb);

      return {
        rect: newRect,
      };
    });
  }

  renderTitle() {
    const { title } = this.props;

    if (title === null) {
      return null;
    }

    return (
      <Drag className="box-title" onMove={this.onMoveTitle}>
        { title }
      </Drag>
    );
  }

  renderContent() {
    const { children } = this.props;

    return (
      <div className="box-content">
        { children }
      </div>
    );
  }

  renderBorder() {
    return (
      <div className="box-border">
        <Drag onMove={this.onMoveBorderTop} className="border-row top" />
        <Drag onMove={this.onMoveBorderLeft} className="border-col left" />
        <Drag onMove={this.onMoveBorderRight} className="border-col right" />
        <Drag onMove={this.onMoveBorderBottom} className="border-row bottom" />
        <Drag onMove={this.onMoveCornerTopLeft} className="corner top left reverse" />
        <Drag onMove={this.onMoveCornerTopRight} className="corner top right front" />
        <Drag onMove={this.onMoveCornerBottomLeft} className="corner bottom left front" />
        <Drag onMove={this.onMoveCornerBottomRight} className="corner bottom right reverse" />
      </div>
    );
  }

  render() {
    const { className, clean } = this.props;
    const { rect = {} } = this.state;
    const {
      left = 0,
      top = 0,
      width = 0,
      height = 0,
    } = rect;

    const cls = classnames({
      [`${CLASS_NAME_PREFIX}components-box-render`]: true,
      'box-clean': !!clean,
      [className]: !!className,
    });

    const style = {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${left}px, ${top}px)`,
    };

    return (
      <div className={cls} style={style}>
        { this.renderTitle() }
        { this.renderContent() }
        { this.renderBorder() }
      </div>
    );
  }
}

export default Box;
