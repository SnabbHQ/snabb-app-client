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

    case 'LOG_IN_SUCCESS': {
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

// /**
//  * ## profileReducer function
//  * @param {Object} state - initialState
//  * @param {Object} action - type and payload
//  */
// const reducer = (state: UserState = initialState,
//                  action: Action): UserState => {
//   let nextProfileState = null;
//
//   if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
//
//   switch (action.type) {
//     /**
//      * ### Request starts
//      * set the form to fetching and clear any errors
//      */
//     case 'GET_PROFILE':
//     case ActionTypes.PROFILE_UPDATE_REQUEST:
//       return state.setIn(['form', 'isFetching'], true)
//         .setIn(['form', 'error'], null)
//         .setIn(['form', 'updated'], false);
//
//     /**
//      * ### Request end successfully
//      * set the form to fetching as done
//      */
//     case ActionTypes.PROFILE_UPDATE_SUCCESS:
//       return state.setIn(['form', 'isFetching'], false)
//         .setIn(['form', 'updated'], true);
//
//     /**
//      * ### Request ends successfully
//      *
//      * the fetching is done, set the UI fields and the profile
//      *
//      * Validate the data to make sure it's all good and someone didn't
//      * mung it up through some other mechanism
//      */
//     case ActionTypes.GET_PROFILE_SUCCESS:
//       nextProfileState = state.setIn(['form', 'isFetching'], false)
//         .setIn(['form', 'fields', 'name'], action.payload.name)
//         .setIn(['form', 'fields', 'lastName'], action.payload.lastName)
//         .setIn(['form', 'fields', 'phoneNumber'], action.payload.phoneNumber)
//         .setIn(['form', 'fields', 'email'], action.payload.email)
//         .setIn(['form', 'fields', 'thumbnail'], action.payload.thumbnail)
//         .setIn(['form', 'fields', 'emailVerified'], action.payload.emailVerified)
//         .setIn(['form', 'error'], null)
//         .setIn(['profile', 'id'], action.payload.id)
//         .setIn(['profile', 'name'], action.payload.name)
//         .setIn(['profile', 'lastName'], action.payload.lastName)
//         .setIn(['profile', 'phoneNumber'], action.payload.phoneNumber)
//         .setIn(['profile', 'email'], action.payload.email)
//         .setIn(['profile', 'thumbnail'], action.payload.thumbnail)
//         .setIn(['profile', 'emailVerified'], action.payload.emailVerified);
//
//       return formValidation(
//         fieldValidation(nextProfileState, action)
//         , action);
//
//     /**
//      * User logged out, so reset form fields and original profile.
//      *
//      */
//     case LOGOUT_SUCCESS:
//       nextProfileState = state.remove('form')
//         .remove('profile');
//
//       return formValidation(nextProfileState, action);
//
//     /**
//      * ### Request fails
//      * we're done fetching and the error needs to be displayed to the user
//      */
//     case ActionTypes.GET_PROFILE_FAILURE:
//     case ActionTypes.PROFILE_UPDATE_FAILURE:
//       return state.setIn(['form', 'isFetching'], false)
//         .setIn(['form', 'error'], action.payload)
//         .setIn(['form', 'updated'], false);
//
//     /**
//      * ### form fields have changed
//      *
//      * Set the state with the fields, clear the form error
//      * and perform field and form validation
//      */
//     case ActionTypes.ON_PROFILE_FORM_FIELD_CHANGE: {
//       const { field, value } = action.payload;
//       const nextState = state.setIn(['form', 'fields', field], value)
//         .setIn(['form', 'error'], null)
//         .setIn(['form', 'updated'], false);
//
//       return formValidation(fieldValidation(nextState, action), action);
//     }
//
//     default:
//       return state;
//   }
// };
//
// export default reducer;

