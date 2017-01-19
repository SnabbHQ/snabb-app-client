import getProfile from './getProfile';
import register from './register';
import forgotPassword from './forgotPassword';
import updateProfile from './updateProfile';

export const epics = [
  getProfile,
  register,
  forgotPassword,
  updateProfile,
];
