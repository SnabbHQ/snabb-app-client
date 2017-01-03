import login from './login';
import logout from './logout';
import register from './register';
import resetPassword from './resetPassword';

export const epics = [
  login,
  logout,
  register,
  resetPassword,
];
