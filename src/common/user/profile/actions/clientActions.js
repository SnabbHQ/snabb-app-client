function createUpdateClient([requestType, successType, failureType]) {
  return (value) => {
    return (dispatch, getState) => {
      const {
        apiClient,
        client: { id }
      } = getState();

      dispatch({ type: requestType });

      return apiClient.patch(`v1/clients/${id}`, value).then(({ body: client }) => {
        dispatch({ type: successType, client });
      }).catch((error) => {
        dispatch({ type: failureType, error });
      });
    };
  };
}

export const UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT_REQUEST';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_FAILURE = 'UPDATE_CLIENT_FAILURE';

export const updateClient = createUpdateClient([
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE
]);

export const CLIENT_GENERAL_VALUE_CHANGE = 'CLIENT_GENERAL_VALUE_CHANGE';

export function setClientGeneralValue(value) {
  return {
    type: CLIENT_GENERAL_VALUE_CHANGE,
    value
  };
}

export const UPDATE_CLIENT_PASSWORD_REQUEST = 'UPDATE_CLIENT_PASSWORD_REQUEST';
export const UPDATE_CLIENT_PASSWORD_SUCCESS = 'UPDATE_CLIENT_PASSWORD_SUCCESS';
export const UPDATE_CLIENT_PASSWORD_FAILURE = 'UPDATE_CLIENT_PASSWORD_FAILURE';

export const CLIENT_PASSWORD_VALUE_CHANGE = 'CLIENT_PASSWORD_VALUE_CHANGE';

export function setClientPasswordValue(value) {
  return {
    type: CLIENT_PASSWORD_VALUE_CHANGE,
    value
  };
}

export const updateClientPassword = createUpdateClient([
  UPDATE_CLIENT_PASSWORD_REQUEST,
  UPDATE_CLIENT_PASSWORD_SUCCESS,
  UPDATE_CLIENT_PASSWORD_FAILURE
]);
