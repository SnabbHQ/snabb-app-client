import { combineReducers } from 'redux';
import createPendingStatusReducer from '../lib/createPendingStatusReducer';

import {
  RESET_NEW_JOB,
  NEW_JOB_VALUE_CHANGE,
  NEW_JOB_PLACE_REQUEST,
  NEW_JOB_PLACE_SUCCESS,
  NEW_JOB_PLACE_FAILURE,
  NEW_JOB_QUOTES_REQUEST,
  NEW_JOB_QUOTES_SUCCESS,
  CREATE_NEW_JOB_REQUEST,
  CREATE_NEW_JOB_SUCCESS,
  CREATE_NEW_JOB_FAILURE,
  SCHEDULING_SUCCESS
} from '../actions';

export const isCreating = createPendingStatusReducer([
  CREATE_NEW_JOB_REQUEST,
  CREATE_NEW_JOB_SUCCESS,
  CREATE_NEW_JOB_FAILURE
]);

function schedulingValue(state, action) {
  switch (action.type) {
    case SCHEDULING_SUCCESS:
      const {
        when,
        slot: {
          dayKey: previousDayKey,
          slotKey: previousSlotKey
        }
      } = state;

      const { dayKeys, daysByKey } = action.scheduling;

      const day = daysByKey[previousDayKey] || daysByKey[dayKeys[0]];
      const slot = day.slotsByKey[previousSlotKey] || day.slotsByKey[day.slotKeys[0]];

      return {
        when,
        slot: {
          dayKey: day.key,
          slotKey: slot.key
        }
      };
    default:
      return state;
  }
}

export function value(state = {
  // transportType: 'bike',
  scheduling: {
    when: 'now',
    slot: {}
  }
}, action) {
  switch (action.type) {
    case SCHEDULING_SUCCESS:
      return {
        ...state,
        scheduling: schedulingValue(state.scheduling, action)
      };
    case RESET_NEW_JOB:
    case NEW_JOB_VALUE_CHANGE:
      return {
        ...state,
        ...action.value
      };
    case NEW_JOB_PLACE_REQUEST:
      const nextState = { ...state };

      if (action.shouldClearPlaceValue) {
        // Only clean field that are under the address
        nextState[action.placeType] = {
          ...state[action.placeType],
          contactPhone: '',
          contactEmail: '',
          comment: ''
        };
      }

      return nextState;
    case NEW_JOB_PLACE_SUCCESS:
      if (action.shouldFillPlaceValue) {
        return {
          ...state,
          [action.placeType]: {
            ...state[action.placeType],
            contactCompany: action.place.contactCompany,
            contactFirstname: action.place.contactFirstname,
            contactLastname: action.place.contactLastname,
            contactPhone: action.place.contactPhone,
            contactEmail: action.place.contactEmail,
            comment: action.place.comment
          }
        };
      }
    default:
      return state;
  }
}

export function errors(state = {}, action) {
  switch (action.type) {
    case RESET_NEW_JOB:
      return {};
    case NEW_JOB_PLACE_REQUEST:
    case NEW_JOB_PLACE_SUCCESS:
      return {
        ...state,
        [action.placeType]: null
      };
    case NEW_JOB_PLACE_FAILURE:
      return {
        ...state,
        [action.placeType]: action.error.response.body.errors
      };
  }

  return state;
}

export function places(state = {}, action) {
  switch (action.type) {
    case RESET_NEW_JOB:
      return action.places;
    case NEW_JOB_PLACE_REQUEST:
      return {
        ...state,
        [`${action.placeType}Place`]: null
      };
    case NEW_JOB_PLACE_SUCCESS:
      return {
        ...state,
        [`${action.placeType}Place`]: action.place
      };
  }

  return state;
}

export function quotes(state = {}, action) {
  switch (action.type) {
    case RESET_NEW_JOB:
    case NEW_JOB_PLACE_REQUEST:
    case NEW_JOB_QUOTES_REQUEST:
      return {};
    case NEW_JOB_QUOTES_SUCCESS:
      return {
        fetchedAtTime: action.fetchedAtTime,
        hash: action.hash,
        ...action.quotes
      };
  }

  return state;
}

export function scheduling(state = {
  dayKeys: [],
  daysByKey: {}
}, action) {
  switch (action.type) {
    case SCHEDULING_SUCCESS:
      return action.scheduling;
    default:
      return state;
  }
}

export default combineReducers({
  isCreating,
  value,
  errors,
  places,
  quotes,
  scheduling
});
