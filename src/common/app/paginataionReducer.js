import { combineReducers } from 'redux';
import {
  ACTIVE_JOBS_REQUEST,
  ACTIVE_JOBS_SUCCESS,
  ACTIVE_JOBS_FAILURE,
  JOBS_HISTORY_REQUEST,
  JOBS_HISTORY_SUCCESS,
  JOBS_HISTORY_FAILURE,
  SCHEDULED_JOBS_REQUEST,
  SCHEDULED_JOBS_SUCCESS,
  SCHEDULED_JOBS_FAILURE
} from '../job/actions';

export function createPaginationReducer(types) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  const [requestType, successType, failureType] = types;

  const initialState = {
    isLoading: false,
    nextPageUrl: null,
    page: 0,
    total: null
  };
  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isLoading: true
        };
      case successType:
        const { nextPageUrl, page, total } = action;

        return {
          ...state,
          isLoading: false,
          nextPageUrl,
          page,
          total
        };
      case failureType:
        return {
          ...state,
          isLoading: false
        };
      default:
        return state;
    }
  };
}

export default combineReducers({
  active: createPaginationReducer([
    ACTIVE_JOBS_REQUEST,
    ACTIVE_JOBS_SUCCESS,
    ACTIVE_JOBS_FAILURE
  ]),
  history: createPaginationReducer([
    JOBS_HISTORY_REQUEST,
    JOBS_HISTORY_SUCCESS,
    JOBS_HISTORY_FAILURE
  ]),
  scheduled: createPaginationReducer([
    SCHEDULED_JOBS_REQUEST,
    SCHEDULED_JOBS_SUCCESS,
    SCHEDULED_JOBS_FAILURE
  ])
});
