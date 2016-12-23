/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */


/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

} = require('../../common/lib/constants').default;


import { Actions } from 'react-native-router-flux';

const AppAuthToken = require('../../common/lib/__mocks__/AppAuthToken').default;
const BackendFactory = require('../../common/lib/BackendFactory').default;

const _ = require('underscore');

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function logoutState() {
  return {
    type: LOGOUT,
  };
}

export function registerState() {
  return {
    type: REGISTER,
  };
}

export function loginState() {
  return {
    type: LOGIN,
  };
}

export function forgotPasswordState() {
  return {
    type: FORGOT_PASSWORD,
  };
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
}

/**
 * ## Logout
 * After dispatching the logoutRequest, get the sessionToken
 *
 *
 * When the response is received and it's valid
 * change the state to register and finish the logout
 *
 * But if the call fails, like expired token or
 * no network connection, just send the failure
 *
 * And if you fail due to an invalid sessionToken, be sure
 * to delete it so the user can log in.
 *
 * How could there be an invalid sessionToken?  Maybe they
 * haven't used the app for a long time.  Or they used another
 * device and logged out there.
 */
export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    return new AppAuthToken().getSessionToken()
      .then((token) => BackendFactory(token).logout())
      .then(() => {
        dispatch(loginState());
        dispatch(logoutSuccess());
        dispatch(deleteSessionToken());
        Actions.LoginRegisterScreen();
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginState());
        dispatch(logoutFailure(error));
      });
  };
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field, value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: { field, value },
  };
}
/**
 * ## Signup actions
 */
export function signupRequest() {
  return {
    type: SIGNUP_REQUEST,
  };
}
export function signupSuccess(json) {
  return {
    type: SIGNUP_SUCCESS,
    payload: json,
  };
}
export function signupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
}
/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
  return {
    type: SESSION_TOKEN_REQUEST,
  };
}
export function sessionTokenRequestSuccess(token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token,
  };
}
export function sessionTokenRequestFailure(error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error,
  };
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: DELETE_TOKEN_REQUEST,
  };
}
export function deleteTokenRequestSuccess() {
  return {
    type: DELETE_TOKEN_SUCCESS,
  };
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteSessionToken
 */
export function deleteSessionToken() {
  return dispatch => {
    dispatch(deleteTokenRequest());
    return new AppAuthToken().deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess());
      });
  };
}
/**
 * ## Token
 * If AppAuthToken has the sessionToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
export function getSessionToken() {
  return dispatch => {
    dispatch(sessionTokenRequest());
    return new AppAuthToken().getSessionToken()

      .then((token) => {
        if (token) {
          console.log(token);
          dispatch(sessionTokenRequestSuccess(token));
          dispatch(logoutState());
          Actions.HomeScreen();
        } else {
          dispatch(sessionTokenRequestFailure());
          Actions.LoginRegisterScreen();
        }
      })

      .catch((error) => {
        console.log(error);
        dispatch(sessionTokenRequestFailure(error));
        dispatch(loginState());
        Actions.LoginRegisterScreen();
      });
  };
}

/**
 * ## saveSessionToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with sessionToken
 */
export function saveSessionToken(json) {
  return new AppAuthToken().storeSessionToken(json);
}
/**
 * ## signup
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * Call the server signup and if good, save the sessionToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
export function signup(email, password) {
  return dispatch => {
    dispatch(signupRequest());
    return BackendFactory().signup({
      email,
      password,
    })

      .then((json) => saveSessionToken(
          Object.assign({}, json,
            {
              email,
            }),
        )
          .then(() => {
            dispatch(signupSuccess(
              Object.assign({}, json,
                {
                  email,
                }),
            ));
            dispatch(logoutState());
            // navigate to HomeScreen
            Actions.HomeScreen();
          }))
      .catch((error) => {
        dispatch(signupFailure(error));
      });
  };
}

/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}
/**
 * ## Login
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

export function login(password) {
  return dispatch => {
    dispatch(loginRequest());
    return BackendFactory().login({
      email: 'devtest@gmail.com',
      password,
    })
      .then((json) => saveSessionToken(json)
          .then(() => {
            dispatch(loginSuccess(json));
            // navigate to Tabbar
            Actions.HomeScreen();
            dispatch(logoutState());
          }))
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}

export function resetPasswordFailure(error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error,
  };
}

/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on the server set
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
export function resetPassword(email) {
  return dispatch => {
    dispatch(resetPasswordRequest());
    return BackendFactory().resetPassword({
      email,
    })
      .then(() => {
        dispatch(loginState());
        dispatch(resetPasswordSuccess());
        Actions.LoginRegisterScreen();
      })
      .catch((error) => {
        dispatch(resetPasswordFailure(error));
      });
  };
}
