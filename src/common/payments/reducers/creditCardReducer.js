import omit from 'lodash/omit';
import mapValues from 'lodash/mapValues';

import {
  CLIENT_EXTRA_SUCCESS,
  CREATE_CREDIT_CARD_SUCCESS,
  DELETE_CREDIT_CARD_SUCCESS,
  DEFAULT_CREDIT_CARD_SUCCESS,
} from '../actions';

function setNewDefault(creditCards, cardId) {
  return mapValues(creditCards, (card) => ({
    ...card,
    isDefault: card.id === cardId,
  }));
}

export default function creditCards(state = null, action) {
  switch (action.type) {
    case CLIENT_EXTRA_SUCCESS:
      return action.creditCards;
    case CREATE_CREDIT_CARD_SUCCESS:
      return {
        ...setNewDefault(state, null),
        ...action.creditCards,
      };
    case DELETE_CREDIT_CARD_SUCCESS:
      return omit(state, action.cardId);
    case DEFAULT_CREDIT_CARD_SUCCESS:
      return setNewDefault(state, action.cardId);
  }

  return state;
}
