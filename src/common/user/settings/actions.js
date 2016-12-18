export const CLIENT_SETTINGS_REQUEST = 'CLIENT_SETTINGS_REQUEST';
export const CLIENT_SETTINGS_SUCCESS = 'CLIENT_SETTINGS_SUCCESS';
export const CLIENT_SETTINGS_FAILURE = 'CLIENT_SETTINGS_FAILURE';

function fetchClientSettings() {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    dispatch({ type: CLIENT_SETTINGS_REQUEST });

    const promise = apiClient.get('v1/clients/settings').then(({ body: settings }) => dispatch({ type: CLIENT_SETTINGS_SUCCESS, settings }));

    promise.catch((error) => dispatch({ type: CLIENT_SETTINGS_FAILURE, error }));

    return promise;
  };
}

export function loadClientSettings() {
  return (dispatch, getState) => {
    const { settings } = getState().clientSettings;

    if (!settings) {
      dispatch(fetchClientSettings());
    }
  };
}
