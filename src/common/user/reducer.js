/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
import type { Action, UserState } from '../types';

const initialState = {
  // Undefined is absence of evidence, null is evidence of absence.
  profile: undefined,
  formDisabled: false,
  error: null,
  isFetching: false,
};

const reducer = (
  state: UserState = initialState,
  action: Action,
): UserState => {
  switch (action.type) {

    case 'LOG_IN_SUCCESS':
    case 'REGISTER_SUCCESS': {
      return { ...state, profile: action.payload.profile };
    }

    case 'LOG_OUT_SUCCESS': {
      return { ...state, profile: null };
    }

    case 'GET_PROFILE':
    case 'UPDATE_PASSWORD':
    case 'PROFILE_UPDATE': {
      return { ...state, formDisabled: true, isFetching: true, error: null };
    }

    case 'GET_PROFILE_SUCCESS':
    case 'PROFILE_UPDATE_SUCCESS': {
      return { ...state, profile: action.payload.profile, formDisabled: false, isFetching: false, error: null };
    }

    case 'PASSWORD_UPDATE_SUCCESS': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    case 'GET_PROFILE_FAIL':
    case 'PASSWORD_UPDATE_FAIL':
    case 'PROFILE_UPDATE_FAIL': {
      return {
        ...state, formDisabled: false, isFetching: false, error: action.payload.error,
      };
    }

    case 'FIELDS_SET_FIELD': {
      return { ...state, formDisabled: false, isFetching: false, error: null };
    }

    default:
      return state;

  }
};

export default reducer;

