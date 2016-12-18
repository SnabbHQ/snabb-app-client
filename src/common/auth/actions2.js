import * as authUtils from './authUtils';
import analytics from '../lib/analytics';
import { BrowserRouter } from 'react-router';

export const CLIENT_REQUEST = 'CLIENT_REQUEST';
export const CLIENT_SUCCESS = 'CLIENT_SUCCESS';
export const CLIENT_FAILURE = 'CLIENT_FAILURE';

function auth(action, data) {
  return (dispatch, getState) => {
    const { locale } = getState();

    dispatch({ type: CLIENT_REQUEST, action });

    if (locale && action === 'signUp') {
      data = { ...data, locale };
    }

    const promise = authUtils[action](data).then((client) => {
      dispatch({ type: CLIENT_SUCCESS, client, action });

      BrowserRouter.push({
        pathname: '/',
      });

      analytics.identifyClient(client);
    });

    promise.catch((error) => {
      dispatch({ type: CLIENT_FAILURE, error, action });
    });

    return promise;
  };
}

export const signUp = auth.bind(null, 'signUp');
export const logIn = auth.bind(null, 'logIn');

export function passwordReset({ email }) {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    return apiClient.post('v1/clients/passwords/forgot', { email });
  };
}

export function logOut() {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { token },
    } = getState();

    analytics.track('Logged out', {
      category: analytics.NAVIGATION_CATEGORY,
    });

    return apiClient.post('/oauth/revoke', { token }).then(() => {
      analytics.reset();

      document.location = '/';
    });
  };
}
