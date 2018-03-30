import React, { Component } from 'react';
import { render } from 'react-dom';
import classnames from 'classnames';

let div;
const baseData = {};

const create = () => {
  if (typeof document === 'undefined') {
    return;
  }

  if (!div) {
    div = document.createElement('div');
    div.classList.add('north');
    document.body.appendChild(div);
  }

  return div;
};

class Raven extends Component {
  render() {
    const { className, data = {} } = this.props;

    const cls = classnames({
      'components-raven-render': true,
      [className]: !!className,
    });

    const keys = Object.keys(data);

    const items = keys.map((key, i) => {
      return (
        <div className="raven-eye" key={i}>
          <div className="title">{ key }</div>
          <div className="desc">{ data[key] }</div>
        </div>
      );
    });

    return (
      <div className={cls}>
        { items }
      </div>
    );
  }
}

Raven.watch = (obj = {}) => {
  create();

  Object.assign(baseData, obj);

  div && render(<Raven data={baseData} />, div);
};

Raven.shadow = (obj = {}) => {
  create();

  Object.keys(obj).forEach((key) => {
    if (key in baseData) {
      delete baseData[key];
    }
  });

  div && render(<Raven data={baseData} />, div);
};

export default Raven;
