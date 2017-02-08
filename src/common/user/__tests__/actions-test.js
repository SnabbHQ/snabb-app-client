import * as actions from '../actions';

describe('All User actions', () => {

  describe('User forgot password', () => {
    it('should forgotPassword', () => {
      const options = { email: 'a@a.com' };
      expect(actions.forgotPassword(options)).toEqual({
        type: 'FORGOT_PASSWORD',
        payload: { options } ,
      });
    });

    it('should forgotPasswordSuccess', () => {
      expect(actions.forgotPasswordSuccess()).toEqual({ type: 'FORGOT_PASSWORD_SUCCESS' });
    });

    it('should forgotPasswordFail', () => {
      const error = Error;
      expect(actions.forgotPasswordFail(error)).toEqual({
        type: 'FORGOT_PASSWORD_FAIL',
        payload: { error }
      });
    });
  });

  describe('Get user profile', () => {
    it('should getProfile', () => {
      expect(actions.getProfile()).toEqual({ type: 'GET_PROFILE' });
    });

    it('should getProfileSuccess', () => {
      const profile = { profileId: 1234 };
      expect(actions.getProfileSuccess(profile)).toEqual({
        type: 'GET_PROFILE_SUCCESS',
        payload: { profile } ,
      });
    });

    it('should getProfileFail', () => {
      const error = Error;
      expect(actions.getProfileFail(error)).toEqual({
        type: 'GET_PROFILE_FAIL',
        payload: { error } ,
      });
    });
  });

  describe('Registration', () => {
    it('should register', () => {
      const providerName = 'password';
      const options = { companyName: 'a', email: 'b@b.com' };

      expect(actions.register(providerName, options)).toEqual({
        type: 'REGISTER',
        payload: { providerName, options }
      });
    });

    it('should registerSuccess', () => {
      const profile = { profileId: 1234 };
      expect(actions.registerSuccess(profile)).toEqual({
        type: 'REGISTER_SUCCESS',
        payload: { profile } ,
      });
    });

    it('should registerFail', () => {
      const error = Error;
      expect(actions.registerFail(error)).toEqual({
        type: 'REGISTER_FAIL',
        payload: { error } ,
      });
    });
  });

  describe('Send verify email', () => {
    it('should sendVerifyEmail', () => {
      const email = 'a@b.com';
      expect(actions.sendVerifyEmail(email)).toEqual({
        type: 'SEND_VERIFY_EMAIL',
        payload: { email }
      });
    });

    it('should sendVerifyEmailSuccess', () => {
      expect(actions.sendVerifyEmailSuccess()).toEqual({ type: 'SEND_VERIFY_EMAIL_SUCCESS' });
    });

    it('should sendVerifyEmailFail', () => {
      const error = Error;
      expect(actions.sendVerifyEmailFail(error)).toEqual({
        type: 'SEND_VERIFY_EMAIL_FAIL',
        payload: { error } ,
      });
    });
  });

  describe('Update password', () => {
    it('should updatePassword', () => {
      const profileId = 1234;
      const options = { currentPassword: 'a' };
      expect(actions.updatePassword(profileId, options)).toEqual({
        type: 'PASSWORD_UPDATE',
        payload: { profileId, options }
      });
    });

    it('should updatePasswordSuccess', () => {
      const profile = { profileId: 1234 };
      expect(actions.updatePasswordSuccess(profile)).toEqual({
        type: 'PASSWORD_UPDATE_SUCCESS',
        payload: { profile }
      });
    });

    it('should updatePasswordFai', () => {
      const error = Error;
      expect(actions.updatePasswordFail(error)).toEqual({
        type: 'PASSWORD_UPDATE_FAIL',
        payload: { error } ,
      });
    });
  });

  describe('Update profile', () => {
    it('should updateProfile', () => {
      const profileId = 1234;
      const options = { companyName: 'a' };
      expect(actions.updateProfile(profileId, options)).toEqual({
        type: 'PROFILE_UPDATE',
        payload: { profileId, options }
      });
    });

    it('should updateProfileSuccess', () => {
      const profile = { profileId: 1234 };
      expect(actions.updateProfileSuccess(profile)).toEqual({
        type: 'PROFILE_UPDATE_SUCCESS',
        payload: { profile }
      });
    });

    it('should updateProfileFail', () => {
      const error = Error;
      expect(actions.updateProfileFail(error)).toEqual({
        type: 'PROFILE_UPDATE_FAIL',
        payload: { error } ,
      });
    });
  });

  describe('Verify user', () => {
    it('should verifyUser', () => {
      const hash = 'abc';
      expect(actions.verifyUser(hash)).toEqual({
        type: 'VERIFY_USER',
        payload: { hash }
      });
    });

    it('should verifyUserSuccess', () => {
      expect(actions.verifyUserSucceess()).toEqual({ type: 'VERIFY_USER_SUCCESS' });
    });

    it('should verifyUserFail', () => {
      const error = Error;
      expect(actions.verifyUserFail(error)).toEqual({
        type: 'VERIFY_USER_FAIL',
        payload: { error } ,
      });
    });
  });
});
