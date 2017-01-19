import getProfile from './getProfile';
import register from './register';
import resetPassword from './resetPassword';
import updateProfile from './updateProfile';

export const epics = [
  getProfile,
  register,
  resetPassword,
  updateProfile,
];
