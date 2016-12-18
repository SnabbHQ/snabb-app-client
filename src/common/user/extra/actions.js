import keyBy from 'lodash/keyBy';
import { getAddress } from '../../job/actions';

export const CLIENT_EXTRA_SUCCESS = 'CLIENT_EXTRA_SUCCESS';

export function loadClientExtra() {
  return (dispatch, getState) => {
    const { isExtraLoaded } = getState().client;

    if (!isExtraLoaded) {
      return dispatch(fetchClientExtra());
    }
  };
}

function fetchClientExtra() {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { id },
    } = getState();

    if (id == null) { return; }

    return apiClient.get(`v1/clients/${id}/extra`).then(({ body }) => {
      const { placesPicking, placesDelivering, creditCards } = body;
      const recentPickUpAddresses = (placesPicking || []).map(getAddress);
      const recentDropOffAddresses = (placesDelivering || []).map(getAddress);

      dispatch({
        type: CLIENT_EXTRA_SUCCESS,
        extra: {
          recentPickUpAddresses,
          recentDropOffAddresses,
        },
        creditCards: keyBy(creditCards, 'id'),
      });
    });
  };
}
