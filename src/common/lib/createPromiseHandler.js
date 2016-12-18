export default function createPromiseHandler(sourceHandler, onChange, options = {}) {
  const { resetTimeout = 3000 } = options;

  let _timer;

  function handlePromiseStateChange(state, error, shouldReset) {
    clearTimeout(_timer);

    onChange({ state, error });

    if (resetTimeout && shouldReset) {
      _timer = setTimeout(() => {
        handlePromiseStateChange(null, null);
      }, resetTimeout);
    }
  }

  const promiseHandler = function () {
    const promise = sourceHandler(...arguments);

    if (promise.then) {
      handlePromiseStateChange('pending', null);

      promise.then(() => {
        handlePromiseStateChange('resolved', null, true);
      }).catch((error) => {
        handlePromiseStateChange('rejected', error, true);
      });
    }

    return promise;
  };

  promiseHandler.cancel = () => clearTimeout(_timer);

  return promiseHandler;
}
