import getProfile from './getProfile';
import register from './register';
import forgotPassword from './forgotPassword';
import sendVerifyEmail from './sendVerifyEmail';
import updatePassword from './updatePassword';
import updateProfile from './updateProfile';
import verifyUser from './verifyUser';

export const epics = [
  getProfile,
  register,
  forgotPassword,
  sendVerifyEmail,
  updatePassword,
  updateProfile,
  verifyUser,
];
