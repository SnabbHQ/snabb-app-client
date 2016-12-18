/**
 * # profileReducer-test.js
 *
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
 * These actions of the users profile
 */
import * as ActionTypes from '../actions/ProfileActionTypes';

/**
 * ## Class under test
 */
import profileReducer from '../profileReducer';

/**
 * ## Tests
 *
 * profileReducer
 */
describe('profileReducer', () => {
  /**
   * ### Profile Request
   *
   * *Note*: these tests call the ```profileReducer``` with an
   * ```undefined``` state so that the reducer will return a valid state.
   *
   */
  describe('PROFILE_REQUEST', () => {
    /**
     * #### starts fetching
     *
     * Should have a valid form and no form error
     */
    it('starts fetching', () => {
      const action = {
        type: ActionTypes.GET_PROFILE_REQUEST,
      };
      const next = profileReducer(undefined, action);

      expect(next.form.isFetching).toBe(true);
      expect(next.form.error).toBe(null);
    });
    /**
     * #### it finishes fetching on success
     *
     * Should have a valid form and in the Logged out state
     *
     * We set the action to simulate valid data returning from
     * the server
     *
     * We validate that after form and field validation, the values
     * are set.
     */
    it('finishes fetching on success', () => {
      const action = {
        type: ActionTypes.GET_PROFILE_SUCCESS,
        payload: {
          email: 'barton@foo.com',
          emailVerified: true,
          objectId: 'someObjectId',
        },
      };
      const next = profileReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(null);
      expect(next.form.fields.email).toEqual(action.payload.email);
      expect(next.form.fields.emailVerified).toBe(action.payload.emailVerified);

      expect(next.form.originalProfile.email).toEqual(action.payload.email);
      expect(next.form.originalProfile.emailVerified).toBe(action.payload.emailVerified);
    });
    /**
     * #### finishes fetching on failure
     *
     * On failure, toggle the fetching flag and provide the error so
     * the use can see it
     */
    it('finishes fetching on failure', () => {
      const action = {
        type: ActionTypes.GET_PROFILE_FAILURE,
        payload: { error: 'error' },
      };
      const next = profileReducer(undefined, action);
      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(action.payload);
    });
  });// Profile Request

  /**
   * ### Profile update
   *
   */
  describe('PROFILE_UPDATE', () => {
    /**
     * #### starts fetching on request
     *
     * Should have a valid form and show that it's fetching
     */
    it('starts fetching on request', () => {
      const action = {
        type: ActionTypes.PROFILE_UPDATE_REQUEST,
      };
      const next = profileReducer(undefined, action);

      expect(next.form.isFetching).toBe(true);
      expect(next.form.error).toBe(null);
    });
    /**
     * #### finishes fetching on success
     *
     * Toggle fetching flag
     */
    it('finishes fetching on success', () => {
      const action = {
        type: ActionTypes.PROFILE_UPDATE_SUCCESS,
      };
      const next = profileReducer(undefined, action);

      expect(next.form.isFetching).toBe(false);
    });
    /**
     * #### finishes fetching on failure and saves error
     *
     * The fetching has ended and the error saved so the user can see
     * it
     */
    it('finishes fetching on failure and saves error', () => {
      const action = {
        type: ActionTypes.PROFILE_UPDATE_FAILURE,
        payload: { error: 'error' },
      };
      const next = profileReducer(undefined, action);
      expect(next.form.isFetching).toBe(false);
      expect(next.form.error).toBe(action.payload);
    });
  });// ProfileUpdate
  /**
   * ### Profile form field changes
   *
   */
  describe('PROFILE_FORM_FIELD_CHANGE', () => {
    /**
     * #### form is valid to logout
     *
     * Should have a valid form when the field has no error
     */
    it('form is valid with valid email', () => {
      const emailAction = {
        type: ActionTypes.ON_PROFILE_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'barton@gmail.com' },
      };

      const firstState = profileReducer(undefined,
                                emailAction);

      expect(firstState.form.isValid).toBe(true); //
      expect(firstState.form.fields.email).toEqual(emailAction.payload.value);
      expect(firstState.form.fields.emailHasError).toBe(false);
    });
    /**
     * #### form is invalid with invalid email
     *
     * Bad data in, errors out!
     */
    it('form is invalid with invalid email', () => {
      const emailAction = {
        type: ActionTypes.ON_PROFILE_FORM_FIELD_CHANGE,
        payload: { field: 'email', value: 'bart' },
      };

      const firstState = profileReducer(undefined, emailAction);

      expect(firstState.form.isValid).toBe(false);
      expect(firstState.form.fields.email).toEqual(emailAction.payload.value);
      expect(firstState.form.fields.emailHasError).toBe(true);
    });
  }); // FORM FIELD CHANGE
});// profileReducer
