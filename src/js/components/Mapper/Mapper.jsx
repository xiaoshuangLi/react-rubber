import React, { Component, createRef } from 'react';
import classnames from 'classnames';

import Raven from 'js/components/Raven';

import Danger from '../Danger';
import Marker from '../Marker';
import Mac from '../Mac';

const getHTML = () => {
  const conatiner = window._extensionDom;

  const doms = document.querySelectorAll('body > *');
  const list = Array.from(doms)
    .filter(dom => dom !== conatiner && dom.tagName !== 'SCRIPT');

  let res = list.reduce((a, b) => {
    return `${a}${b.outerHTML}`;
  }, '');

  res = res.replace(
    /<([A-Za-z]+)[\s]*/g,
    (match, tag, index) => `<${tag} data-extension-id=${index} `
  );

  return res;
};

const avoidFrequent = (func) => {
  let base = performance.now();
  let left;

  const run = () => {
    func && func();
    left = left && clearTimeout(left);
  };

  return (time = 16) => {
    const now = performance.now();

    if (now - base <= time) {
      clearTimeout(left);
      left = setTimeout(() => run(), time);
      return;
    }

    base = now;
    run();
  };
};

let clientWidth;
let clientHeight;
let rootDom;
let isSyncing = false;
let isInit = true;
const extensionAttr = 'data-extension-id';

class Mapper extends Component {
  constructor(props) {
    super(props);

    this.contentRef = createRef();
    this.contentBodyRef = createRef();

    this._listeners = [];
    this._clickTimers = [];
  }

  state = {
    ratio: 0,
    html: '',
    htmlNode: null,
  };

  componentDidMount() {
    this._setConstant();
    this._setListeners();

    this._setMapper(() => {
      this._addListeners();
      setTimeout(() => this._renderMapper(), 0);
    });
  }

  componentDidUpdate() {
    this._syncScroll();
  }

  componentWillUnmount() {
    this._removeListeners();
  }

  onClickContent = (e) => {
    const ratio = this._calcRatioFromClickContent(e);

    const timer = setTimeout(() => {
      this.setState({
        ratio,
      });
    }, 300);

    this._clickTimers.push(timer);
  }

  onDoubleClickContent = (e) => {
    const { target } = e;
    const id = target.getAttribute(extensionAttr);

    const selector = `[${extensionAttr}='${id}']`;

    Mac.open({
      children: this.state.htmlNode,
    });

    this._clickTimers = this._clickTimers.map(
      timer => clearTimeout(timer)
    );
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

  _syncScroll() {
    const { ratio } = this.state;
    const { scrollTop, scrollHeight } = rootDom;

    const baseHeight = scrollHeight - clientHeight;
    const scrollRatio = scrollTop / baseHeight;

    if (isInit) {
      isInit = false;
      return;
    }

    if (ratio === scrollRatio) {
      return;
    }

    const res = baseHeight * ratio;

    const check = () => {
      const newRatio = this.state.ratio;

      if (rootDom.scrollTop === baseHeight * newRatio) {
        isSyncing = false;
        return;
      }

      window.requestAnimationFrame(check);
    };

    rootDom.scrollTop = res;
    isSyncing = true;
    check();
  }

  _setConstant() {
    clientHeight = window.innerHeight;
    clientWidth = window.innerWidth;
    rootDom = document.querySelector('html');
  }

  _setListeners() {
    const scrollLoop = avoidFrequent(() => this._renderMapper(rootDom));
    const scrollListener = () => !isSyncing && scrollLoop(30);

    const resizeLoop = avoidFrequent(() => {
      this._setConstant();
      this.forceUpdate();
    });
    const resizeListener = () => resizeLoop(1000);

    this._listeners = [
      {
        dom: document,
        listeners: [
          {
            event: 'scroll',
            listener: scrollListener,
          },
        ],
      },
      {
        dom: window,
        listeners: [
          {
            event: 'resize',
            listener: resizeListener,
          },
        ],
      },
    ];
  }

  _setMapper(cb) {
    const html = getHTML();
    const htmlNode = (
      <Danger html={html} />
    );

    this.setState({
      html,
      htmlNode,
    }, cb);
  }

  _renderMapper(dom = rootDom) {
    const rect = dom.getBoundingClientRect();
    const ratio = dom.scrollTop / (rect.height - clientHeight);

    this.setState({
      ratio,
    });
  }

  _calcRatioFromClickContent(e) {
    const { clientY = 0 } = e;

    const dom = this.contentBodyRef.current;
    const rect = dom.getBoundingClientRect();
    const { height, top } = rect;

    const ratio = (clientY - top) / height;

    return ratio;
  }

  _getMaskStyle() {
    const { ratio } = this.state;

    const contentBodyDom = this.contentBodyRef.current;

    if (!contentBodyDom) {
      return {};
    }

    const contentBodyRect = contentBodyDom.getBoundingClientRect();

    const maskRatio = clientHeight / (clientWidth - contentBodyRect.width);
    const maskHeight = contentBodyRect.width * maskRatio;

    const transformTop = (clientHeight - maskHeight) * ratio;

    const paddingBottom = `${maskRatio * 100}%`;
    const transform = `translate(0, ${transformTop}px)`;

    const res = {
      transform,
      paddingBottom,
    };

    return res;
  }

  _getBodyStyle() {
    const res = {};

    const containerRect = window._extensionDom.getBoundingClientRect();

    const bodyWidth = clientWidth - containerRect.width;

    res.width = `${bodyWidth}px`;
    res.transform = `scale(${containerRect.width / bodyWidth})`;

    return res;
  }

  _getContainerStyle() {
    const { ratio } = this.state;

    const contentBodyDom = this.contentBodyRef.current;

    if (!contentBodyDom) {
      return {};
    }

    const contentBodyRect = contentBodyDom.getBoundingClientRect();

    if (clientHeight >= contentBodyRect.height) {
      return {};
    }

    const transformTop = (clientHeight - contentBodyRect.height) * ratio;

    return {
      transform: `translate(0, ${transformTop}px)`,
    };
  }

  renderContentMask() {
    const style = this._getMaskStyle();

    return (
      <div
        className="content-mask"
        style={style}
        />
    );
  }

  renderContentBody() {
    const { htmlNode = null } = this.state;

    const bodyStyle = this._getBodyStyle();
    const containerStyle = this._getContainerStyle();

    return (
      <div className="content-container" style={containerStyle}>
        <div className="container-body" ref={this.contentBodyRef} style={bodyStyle}>
          { htmlNode }
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <div
        className="mapper-content"
        ref={this.contentRef}
        onClick={this.onClickContent}
        onDoubleClick={this.onDoubleClickContent}>
        { this.renderContentBody() }
        { this.renderContentMask() }
      </div>
    );
  }

  render() {
    const { className, ...others } = this.props;

    const cls = classnames({
      'components-mapper-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others}>
        { this.renderContent() }
      </div>
    );
  }
}

export default Mapper;
