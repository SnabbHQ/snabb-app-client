/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
import type { Action, UserState } from '../types';

const initialState = {
  // Undefined is absence of evidence, null is evidence of absence.
  profile: undefined,
};

const reducer = (
  state: UserState = initialState,
  action: Action,
): UserState => {
  switch (action.type) {

    case 'LOG_IN_SUCCESS':
    case 'REGISTER_SUCCESS': {
      return { ...state, profile: action.payload.user };
    }

    case 'LOG_OUT_SUCCESS': {
      return { ...state, profile: null };
    }

    default:
      return state;

  }
};

export default reducer;

