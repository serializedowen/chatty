const _proxyHandler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      if (
        Object.prototype.toString.call(obj._model[prop]) === "[object Function]"
      ) {
        // Function.call();
        return (...args) => obj._model[prop].call(obj._model, ...args);
      }
      return obj._model[prop];
    }
  }
};

/**
 * Proxy function calls to underlying Model if not found on Service Instance
 */
const createProxy = <T>(target: T): T => {
  Object.defineProperty(target, "_proxy", { value: true });
  return new Proxy(target, _proxyHandler);
};

export default createProxy;
