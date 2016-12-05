import createApiClient from '../lib/createApiClient';
import { CLIENT_SUCCESS } from '../actions';

export default function apiClient(state = null, action) {
  if (action.type === CLIENT_SUCCESS) {
    return createApiClient(action.client.token);
  }

  return state;
}
