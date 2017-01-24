/* @flow weak */
import { BaseError } from 'make-error';

class ApiError extends BaseError {

  constructor(name, params = {}) {
    super(`ApiError: ${JSON.stringify({ name, params })}`);
    this.name = name;
    this.params = params;
  }

}

export default ApiError;
