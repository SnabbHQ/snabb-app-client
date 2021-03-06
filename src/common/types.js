/* @flow */

// Algebraic types are composable, so it makes sense to have them at one place.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// Core

export type Deps = {
  authRepository: any,
  userRepository: any,
  storageEngine: any,
  snabbApi: any,
  getState: () => Object,
  getUid: () => string,
  now: () => number,
  validate: (json: Object) => any,
};

// Models
export type Address = {
  addressId: number,
  address: string,
  latitude: number,
  longitude: number,
  active: boolean,
  createdAt: number,
  updatedAt: number,
  zipcode: string,
  city: City,
};

export type City = {
  name: string,
  region: Region,
};

export type Contact = {
  firstName: string,
  lastName: string,
  companyName: string,
  phone: string,
  email: string,
};

export type Country = {
  name: string,
  isoCode: string,
  currency: Currency,
};

export type Currency = {
  symbol: string,
  isoCode: string,
};

export type Delivery = {
  id: string,
};

export type Package = {
  price: number,
  eta: number
};

export type Place = {
  placeId: number,
  description: string,
  address: string,
};

export type Profile = {
  companyName: string,
  createdAt: number,
  email: string,
  firstName?: string
  lastName?: string,
  phone: string,
  profileId: string,
  sendEmailNotifications: boolean,
  sendSmsNotifications: boolean,
  updatedAt: number,
  userLang: UserLang,
  verified: boolean,
};

export type Quote = {
  quoteId: number,
  distance: number,
  expireAt: number,
  quoteUser: number,
  tasks: ?Array<Task>,
};

export type Region = {
  name: string,
  country: Country,
};

export type Task = {
  taskId: number,
  place: Place,
  contact: Contact,
  order: number,
  comments: string,
  taskType: 'dropoff' | 'pickup'
};

export type Register = {
  companyName: string,
  email: string,
  phone: string,
  password: string,
};

export type UpdatePassword = {
  currentPassword: string,
  newPassword: string,
};

export type User = {
  profile: Profile,
};

export type UserLang =
  'en'
    | 'es'
    | 'sv'
  ;

// Reducers
export type AppState = {
  baselineShown: boolean,
  currentTheme: string,
  error: ?Error,
  menuShown: boolean,
  messageShown: boolean,
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

export type DeliveryState = {
  error: ?Error,
  dropoffError: ?Error,
  dropoffPlace: Object,
  pickupError: ?Error,
  pickupPlace: Object,
  quote: Quote,
}

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
  profile: ?Profile,
  formDisabled: boolean,
  error: ?Object,
  isFetching: boolean,
  resetPasswordSuccess: boolean,
  verified: boolean,
};

// State

export type State = {
  app: AppState,
  auth: AuthState,
  config: ConfigState,
  delivery: DeliveryState,
  device: DeviceState,
  fields: any,
  intl: IntlState,
  themes: ThemeState,
  deliveries: DeliveriesState,
  user: UserState,
};

// Actions

export type Action =
    { type: 'APP_SHOW_MESSAGE', payload: { messageShown: boolean } }
  | { type: 'APP_ERROR', payload: { error: Error } }
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
  | { type: 'FORGOT_PASSWORD', payload: { email: string } }
  | { type: 'FORGOT_PASSWORD_SUCCESS' }
  | { type: 'FORGOT_PASSWORD_FAIL', payload: { error: Error } }
  | { type: 'SESSION_TOKEN', payload: { email: string } }
  | { type: 'SESSION_TOKEN_SUCCESS', payload: { token: string } }
  | { type: 'SESSION_TOKEN_FAIL', payload: { error: Error} }
  | { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
  | { type: 'SET_THEME', payload: { theme: string } }
  | { type: 'SILENT_LOG_IN' }
  | { type: 'SILENT_LOG_IN_SUCCESS', payload: { user: ?User } }
  | { type: 'REGISTER', payload: { providerName: string, options?: Object } }
  | { type: 'REGISTER_SUCCESS', payload: { user: ?User } }
  | { type: 'REGISTER_FAIL', payload: { error: Error } }
  ;
