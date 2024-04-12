const map = new Map();
const get = t => {
  return map.get(t);
};
const set = (t, o) => {
  map.set(t, o);
};
const remove = t => {
  const v = map.get(t);
  v && map.delete(t);
  return v;
};
const getInstance = key => {
  return {
    set: o => set(key, o),
    get: () => get(key),
    remove: () => remove(key)
  };
};
export default {
  set: set,
  get: get,
  remove: remove,
  FOCUSED_ELEMENT: getInstance('FOCUSED_ELEMENT'),
  I18nService: getInstance('I18nService')
};
//# sourceMappingURL=injector.js.map