import type { Action, DeliveriesState } from '../types';

const initialState = {
};

const reducer = (
  state: DeliveriesState = initialState,
  action: Action,
): DeliveriesState => {
  switch (action.type) {

    default:
      return state;

  }
};

export default reducer;

