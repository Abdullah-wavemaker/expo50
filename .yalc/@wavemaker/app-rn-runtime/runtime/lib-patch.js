export const setTimeout = onComplete => {
  return (cb, millis) => {
    const patch = () => {
      cb && cb();
      onComplete && onComplete();
    };
    return global.setTimeout(patch, millis);
  };
};
export const setInterval = onComplete => {
  return function (cb, millis) {
    const patch = () => {
      cb && cb();
      onComplete && onComplete();
    };
    return global.setInterval(patch, millis);
  };
};
export const preparePatch = onComplete => {
  return {
    'setTimeout': setTimeout(onComplete),
    'setInterval': setInterval(onComplete)
  };
};
//# sourceMappingURL=lib-patch.js.map