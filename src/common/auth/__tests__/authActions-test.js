/**
 * # authActions-test.js
 *
 * This test is for authActions
 *
 */


/**
 * ## Mocks
 *
 * We don't want to use the devices storage, nor actually call
 * the server
 *
 * Need to mock router so the "keys" are available (see src/__mocks__)
 */
jest.mock('../../../../lib/AppAuthToken');
jest.mock('../../../../lib/BackendFactory');
jest.mock('react-native-router-flux');

/**
 * ## Mock Store
 *
 * The ```mockStore``` confirms the all the actions are dispatched and
 * in the correct order
 *
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

/**
 * ## Class under test
 */
import * as actions from '../actions';


/**
 * ## Imports
 *
 * actions under test
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

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} = require('../../.././constants').default;

/**
 * ## Tests
 *
 * authActions
 */
describe('authActions', () => {
  /**
   * ### simple tests that prove the actions have the specific type
   */
  it('should set logoutState', () => {
    expect(actions.logoutState()).toEqual({ type: LOGOUT });
  });

  it('should set registerState', () => {
    expect(actions.registerState()).toEqual({ type: REGISTER });
  });

  it('should set loginState', () => {
    expect(actions.loginState()).toEqual({ type: LOGIN });
  });

  it('should set forgotPasswordState', () => {
    expect(actions.forgotPasswordState()).toEqual({ type: FORGOT_PASSWORD });
  });

  it('should set logoutRequest', () => {
    expect(actions.logoutRequest()).toEqual({ type: LOGOUT_REQUEST });
  });

  it('should set logoutSuccess', () => {
    expect(actions.logoutSuccess()).toEqual({ type: LOGOUT_SUCCESS });
  });

  it('should set logoutFailure', () => {
    const error = { error: 'test error' };
    expect(actions.logoutFailure(error)).toEqual({ type:
                                                  LOGOUT_FAILURE,
      payload: error });
  });

  it('should set signupRequest', () => {
    expect(actions.signupRequest()).toEqual({ type: SIGNUP_REQUEST });
  });

  it('should set signupSuccess', () => {
    expect(actions.signupSuccess()).toEqual({ type: SIGNUP_SUCCESS });
  });

  it('should set sessionTokenRequest', () => {
    expect(actions.sessionTokenRequest()).toEqual({ type: SESSION_TOKEN_REQUEST });
  });

  it('should set sessionTokenRequestSuccess', () => {
    const token = { token: 'thisisthetoken' };
    expect(actions.sessionTokenRequestSuccess(token)).toEqual({
      type: SESSION_TOKEN_SUCCESS, payload: token });
  });

  it('should set sessionTokenRequestFailure', () => {
    const error = { error: 'thisistheerror' };
    expect(actions.sessionTokenRequestFailure(error)).toEqual({
      type: SESSION_TOKEN_FAILURE, payload: error });
  });

  it('should set signupFailure', () => {
    const error = { error: 'thisistheerror' };
    expect(actions.signupFailure(error)).toEqual({ type:
                                                  SIGNUP_FAILURE,
      payload: error });
  });

  it('should set loginRequest', () => {
    expect(actions.loginRequest()).toEqual({ type: LOGIN_REQUEST });
  });

  it('should set loginSuccess', () => {
    expect(actions.loginSuccess()).toEqual({ type: LOGIN_SUCCESS });
  });

  it('should set loginFailure', () => {
    const error = { error: 'thisistheerror' };
    expect(actions.loginFailure(error)).toEqual({ type: LOGIN_FAILURE,
      payload: error });
  });

  it('should set forgotPasswordRequest', () => {
    expect(actions.forgotPasswordRequest()).toEqual({ type: FORGOT_PASSWORD_REQUEST });
  });

  it('should set forgotPasswordSuccess', () => {
    expect(actions.forgotPasswordSuccess()).toEqual({ type: FORGOT_PASSWORD_SUCCESS });
  });

  it('should set forgotPasswordFailure', () => {
    const error = { error: 'thisistheerror' };
    expect(actions.forgotPasswordFailure(error)).toEqual({ type:
                                                         FORGOT_PASSWORD_FAILURE,
      payload: error });
  });

  it('should set onAuthFormFieldChange', () => {
    const field = 'field';
    const value = 'value';
    expect(actions.onAuthFormFieldChange(field, value)).toEqual({
      type: ON_AUTH_FORM_FIELD_CHANGE,
      payload: { field, value },
    });
  });

  /**
   * ### async tests
   *
   * the following tests describe the actions that should be
   * dispatched the function is invoked
   *
   * *Note*: these tests are run with ```it``` because they are async
   *
   */
  it('should logout', () => {
    const expectedActions = [
      { type: LOGOUT_REQUEST },
      { type: LOGIN },
      { type: LOGOUT_SUCCESS },
      { type: DELETE_TOKEN_REQUEST },
    ];

    const store = mockStore({});
    return store.dispatch(actions.logout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should login', () => {
    const expectedActions = [
      { type: LOGIN_REQUEST },
      { type: LOGIN_SUCCESS, payload: { status: 201 } },
      { type: LOGOUT },
    ];

    const store = mockStore({});
    return store.dispatch(actions.login('foo', 'bar'))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].payload.status).toEqual(expectedActions[1].payload.status);
        expect(store.getActions()[2].type).toEqual(expectedActions[2].type);
      });
  });

  it('should getSessionToken', () => {
    const expectedActions = [
      { type: SESSION_TOKEN_REQUEST },
      { type: SESSION_TOKEN_SUCCESS,
        payload: { sessionToken:
                   { sessionToken: 'token' } } },
      { type: LOGOUT },
    ];

    const store = mockStore({});
    return store.dispatch(actions.getSessionToken())
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].payload.sessionToken.sessionToken).toEqual(expectedActions[1].payload.sessionToken.sessionToken);
        expect(store.getActions()[2].type).toEqual(expectedActions[2].type);
      });
  });

  it('should signup', () => {
    const expectedActions = [
      { type: SIGNUP_REQUEST },
      { type: SIGNUP_SUCCESS,
        payload: { status: 201,
          email: 'email' } },
      { type: LOGOUT },
    ];

    const store = mockStore({});

    return store.dispatch(actions.signup('email', 'password'))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].payload.status).toEqual(expectedActions[1].payload.status);
        expect(store.getActions()[1].payload.email).toEqual(expectedActions[1].payload.email);
        expect(store.getActions()[2]).toEqual(expectedActions[2]);
      });
  });

  it('should forgotPassword', () => {
    const expectedActions = [
      { type: FORGOT_PASSWORD_REQUEST },
      { type: LOGIN },
      { type: FORGOT_PASSWORD_SUCCESS },
    ];

    const store = mockStore({});

    return store.dispatch(actions.forgotPassword('email'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should deleteSessionToken', () => {
    const expectedActions = [
      { type: DELETE_TOKEN_REQUEST },
      { type: DELETE_TOKEN_SUCCESS },
    ];

    const store = mockStore({});

    return store.dispatch(actions.deleteSessionToken())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
