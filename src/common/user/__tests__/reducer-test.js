/**
 * ## Class under test
 */
import reducer from '../reducer';

/**
 * ## Tests
 *
 * * *Note*: these tests call the ```reducer``` with an
 * ```undefined``` state so that the reducer will return a valid state.
 */
describe('User Reducer', () => {

  /**
   * ### Profile Request
   */
  describe('GET_PROFILE', () => {

    it('starts fetching', () => {
      const action = {
        type: 'GET_PROFILE',
      };
      const next = reducer(undefined, action);

      expect(next.formDisabled).toBe(true);
      expect(next.isFetching).toBe(true);
      expect(next.error).toBe(null);
    });

    it('finishes fetching on success', () => {
      const action = {
        type: 'GET_PROFILE_SUCCESS',
        payload: {
          profile: {
            email: 'barton@foo.com',
            profileId: 1234,
          }
        },
      };
      const next = reducer(undefined, action);

      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(null);

      expect(next.profile.email).toEqual(action.payload.profile.email);
      expect(next.profile.profileId).toBe(action.payload.profile.profileId);
    });

      it('finishes fetching on failure', () => {
        const action = {
          type: 'GET_PROFILE_FAIL',
          payload: { error: Error },
        };
        const next = reducer(undefined, action);
        expect(next.isFetching).toBe(false);
        expect(next.error).toBe(action.payload.error);
      });
  });

  /**
   * ### Profile update
   */
  describe('PROFILE_UPDATE', () => {

    it('starts fetching on request', () => {
      const action = {
        type: 'PROFILE_UPDATE',
      };
      const next = reducer(undefined, action);

      expect(next.isFetching).toBe(true);
      expect(next.error).toBe(null);
    });

    it('finishes fetching on success', () => {
      const action = {
        type: 'PROFILE_UPDATE_SUCCESS',
        payload: {
          profile: {
            email: 'barton@foo.com',
            profileId: 1234,
          }
        },
      };
      const next = reducer(undefined, action);

      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(null);
      expect(next.profile.email).toEqual(action.payload.profile.email);
      expect(next.profile.profileId).toBe(action.payload.profile.profileId);
    });

    it('finishes fetching on failure and saves error', () => {
      const action = {
        type: 'PROFILE_UPDATE_FAIL',
        payload: { error: Error },
      };
      const next = reducer(undefined, action);
      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(action.payload.error);
    });
  });


  /**
   * ### Profile form field changes
   */
  describe('FIELDS_SET_FIELD', () => {

    /**
     * #### form is valid to logout
     *
     * Should have a valid form when the field has no error
     */
    it('form is valid with valid email', () => {
      const action = {
        type: 'FIELDS_SET_FIELD',
      };

      const next = reducer(undefined, action);

      expect(next.formDisabled).toBe(false);
      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(null);
    });
  });


  /**
   * ### Profile form field changes
   */
  describe('VERIFY_USER', () => {
    it('Starts verifying on request', () => {
      const action = {
        type: 'VERIFY_USER',
      };
      const next = reducer(undefined, action);

      expect(next.isFetching).toBe(true);
      expect(next.error).toBe(null);
    });

    it('Finishes fetching on success', () => {
      const action = {
        type: 'VERIFY_USER_SUCCESS'
      };
      const next = reducer(undefined, action);

      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(null);
    });

    it('Finishes fetching on failure and saves error', () => {
      const action = {
        type: 'VERIFY_USER_FAIL',
        payload: { error: Error },
      };
      const next = reducer(undefined, action);
      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(action.payload.error);
    });
  });

});
