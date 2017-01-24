import type { Profile, Register, UpdatePassword } from '../../../types';

export default class UserDataStore {
  getProfile() {}
  register(data: Register) {}
  forgotPassword(email: string) {}
  sendVerifyEmail(email: string) {}
  updatePassword(profileId: string, data: UpdatePassword) {}
  updateProfile(profileId: string, data: Profile) {}
  verifyUser(hash: string) {}
}
