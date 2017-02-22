import * as actions from '../actions';

describe('All Delivery actions', () => {

  describe('Validate Address', () => {
    it('should validate Adress', () => {
      const options = { address: 'example' };
      expect(actions. validateAddress(options)).toEqual({
        type: 'VALIDATE_ADDRESS',
        payload: { options } ,
      });
    });

    it('should validateAddressSuccess', () => {
      expect(actions.validateAddressSuccess()).toEqual({ type: 'VALIDATE_ADDRESS_SUCCESS' });
    });

    it('should validateAddressFail', () => {
      const error = Error;
      expect(actions.validateAddressFail(error)).toEqual({
        type: 'VALIDATE_ADDRESS_FAIL',
        payload: { error }
      });
    });
  });

  describe('Create Quotes', () => {
    it('should createQuote', () => {
      expect(actions.createQuote()).toEqual({ type: 'CREATE_QUOTE' });
    });

    it('should createQuoteSuccess', () => {
      const quote= {
        quoteId: 1234,
        distance: 0,
        expireAt: 123543,
        quoteUser: 34,
        tasks: [
          {
            taskId: 1234,
          }
        ],
      };
      expect(actions.createQuoteSuccess(quote)).toEqual({
        type: 'CREATE_QUOTE_SUCCESS',
        payload: { quote } ,
      });
    });

    it('should getProfileFail', () => {
      const error = Error;
      expect(actions.createQuoteFail(error)).toEqual({
        type: 'CREATE_QUOTE_FAIL',
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
      const options = { currentPassword: 'a' };
      expect(actions.updatePassword(options)).toEqual({
        type: 'PASSWORD_UPDATE',
        payload: { options }
      });
    });

    it('should updatePasswordSuccess', () => {
      expect(actions.updatePasswordSuccess()).toEqual({
        type: 'PASSWORD_UPDATE_SUCCESS',
      });
    });

    it('should updatePasswordFail', () => {
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
