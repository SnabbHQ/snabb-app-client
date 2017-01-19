import type { Profile, Register } from '../../../types';

export default class UserDataStore {
  getProfile() {}
  register(data: Register) {}
  forgotPassword(email: string) {}
  updateProfile(profileId: string, data: Profile) {}
}
