import analytics from '../lib/analytics';
import { getNonce } from '../lib/braintree';

export const CREATE_CREDIT_CARD_REQUEST = 'CREATE_CREDIT_CARD_REQUEST';
export const CREATE_CREDIT_CARD_SUCCESS = 'CREATE_CREDIT_CARD_SUCCESS';
export const CREATE_CREDIT_CARD_FAILURE = 'CREATE_CREDIT_CARD_FAILURE';

export function createCreditCard(creditCard) {
  return (dispatch, getState) => {
    const {
      cardName,
      cardNumber,
      cardCode,
      cardDate,
    } = creditCard;

    const {
      apiClient,
      client: { id },
    } = getState();

    dispatch({ type: CREATE_CREDIT_CARD_REQUEST });

    const promise = apiClient.get(`v1/clients/${id}/creditcards/token`).then(({ body }) => getNonce(body.token, cardCode, cardDate, cardNumber)).then((nonce) => apiClient.post('v1/creditcards', { nonce, name: cardName }).then(r => r.body)).then((creditCard) => {
      dispatch({
        type: CREATE_CREDIT_CARD_SUCCESS,
        creditCards: {
          [creditCard.id]: creditCard,
        },
      });
    });

    promise.catch((error) => {
      dispatch({ type: CREATE_CREDIT_CARD_FAILURE, error });
    });

    return promise;
  };
}

export const DELETE_CREDIT_CARD_REQUEST = 'DELETE_CREDIT_CARD_REQUEST';
export const DELETE_CREDIT_CARD_SUCCESS = 'DELETE_CREDIT_CARD_SUCCESS';
export const DELETE_CREDIT_CARD_FAILURE = 'DELETE_CREDIT_CARD_FAILURE';

export function deleteCreditCard(cardId) {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { id },
    } = getState();

    dispatch({ type: DELETE_CREDIT_CARD_REQUEST });

    const promise = apiClient.del(`v1/clients/${id}/creditcards/${cardId}`).then(() => {
      dispatch({ type: DELETE_CREDIT_CARD_SUCCESS, cardId });
    }).catch((error) => {
      dispatch({ type: DELETE_CREDIT_CARD_FAILURE, error });
    });

    return promise;
  };
}

export const DEFAULT_CREDIT_CARD_REQUEST = 'DEFAULT_CREDIT_CARD_REQUEST';
export const DEFAULT_CREDIT_CARD_SUCCESS = 'DEFAULT_CREDIT_CARD_SUCCESS';
export const DEFAULT_CREDIT_CARD_FAILURE = 'DEFAULT_CREDIT_CARD_FAILURE';

export function defaultCreditCard(cardId) {
  return (dispatch, getState) => {
    const {
      apiClient,
    } = getState();

    dispatch({ type: DEFAULT_CREDIT_CARD_REQUEST });

    const promise = apiClient.patch(`v1/creditcards/${cardId}`, {
      default: true,
    }).then(() => {
      dispatch({ type: DEFAULT_CREDIT_CARD_SUCCESS, cardId });
    }).catch((error) => {
      dispatch({ type: DEFAULT_CREDIT_CARD_FAILURE, error });
    });

    return promise;
  };
}

export const REDEEM_COUPON_REQUEST = 'REDEEM_COUPON_REQUEST';
export const REDEEM_COUPON_SUCCESS = 'REDEEM_COUPON_SUCCESS';
export const REDEEM_COUPON_FAILURE = 'REDEEM_COUPON_FAILURE';

export function redeemCoupon(code) {
  return (dispatch, getState) => {
    const {
      apiClient,
    } = getState();

    dispatch({ type: REDEEM_COUPON_REQUEST });

    const promise = apiClient.post('/v1/coupons/load', {
      code,
    }).then(() => {
      dispatch({ type: REDEEM_COUPON_SUCCESS });
      return dispatch(fetchWallets());
    });

    promise.catch((error) => {
      dispatch({ type: REDEEM_COUPON_FAILURE, error });
    });

    return promise;
  };
}

export const FETCH_WALLETS_REQUEST = 'FETCH_WALLETS_REQUEST';
export const FETCH_WALLETS_SUCCESS = 'FETCH_WALLETS_SUCCESS';
export const FETCH_WALLETS_FAILURE = 'FETCH_WALLETS_FAILURE';

export function fetchWallets() {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { id },
    } = getState();

    dispatch({ type: FETCH_WALLETS_REQUEST });

    // TODO: revert a71b51d when `/wallet` works (no billing addres error in API)
    const promise = apiClient.get(`/v1/clients/${id}/wallets`, {}).then(({ body }) => {
      const traits = {};

      body.forEach((wallet) => {
        traits[`walletBalance${wallet.currency.isoCode}`] = wallet.amount;
      });

      analytics.identify(id, traits);

      dispatch({ type: FETCH_WALLETS_SUCCESS, wallets: body });
    }).catch((error) => {
      dispatch({ type: FETCH_WALLETS_FAILURE, error });
    });

    return promise;
  };
}

export const BILLING_DETAILS_CHANGE = 'BILLING_DETAILS_CHANGE';

export function setBillingDetailsValue(value) {
  return {
    type: BILLING_DETAILS_CHANGE,
    billingAccount: value,
  };
}

export const UPDATE_BILLING_DETAILS_REQUEST = 'UPDATE_BILLING_DETAILS_REQUEST';
export const UPDATE_BILLING_DETAILS_SUCCESS = 'UPDATE_BILLING_DETAILS_SUCCESS';
export const UPDATE_BILLING_DETAILS_FAILURE = 'UPDATE_BILLING_DETAILS_FAILURE';

export function updateBillingDetails(value) {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { id },
    } = getState();

    dispatch({ type: UPDATE_BILLING_DETAILS_REQUEST });

    const promise = apiClient.patch(`v1/clients/${id}`, {
      billing_account: value,
    }).then(({ body: client }) => {
      dispatch({ type: UPDATE_BILLING_DETAILS_SUCCESS, billingAccount: client.billingAccount });
    });

    promise.catch((error) => {
      dispatch({ type: UPDATE_BILLING_DETAILS_FAILURE, error });
    });

    return promise;
  };
}
