import {
  FETCH_WALLETS_SUCCESS
} from '../actions';

export default function wallet(state = null, action) {
  switch (action.type) {
    case FETCH_WALLETS_SUCCESS:
      return action.wallets;
  }

  return state;
}
