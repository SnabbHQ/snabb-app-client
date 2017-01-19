import keyMirror from 'key-mirror';

export const PENDING_JOB_STATUSES = ['new', 'searching', 'accepted'];
export const ACTIVE_JOB_STATUSES = PENDING_JOB_STATUSES.concat(['in_progress']);
export const HISTORY_JOB_STATUSES = ['returned', 'canceled', 'finished'];
export const SCHEDULED_JOB_STATUSES = ['scheduled'];

export const JOB_TYPES = {
  transport: 1,
  package: 2,
};

export const TRANSPORT_TYPES = {
  walk: 1,
  bike: 2,
  cargobike: 5,
  motorbike: 3,
  car: 4,
  van: 6,
  cargobikexl: 7,
};

export const PAYMENT_METHODS = {
  creditCard: 1,
  paypal: 2,
  corporate: 3,
  wallet: 4,
};

export const PLACE_TYPES = {
  pickUp: 2,
  dropOff: 3,
};

export const DEFAULT_CITY = 'valencia';

export const CITIES = {
  stockholm: {
    isoCode: 'SEK',
    countryCode: 46,
    center: {
      latitude: 59.3293,
      longitude: 18.0686,
    },
    transportTypes: [
      'bike',
    ],
  },
  valencia: {
    isoCode: 'EUR',
    countryCode: 34,
    center: {
      latitude: 39.4699,
      longitude: 0.3763,
    },
    transportTypes: [
      'bike',
      'motorbike',
    ],
  },
};

export const DEFAULT_PLACE_STORAGE_KEY = 'snabb_default_place';

export const POLL_DRIVERS_INTERVAL = 15000;
export const POLL_QUOTES_INTERVAL = 30000;

export default keyMirror({
  SET_PLATFORM: null,
  SET_VERSION: null,

  SESSION_TOKEN_REQUEST: null,
  SESSION_TOKEN_SUCCESS: null,
  SESSION_TOKEN_FAILURE: null,

  DELETE_TOKEN_REQUEST: null,
  DELETE_TOKEN_SUCCESS: null,

  ON_LOGIN_STATE_CHANGE: null,
  LOGOUT: null,

  ON_AUTH_FORM_FIELD_CHANGE: null,
  SIGNUP_REQUEST: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_FAILURE: null,

  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  LOGOUT_REQUEST: null,
  LOGOUT_SUCCESS: null,
  LOGOUT_FAILURE: null,

  LOGGED_IN: null,
  LOGGED_OUT: null,

  SET_SESSION_TOKEN: null,

  FORGOT_PASSWORD_REQUEST: null,
  FORGOT_PASSWORD_SUCCESS: null,
  FORGOT_PASSWORD_FAILURE: null,

  ON_PROFILE_FORM_FIELD_CHANGE: null,

  PROFILE_UPDATE_REQUEST: null,
  PROFILE_UPDATE_SUCCESS: null,
  PROFILE_UPDATE_FAILURE: null,

  SET_STATE: null,
  GET_STATE: null,
  SET_STORE: null,

  FORGOT_PASSWORD: null,
  LOGIN: null,
  REGISTER: null,

  CURRENT_POSITION: null,
  SET_PICKUP_LOCATION: null,
  SET_DELIVERY_LOCATION: null,

  PICKUP_LOCATION: null,
  DELIVERY_LOCATION: null,

  DELIVERY_SET_PICKUP: null,
  DELIVERY_REQUEST: null,
});
