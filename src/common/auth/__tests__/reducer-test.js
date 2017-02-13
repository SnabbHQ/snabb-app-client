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
describe('Auth Reducer tests', () => {

  describe('LOG_IN', () => {

    it('starts fetching', () => {
      const action = {
        type: 'LOG_IN',
      };
      const next = reducer(undefined, action);

      expect(next.formDisabled).toBe(true);
      expect(next.isFetching).toBe(true);
      expect(next.error).toBe(null);
    });

    it('finishes fetching on success', () => {
      const action = {
        type: 'LOG_IN_SUCCESS',
      };
      const next = reducer(undefined, action);

      expect(next.formDisabled).toBe(false);
      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(null);
    });

      it('finishes fetching on failure', () => {
        const action = {
          type: 'LOG_IN_FAIL',
          payload: { error: Error },
        };
        const next = reducer(undefined, action);
        expect(next.isFetching).toBe(false);
        expect(next.error).toBe(action.payload.error);
      });
  });

  describe('LOG_OUT', () => {

    it('starts fetching', () => {
      const action = {
        type: 'LOG_OUT',
      };
      const next = reducer(undefined, action);

      expect(next.formDisabled).toBe(true);
      expect(next.isFetching).toBe(true);
      expect(next.error).toBe(null);
    });

    it('finishes fetching on success', () => {
      const action = {
        type: 'LOG_OUT_SUCCESS',
      };
      const next = reducer(undefined, action);

      expect(next.formDisabled).toBe(false);
      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(null);
    });

    it('finishes fetching on failure', () => {
      const action = {
        type: 'LOG_OUT_FAIL',
        payload: { error: Error },
      };
      const next = reducer(undefined, action);
      expect(next.isFetching).toBe(false);
      expect(next.error).toBe(action.payload.error);
    });
  });
});
