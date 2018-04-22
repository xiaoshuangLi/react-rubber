import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { CLASS_NAME_PREFIX } from 'js/utils';

class Drag extends Component {
  constructor(props) {
    super(props);

    this.eleRef = createRef();

    this._listenders = [];
    this._moving = false;
    this._position = {
      x: 0,
      y: 0,
    };
  }

  static propTypes = {
    onMoveStart: PropTypes.func,
    onMove: PropTypes.func,
    onMoveEnd: PropTypes.func,
  };

  static defaultProps = {
    onMoveStart() {},
    onMove() {},
    onMoveEnd() {},
  };

  state = {};

  onMouseDown = (e) => {
    const { onMoveStart } = this.props;

    this._moving = true;
    this._position = {
      x: e.clientX,
      y: e.clientY,
    };

    onMoveStart && onMoveStart(e);
  };

  onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { onMove } = this.props;
    const ele = this.eleRef.current;

    if (!ele) {
      return;
    }

    if (!this._moving) {
      return;
    }

    const rect = ele.getBoundingClientRect();

    const offsetX = clientX - this._position.x;
    const offsetY = clientY - this._position.y;

    const newX = rect.left + offsetX;
    const newY = rect.top + offsetY;

    this._position = {
      x: clientX,
      y: clientY,
    };

    onMove && onMove({
      x: newX,
      y: newY,
      offsetX,
      offsetY,
    });
  }

  onMouseUp = (e) => {
    const { onMoveEnd } = this.props;

    this._moving = false;
    onMoveEnd && onMoveEnd(e);
  };

  componentDidMount() {
    this._setListeners();
    this._addListeners();
  }

  componentWillUnmount() {
    this._removeListeners();
  }

  _setListeners() {
    this._listeners = [
      {
        dom: document,
        listeners: [
          {
            event: 'mousemove',
            listener: this.onMouseMove,
          },
          {
            event: 'mouseup',
            listener: this.onMouseUp,
          },
        ],
      },
    ];
  }

  _addListeners() {
    const { _listeners = [] } = this;

    _listeners.forEach((item = {}) => {
      const { dom, listeners = [] } = item;

      listeners.forEach((curr = {}) => {
        const { event, listener } = curr;

        dom.addEventListener(event, listener);
      });
    });
  }

  _removeListeners() {
    const { _listeners = [] } = this;

    _listeners.forEach((item = {}) => {
      const { dom, listeners = [] } = item;

      listeners.forEach((curr = {}) => {
        const { event, listener } = curr;

        dom.removeEventListener(event, listener);
      });
    });
  }

  render() {
    const {
      className,
      children,
      onMoveStart,
      onMove,
      onMoveEnd,
      ...others
    } = this.props;

    const cls = classnames({
      [`${CLASS_NAME_PREFIX}components-drag-render`]: true,
      [className]: !!className,
    });

    return (
      <div
        className={cls}
        ref={this.eleRef}
        onMouseDown={this.onMouseDown}
        {...others}>
        { children }
      </div>
    );
  }
}

export default Drag;
