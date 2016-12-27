import logIn from './logIn';
import logOut from './logOut';
import register from './register';
import resetPassword from './resetPassword';

export const epics = [
  logIn,
  logOut,
  register,
  resetPassword,
];
