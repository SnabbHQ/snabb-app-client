/* @flow */

// Algebraic types are composable, so it makes sense to have them at one place.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// Core

export type Deps = {
  firebase: any,
  firebaseAuth: Function,
  firebaseDatabase: any,
  getState: () => Object,
  getUid: () => string,
  now: () => number,
  validate: (json: Object) => any,
};

// Models

export type Delivery = {
  id: string,
};

export type Phone = {
  number: string
}

export type Profile = {
  id: string,
  name: ?string,
  lastName: ?string,
  phone: Phone,
  email: string,
  thumbnail: ?string,
  emailVerified: boolean,
};

export type User = {
  profile: Profile,
};

// Reducers

export type AppState = {
  error: ?Error,
  menuShown: boolean,
  online: boolean,
  started: boolean,
};

export type AuthState = {
  formDisabled: boolean,
  error: ?Error,
};

export type ConfigState = {
  appName: string,
  appVersion: string,
  firebase: ?Object,
  sentryUrl: string,
};

export type DeviceState = {
  host: string,
  isReactNative: boolean,
  platform: string,
};

export type IntlState = {
  currentLocale: ?string,
  defaultLocale: ?string,
  initialNow: ?number,
  locales: ?Array<string>,
  messages: ?Object,
};

export type ThemeState = {
  currentTheme: ?string,
};

export type DeliveriesState = {
  all: {[id: string]: Delivery}
}

export type UserState = {
  user: ?Profile,
  profile: ?Profile,
};

// State

export type State = {
  app: AppState,
  auth: AuthState,
  config: ConfigState,
  device: DeviceState,
  fields: any,
  intl: IntlState,
  themes: ThemeState,
  deliveries: DeliveriesState,
  users: UsersState,
};

// Actions

export type Action =
    { type: 'APP_ERROR', payload: { error: Error } }
  | { type: 'APP_ONLINE', payload: { online: boolean } }
  | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  | { type: 'APP_STORAGE_LOADED' }
  | { type: 'GET_PROFILE' }
  | { type: 'GET_PROFILE_SUCCESS', payload: { profile: ?Profile } }
  | { type: 'GET_PROFILE_FAIL', payload: { error: Error } }
  | { type: 'LOG_IN', payload: { options?: Object } }
  | { type: 'LOG_IN_SUCCESS', payload: { user: ?User } }
  | { type: 'LOG_IN_FAIL', payload: { error: Error } }
  | { type: 'LOG_OUT' }
  | { type: 'LOG_OUT_SUCCESS' }
  | { type: 'PROFILE_UPDATE' }
  | { type: 'UPDATE_USER_SUCCESS' }
  | { type: 'RESET_PASSWORD', payload: { email: string } }
  | { type: 'RESET_PASSWORD_SUCCESS', payload: { email: string } }
  | { type: 'SESSION_TOKEN', payload: { email: string } }
  | { type: 'SESSION_TOKEN_SUCCESS', payload: { token: string } }
  | { type: 'SESSION_TOKEN_FAIL', payload: { error: Error} }
  | { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
  | { type: 'SET_THEME', payload: { theme: string } }
  | { type: 'REGISTER', payload: { providerName: string, options?: Object } }
  | { type: 'REGISTER_SUCCESS', payload: { user: ?User } }
  | { type: 'REGISTER_FAIL', payload: { error: Error } }
  ;
