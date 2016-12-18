/**
 * # authReducer-test.js
 *
 * Test the authReducer's only function, like all reducers, where the
 * state and action are passed in.
 *
 * This will confirm that given a specific action with a type and
 * payload, that the state object is modified accordingly.
 *
 * *Note*: in this app,```state``` is an Immutable.js object
 *
 */


/**
 * ## Imports
 *
 * These actions are sufficient to test the reducer as many of the
 * case statements are shared amongst the actions.
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  LOGOUT,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,

  ON_AUTH_FORM_FIELD_CHANGE,

  SIGNUP_FAILURE,
} = require('../../.././constants').default;


/**
 * ## Class under test
 *
 * Note that since autoMockOff has been called, we will get the actual
 * formValidation and fieldValidation objects, so we're testing them
 * as well
 */
import authReducer from '../authReducer';

/**
 * ## Tests
 *
 * authReducer
 */
describe('authReducer', () => {
  /**
   * ### SessionToken ...all requests in general
   *
   * In general, all requests will have fetching true before
   * actually performing the request,and followed
   * by either a success or failure action that signals the request
   * has ended and the fetching flag can be toggled.
   *
   * *Note*: these tests call the ```authReducer``` with an
   * ```undefined``` state so that the reducer will return a valid state.
   *
   */
  describe('SESSION-TOKEN-REQUEST', () => {
    it('starts fetching', () => {
      const action = {
        type: SESSION_TOKEN_REQUEST,
      };
      const next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(true);
      expect(next.form.error).toBe(null);
    });

    it('finishes fetching on success', () => {
      const action = {
        type: SESSION_TOKEN_SUCCESS,
      };
      const next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(null);
    });

    it('finishes fetching on failure', () => {
      const action = {
        type: SESSION_TOKEN_FAILURE,
      };
      const next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(null);
    });
  });// Session-token-request

  /**
   * ### Signup failure will have an error associated with it
   *
   */
  describe('SIGNUP_FAILURE', () => {
    it('Finish fetching with error', () => {
      const action = {
        type: SIGNUP_FAILURE,
        payload: { error: 'error' },
      };
      const next = authReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBeDefined();
      expect(next.form.error.error).toBe('error');
    });
  });// SIGNUP_FAILURE

  /**
   * ### The user logs out
   *
   */
  describe('LOGOUT', () => {
    let initialState = null;
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy',
      };
      initialState = authReducer(undefined, action);
    });
    /**
     * #### form is valid to logout
     *
     * Should have a valid form and in the Logged out state
     */
    it('form is valid to logout', () => {
      const action = {
        type: LOGOUT,
      };
      const next = authReducer(initialState, action);

      expect(next.form.state).toBe(LOGOUT);
      expect(next.form.isValid).toBe(true);
    });
    /**
     * #### form is valid to logout even with form fields
     *
     * Even if the form were to have some data, once they log out that
     * form should be cleared, valid and in the Logged out state
     *
     */
    it('form is valid to logout even with form fields', () => {
      const action = {
        type: LOGOUT,
      };
      const init = authReducer(initialState, action);
      const withFields =
            init.setIn(['form', 'fields', 'email'], 'notvalid')
            .setIn(['form', 'fields', 'password'], 'foo')
            .setIn(['form', 'fields', 'passwordAgain'], 'foo');
      const next = authReducer(withFields, action);
      expect(next.form.state).toBe(LOGOUT);
      expect(next.form.isValid).toBe(true);
      expect(next.form.fields.email).toBe('');
      expect(next.form.fields.password).toBe('');
      expect(next.form.fields.passwordAgain).toBe('');
    });
  });
  /**
   * ### The user wants to reset their password
   *
   */
  describe('FORGOT_PASSWORD', () => {
    let initialState = null;
    /**
     * #### before each
     *
     * get a valid initial state
     */
    beforeEach(() => {
      const action = {
        type: 'dummy',
      };
      initialState = authReducer(undefined, action);
    });
    /**
     * #### form is not valid with empty field
     *
     * A value is required
     *
     */
    it('form is not valid with empty field', () => {
      const action = {
        type: FORGOT_PASSWORD,
      };
      const next = authReducer(initialState, action);

      expect(next.form.state).toBe(FORGOT_PASSWORD);
      expect(next.form.isValid).toBe(false);
    });
    /**
     * #### form is valid with valid email
     *
     * Verify a valid email address, one that passes the
     * fieldValidation rule, should show the form as valid
     *
     */
    it('form is valid with valid email', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bar@ton.com' },
      };
      const emailState = authReducer(initialState,
                                   emailFieldChangeAction);

      const action = {
        type: FORGOT_PASSWORD,
      };
      const next = authReducer(emailState,
                             action);
      expect(next.form.state).toBe(FORGOT_PASSWORD);
      expect(next.form.isValid).toBe(true);
    });
    /**
     * #### form is invalid with invalid email
     *
     * The email field should be a valid email address with respect to
     * the format, but under no circumstances should the user receive
     * feedback that the email address exists within the app
     */
    it('form is invalid with invalid email', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bar@ton' },
      };
      const emailState = authReducer(initialState,
                                   emailFieldChangeAction);

      const action = {
        type: FORGOT_PASSWORD,
      };
      const next = authReducer(emailState,
                             action);
      expect(next.form.state).toBe(FORGOT_PASSWORD);
      expect(next.form.isValid).toBe(false);
    });
  });
  /**
   * ### The user logs in
   *
   */
  describe('LOGIN', () => {
    let initialState = null;
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy',
      };
      initialState = authReducer(undefined, action);
    });
    /**
     * #### form is not valid with empty fields
     *
     * empty fields are not allowed
     */
    it('form is not valid with empty fields', () => {
      const action = {
        type: LOGIN,
      };
      const next = authReducer(initialState, action);

      expect(next.form.state).toBe(LOGIN);
      expect(next.form.isValid).toBe(false);
    });
    /**
     * #### form is  valid with valid fields
     *
     * provide valid input and the form should be valid
     */
    it('form is  valid with valid fields', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'barton@foo.com' },
      };
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart0n' },
      };

      const emailState = authReducer(initialState,
                                      emailFieldChangeAction);
      const passwordState = authReducer(emailState,
                                      passwordFieldChangeAction);

      const action = {
        type: LOGIN,
      };

      const next = authReducer(passwordState, action);
      expect(next.form.state).toBe(LOGIN);
      expect(next.form.fields.passwordHasError).toBe(false);
      expect(next.form.isValid).toBe(true);
    });
    /**
     * #### form is invalid with invalid fields
     *
     * If the fields are invalid, the fieldValidation and
     * formValidation will flag as such
     */
    it('form is invalid with invalid fields', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bart' },
      };
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart!' },
      };

      const emailState = authReducer(initialState,
                                      emailFieldChangeAction);
      const passwordState = authReducer(emailState,
                                      passwordFieldChangeAction);

      const action = {
        type: LOGIN,
      };

      const next = authReducer(passwordState, action);
      expect(next.form.state).toBe(LOGIN);
      expect(next.form.fields.passwordHasError).toBe(true);
      expect(next.form.isValid).toBe(false);
    });
  });// LOGIN
  /**
   * ### The user registers
   *
   */
  describe('REGISTER', () => {
    let initialState = null;
    /**
     * #### Get a valid state
     *
     */
    beforeEach(() => {
      const action = {
        type: 'dummy',
      };
      initialState = authReducer(undefined, action);
    });
    /**
     * #### form is not valid with empty fields
     *
     * no data, not valid
     */
    it('form is not valid with empty fields', () => {
      const action = {
        type: REGISTER,
      };
      const next = authReducer(initialState, action);

      expect(next.form.state).toBe(REGISTER);
      expect(next.form.isValid).toBe(false);
    });
    /**
     * #### form is  valid with valid fields
     *
     * The registration UI requires 4 valid fields before the form is
     * considered valid.
     *
     * Provide valid input and get a valid form
     */
    it('form is  valid with valid fields', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bar@ton.com' },
      };
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart0n' },
      };
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'passwordAgain', value: 'Bart0n' },
      };

      const emailState = authReducer(initialState,
                                   emailFieldChangeAction);
      const passwordState = authReducer(emailState,
                                      passwordFieldChangeAction);
      const passwordAgainState = authReducer(passwordState,
                                           passwordAgainFieldChangeAction);

      const action = {
        type: REGISTER,
      };

      const next = authReducer(passwordAgainState, action);
      expect(next.form.state).toBe(REGISTER);
      expect(next.form.fields.emailHasError).toBe(false);
      expect(next.form.fields.passwordHasError).toBe(false);
      expect(next.form.fields.passwordAgainHasError).toBe(false);
      expect(next.form.isValid).toBe(true);
    });
    /**
     * #### form is  invalid with invalid field
     *
     * Bad data in, invalid form out!
     */
    it('form is  invalid with invalid fields', () => {
      const emailFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'barton' },
      };
      const passwordFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'password', value: 'Bart!' },
      };
      const passwordAgainFieldChangeAction = {
        type: ON_AUTH_FORM_FIELD_CHANGE,
        payload: { field: 'passwordAgain', value: 'Ba!' },
      };

      const emailState = authReducer(initialState,
                                   emailFieldChangeAction);
      const passwordState = authReducer(emailState,
                                      passwordFieldChangeAction);
      const passwordAgainState = authReducer(passwordState,
                                           passwordAgainFieldChangeAction);

      const action = {
        type: REGISTER,
      };

      const next = authReducer(passwordAgainState, action);
      expect(next.form.state).toBe(REGISTER);
      expect(next.form.fields.emailHasError).toBe(true);
      expect(next.form.fields.passwordHasError).toBe(true);
      expect(next.form.fields.passwordAgainHasError).toBe(true);
      expect(next.form.isValid).toBe(false);
    });
  });// REGISTER
});// authReducer
