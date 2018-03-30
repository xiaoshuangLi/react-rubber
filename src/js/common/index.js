export function timeout(cb, time) {
  if (!cb) {
    return;
  }
  time = time || 0;

  const timeId = setTimeout(() => {
    cb();
    clearTimeout(timeId);
  }, time);
}

export function load(src = '', cb) {
  if (!src) {
    return cb && cb();
  }
  const img = new Image();
  img.src = src;

  img.onload = () => {
    cb && cb(img);
  };

  img.onerror = () => {
    cb && cb(img);
  };
}

export function loadAll(list = [], cb) {
  typeof list === 'string' && (list = [list]);

  if (!list.length) {
    return cb && cb();
  }

  let num = 0;
  const len = list.length;
  const imgs = [];

  list.forEach(img => load(img, (ele) => {
    num += 1;

    for (let v = 0; v < len; v += 1) {
      const val = list[v];
      const { src } = ele;
      const index = src.indexOf(val);

      if (!!~index) {
        imgs[index] = ele;
        break;
      }
    }

    if (num >= len) {
      return cb && timeout(() => {
        cb(imgs);
      });
    }
  }));
}

export function isUndefined(val, dVal = '') {
  return val === undefined ? dVal : val;
}

function valid(el) {
  if (!el) {
    return true;
  }

  if (el.checkValidity) {
    return el.checkValidity();
  }

  return true;
}

export function validInput(el) {
  if (!el) {
    return true;
  }

  if (el.checkValidity) {
    return el.checkValidity();
  }

  const eles = el.querySelectorAll('*');

  for (let v = 0, l = eles.length; v <= l; v += 1) {
    if (!valid(eles[v])) {
      return false;
    }
  }

  return true;
}

export function getStyles(ele = '', attr = '') {
  if (!ele || !attr) {
    return '';
  }
  let view = ele.ownerDocument.defaultView;

  if (!view || !view.opener) {
    view = window;
  }

  const res = view.getComputedStyle(ele);

  return res[attr] || '';
}

export function getEle(selector = window) {
  selector = typeof selector === 'string' ? document.querySelector(selector) : selector;

  return selector;
}

export function getEles(selector) {
  if (!selector) {
    return [document];
  }

  return document.querySelectorAll(selector);
}

let baseId = new Date().getTime();

export function getUId() {
  baseId += 1;
  return baseId;
}
