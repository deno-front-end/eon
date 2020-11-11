// @ts-nocheck
/**
 * this files should export all the functions
 * that can be used in the runtime
 */
/**
 * should return a deep reactive proxy
 * @param target the proxy target object
 * @param updateFunction
 * @param parentKey an index to save the proxy
 */
export function reactive(target, updateFunction, parentKey = '') {
  const proxies = {};
  return new Proxy(target, {
    get(obj, key) {
      let v;
      const id = `${parentKey}.${key.toString()}`;
      if (key === 'prototype') {
        v = Reflect.get(...arguments)
      } else if (obj[key] instanceof Object && !proxies[id]) {
        v = reactive(obj[key], updateFunction, id);
        proxies[id] = v;
      } else if (proxies[id]) {
        return proxies[id];
      } else {
        v = Reflect.get(...arguments);
      }
      return v;
    },
    set(obj, key, value) {
      if (obj[key] === value) return true;
      const id = `${parentKey}.${key.toString()}`;
      const v = Reflect.set(...arguments);
      updateFunction(id);
      return v;
    },
    deleteProperty(obj, key) {
      const id = `${parentKey}.${key.toString()}`;
      const v = Reflect.deleteProperty(...arguments)
      delete proxies[id];
      updateFunction(id);
      return v;
    }
  });
}
/**
 * createElement function
 */
export function crt(n, ns = false) {
  return ns ? document.createElementNS(n) : document.createElement(n);
}
/**
 * append function
 */
export function app(p, n) {
  p && n && p.append(n);
}
/**
 * append function
 */
export function rm(n) {
  n.remove();
}
/**
 * setAttribute function
 */
export function att(n, k, v) {
  n && k && n.setAttribute(k, v || '');
}
/**
 * addEventListener function
 */
export function add(n, k, f) {
  n && k && f &&  n.addEventListener(k, f);
}