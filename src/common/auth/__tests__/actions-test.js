import * as actions from '../actions';

describe('All Auth actions', () => {

  describe('User Login', () => {
    it('should login', () => {
      const options = { username: 'a@a.com', password: 'a' };
      expect(actions.login(options)).toEqual({
        type: 'LOG_IN',
        payload: { options } ,
      });
    });

    it('should loginSuccess', () => {
      const profile = { profileId: 1234 };
      expect(actions.loginSuccess(profile)).toEqual({
        type: 'LOG_IN_SUCCESS',
        payload: { profile } ,
      });
    });

    it('should loginFail', () => {
      const error = Error;
      expect(actions.loginFail(error)).toEqual({
        type: 'LOG_IN_FAIL',
        payload: { error }
      });
    });
  });
});
