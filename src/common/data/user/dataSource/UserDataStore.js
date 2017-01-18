import type { Profile } from '../../../types';

export default class UserDataStore {
  getProfile() {}
  updateProfile(profileId: string, data: Profile) {}
  resetPassword(email: string) {}
}
