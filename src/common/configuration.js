function getConfiguration() {
  if (typeof __CONFIGURATION__ !== 'undefined') {
    return __CONFIGURATION__;
  }

  const path = require('path');

  const environment = process.env.NODE_ENV || 'development';

  const isDevelopment = environment === 'development';
  const isProduction = environment === 'production';
  const isTest = environment === 'test';

  const activateReduxDevTools = isDevelopment && process.env.REDUX_DEV_TOOLS !== 'false';
  const activateWebpackMiddleware = isDevelopment || process.env.WEBPACK_MIDDLEWARE === 'true';
  const activateHotReloading = isDevelopment || process.env.HOT_RELOADING === 'true';
  const activateIsomorphicRendering = process.env.ISOMORPHIC_RENDERING !== 'false';

  const stuartApiRoot = (process.env.STUART_API_ROOT || 'https://sandbox-api.snabb.com').replace(/\/$/, '');

  const matches = stuartApiRoot.match(/(sandbox|beta)/);
  let snabbDashboardUrl;
  if (process.env.SNABB_DASHBOARD_URL) {
    snabbDashboardUrl = process.env.SNABB_DASHBOARD_URL;
  } else if (matches && matches[1]) {
    snabbDashboardUrl = `https://admin-${matches[1]}.snabb.com/client`;
  } else {
    snabbDashboardUrl = 'https://admin.snabb.com/client';
  }

  const staticRoute = '/static/';
  const publicPath = path.join(__dirname, 'public');
  const distPath = path.join(__dirname, 'dist');

  const segmentWriteKey = process.env.SEGMENT_WRITE_KEY || '';
  const googleMapKey = process.env.GOOGLE_MAP_KEY;

  return {
    environment,
    isDevelopment,
    isProduction,
    isTest,
    activateHotReloading,
    activateIsomorphicRendering,
    activateReduxDevTools,
    activateWebpackMiddleware,
    stuartApiRoot,
    snabbDashboardUrl,
    staticRoute,
    publicPath,
    distPath,
    segmentWriteKey,
    googleMapKey,
  };
}

module.exports = getConfiguration();
