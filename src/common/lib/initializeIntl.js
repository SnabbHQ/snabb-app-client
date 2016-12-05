function loadIntl() {
  if (global.Intl) { return Promise.resolve(); }

  return new Promise((resolve) => {
    require.ensure(['intl'], (require) => {
      require('intl');
      resolve();
    }, 'intl');
  });
}

const LOCALE_DATA_LOADERS = {
  en(resolve) {
    require.ensure([
      'intl/locale-data/jsonp/en',
      'react-intl/locale-data/en'
    ], (require) => {
      if (global.IntlPolyfill) {
        require('intl/locale-data/jsonp/en');
      }
      const localeData = require('react-intl/locale-data/en');
      resolve(localeData);
    }, 'enlocaleData');
  },

  es(resolve) {
    require.ensure([
      'intl/locale-data/jsonp/es',
      'react-intl/locale-data/es'
    ], (require) => {
      if (global.IntlPolyfill) {
        require('intl/locale-data/jsonp/es');
      }
      const localeData = require('react-intl/locale-data/es');
      resolve(localeData);
    }, 'eslocaleData');
  },

  fr(resolve) {
    require.ensure([
      'intl/locale-data/jsonp/fr',
      'react-intl/locale-data/fr'
    ], (require) => {
      if (global.IntlPolyfill) {
        require('intl/locale-data/jsonp/fr');
      }
      const localeData = require('react-intl/locale-data/fr');
      resolve(localeData);
    }, 'frlocaleData');
  }
};

export default function initializeIntl(locale) {
  return loadIntl().then(() => {
    return new Promise(LOCALE_DATA_LOADERS[locale]);
  });
}
