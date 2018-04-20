const defaultLimit = {
  minTop: 0,
  minLeft: 0,
  minWidth: 0,
  minHeight: 0,
};

const adjustNum = (num = 0, min = 0, max = 0) => Math.max(min, Math.min(num, max));

const adjust = (limit = {}) => {
  const baseLimit = typeof window === 'undefined' ? {} : {
    maxTop: window.innerHeight,
    maxLeft: window.innerWidth,
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight,
  };

  limit = Object.assign(baseLimit, defaultLimit, limit);

  return (rect = {}) => {
    const newRect = {};

    newRect.top = adjustNum(rect.top, limit.minTop, limit.maxTop);
    newRect.left = adjustNum(rect.left, limit.minLeft, limit.maxLeft);
    newRect.width = adjustNum(rect.width, limit.minWidth, limit.maxWidth);
    newRect.height = adjustNum(rect.height, limit.minHeight, limit.maxHeight);

    return newRect;
  };
};

export {
  adjust,
  adjustNum,
};