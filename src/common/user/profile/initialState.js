/**
 * # profileInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
import type { Profile } from '../../types';
import { Record } from 'immutable';

type Fields = {
  name: ?string,
  lastName: ?string,
  phoneNumber: string,
  email: string,
  thumbnail: ?string,
  emailHasError: ?boolean,
  emailErrorMsg: ?string,
  emailVerified: boolean,
}

type Form = {
  disabled: boolean,
  error: ?Object,
  isValid: boolean,
  isFetching: boolean,
  updated: boolean,
  fields: Fields
};

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The profile is what the server provided and has the objectId
 * The fields are what display on the UI
 */
const fields: Fields = {
  name: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  thumbnail: '',
  emailHasError: false,
  emailErrorMsg: '',
  emailVerified: false,
};

const form: Form = {
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  updated: false,
  fields: new (Record(fields))(),
};

const profile: Profile = {
  id: null,
  name: null,
  lastName: null,
  phoneNumber: null,
  email: null,
  thumbnail: null,
  emailVerified: null,
};

const InitialState = Record({
  form: new Record(form),
  profile: new Record(profile),
});

export default InitialState;
