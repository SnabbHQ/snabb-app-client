const hasLocaleStorage = global.localStorage;

function get(key) {
  if (!hasLocaleStorage) { return; }

  return JSON.parse(localStorage.getItem(key));
}

function set(key, value) {
  if (!hasLocaleStorage) { return; }

  return localStorage.setItem(key, JSON.stringify(value));
}

export default { get, set };
