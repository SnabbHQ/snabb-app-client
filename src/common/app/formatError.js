/* @flow */
import appErrorMessages from '../app/errorMessages';
import authErrorMessages from '../auth/errorMessages';
import userErrorMessages from '../user/errorMessages';
import { ValidationError } from '../lib/validation';
import ApiError from '../lib/api/ApiError';

const isInnocuousError = error =>
  error.code === 'auth/popup-closed-by-user'; // Firebase stuff.

const formatValidationError = error => ({
  message:
    authErrorMessages[error.name] ||
    userErrorMessages[error.name],
  values: error.params,
});

const formatApiError = error => ({
  message:
    authErrorMessages[error.name] ||
    userErrorMessages[error.name] ||
    appErrorMessages['unknown'],
  values: error.params,
});

// Because app errors can be reused at many UI places, we have one common
// formatError helper function.
const formatError = (error: Object) => {

  // Some errors are so innocuos that we don't have to show any message.
  if (isInnocuousError(error)) {
    return { message: null };
  }

  // Note all app validation errors are mapped to UI messages here.
  // With such design, the app can have a lot of various different components,
  // and it's not a component responsibility to project an error to UI.
  if (error instanceof ValidationError) {
    return formatValidationError(error);
  }

  // Note all api errors are mapped to UI messages here.
  // With such design, the app can have a lot of various different components,
  // and it's not a component responsibility to project an error to UI.
  if (error instanceof ApiError) {
    return formatApiError(error);
  }


  // Return null for unknown error, so it will be reported.
  return null;
};

export default formatError;
