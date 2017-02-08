import type { Profile, Register, UpdatePassword } from '../../../types';

export default class UserDataStore {
  getProfile() {}
  register(data: Register) {}
  forgotPassword(email: string) {}
  resetPassword(hash:string, data: UpdatePassword) {}
  sendVerifyEmail(email: string) {}
  updatePassword(data: UpdatePassword) {}
  updateProfile(profileId: string, data: Profile) {}
  verifyUser(hash: string) {}
}
