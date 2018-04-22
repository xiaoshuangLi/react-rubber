export const CLASS_NAME_PREFIX = 'react-rubber-';

const defaultClassName = `${CLASS_NAME_PREFIX}dom`;

export function createDom(className = defaultClassName, tag = 'div') {
  if (typeof document === 'undefined') {
    return;
  }

  const dom = document.createElement(tag);
  dom.classList.add(className);
  document.body.appendChild(dom);

  return dom;
};

export function getStatreFromProps(nextProps = {}, prevState = {}, defaultState = {}) {
  const keys = Object.keys(defaultState);

  const newState = keys.reduce((a, key) => {
    const stateValue = prevState[key];
    const propsValue = nextProps[key];
    const defaultValue = defaultState[key];

    let value;

    if (typeof defaultValue === 'object') {
      const baseValue = Array.isArray(defaultValue) ? [] : {};

      value = Object.assign(baseValue, stateValue, defaultValue, propsValue);
    } else {
      value = propsValue === undefined ? defaultValue : propsValue;
    }

    a[key] = value;

    return a;
  }, {});

  return newState;
};