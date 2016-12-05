import { browserHistory } from 'react-router';
import keyBy from 'lodash/keyBy';
import reduce from 'lodash/reduce';
import storage from '../lib/storage';
import * as authUtils from '../lib/authUtils';
import analytics from '../lib/analytics';
import getPosition from '../lib/getPosition';
import getClosestCity from '../lib/getClosestCity';
import { getNonce } from '../lib/braintree';
import {
  ACTIVE_JOB_STATUSES,
  CITIES,
  DEFAULT_PLACE_STORAGE_KEY,
  HISTORY_JOB_STATUSES,
  JOB_TYPES,
  PLACE_TYPES,
  POLL_QUOTES_INTERVAL,
  SCHEDULED_JOB_STATUSES,
  TRANSPORT_TYPES
} from '../constants';

const emptyFunction = () => {};

export const CLIENT_REQUEST = 'CLIENT_REQUEST';
export const CLIENT_SUCCESS = 'CLIENT_SUCCESS';
export const CLIENT_FAILURE = 'CLIENT_FAILURE';

function auth(action, data) {
  return (dispatch, getState) => {
    const { locale } = getState();

    dispatch({ type: CLIENT_REQUEST, action });

    if (locale && action === 'signUp') {
      data = { ...data, locale };
    }

    const promise = authUtils[action](data).then((client) => {
      dispatch({ type: CLIENT_SUCCESS, client, action });

      browserHistory.push({
        pathname: '/'
      });

      analytics.identifyClient(client);
    });

    promise.catch((error) => {
      dispatch({ type: CLIENT_FAILURE, error, action });
    });

    return promise;
  };
}

export const signUp = auth.bind(null, 'signUp');
export const logIn = auth.bind(null, 'logIn');

export function passwordReset({ email }) {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    return apiClient.post('v1/clients/passwords/forgot', { email });
  };
}

export function logOut() {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { token }
    } = getState();

    analytics.track('Logged out', {
      category: analytics.NAVIGATION_CATEGORY
    });

    return apiClient.post('/oauth/revoke', { token }).then(() => {
      analytics.reset();

      document.location = '/';
    });
  };
}

function createUpdateClient([requestType, successType, failureType]) {
  return (value) => {
    return (dispatch, getState) => {
      const {
        apiClient,
        client: { id }
      } = getState();

      dispatch({ type: requestType });

      return apiClient.patch(`v1/clients/${id}`, value).then(({ body: client }) => {
        dispatch({ type: successType, client });
      }).catch((error) => {
        dispatch({ type: failureType, error });
      });
    };
  };
}

export const UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT_REQUEST';
export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_FAILURE = 'UPDATE_CLIENT_FAILURE';

export const updateClient = createUpdateClient([
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE
]);

export const CLIENT_GENERAL_VALUE_CHANGE = 'CLIENT_GENERAL_VALUE_CHANGE';

export function setClientGeneralValue(value) {
  return {
    type: CLIENT_GENERAL_VALUE_CHANGE,
    value
  };
}

export const UPDATE_CLIENT_PASSWORD_REQUEST = 'UPDATE_CLIENT_PASSWORD_REQUEST';
export const UPDATE_CLIENT_PASSWORD_SUCCESS = 'UPDATE_CLIENT_PASSWORD_SUCCESS';
export const UPDATE_CLIENT_PASSWORD_FAILURE = 'UPDATE_CLIENT_PASSWORD_FAILURE';

export const CLIENT_PASSWORD_VALUE_CHANGE = 'CLIENT_PASSWORD_VALUE_CHANGE';

export function setClientPasswordValue(value) {
  return {
    type: CLIENT_PASSWORD_VALUE_CHANGE,
    value
  };
}

export const updateClientPassword = createUpdateClient([
  UPDATE_CLIENT_PASSWORD_REQUEST,
  UPDATE_CLIENT_PASSWORD_SUCCESS,
  UPDATE_CLIENT_PASSWORD_FAILURE
]);

export const CLOSEST_CITY_SUCCESS = 'CLOSEST_CITY_SUCCESS';

export function fetchClosestCity() {
  return (dispatch, getState) => {
    const { closestCity } = getState();

    if (closestCity) { return; }

    return getPosition().then((position) => {
      dispatch({
        type: CLOSEST_CITY_SUCCESS,
        city: getClosestCity(position)
      });
    });
  };
}

export const ACTIVE_JOBS_REQUEST = 'ACTIVE_JOBS_REQUEST';
export const ACTIVE_JOBS_SUCCESS = 'ACTIVE_JOBS_SUCCESS';
export const ACTIVE_JOBS_FAILURE = 'ACTIVE_JOBS_FAILURE';

export const loadActiveJobs = loadJobs.bind(null, 'active');

export const JOBS_HISTORY_REQUEST = 'JOBS_HISTORY_REQUEST';
export const JOBS_HISTORY_SUCCESS = 'JOBS_HISTORY_SUCCESS';
export const JOBS_HISTORY_FAILURE = 'JOBS_HISTORY_FAILURE';

export const loadJobsHistory = loadJobs.bind(null, 'history');

export const SCHEDULED_JOBS_REQUEST = 'SCHEDULED_JOBS_REQUEST';
export const SCHEDULED_JOBS_SUCCESS = 'SCHEDULED_JOBS_SUCCESS';
export const SCHEDULED_JOBS_FAILURE = 'SCHEDULED_JOBS_FAILURE';

export const loadScheduledJobs = loadJobs.bind(null, 'scheduled');

const SCOPES = {
  active: {
    parameters: { status: ACTIVE_JOB_STATUSES.join(',') },
    types: [ACTIVE_JOBS_REQUEST, ACTIVE_JOBS_SUCCESS, ACTIVE_JOBS_FAILURE]
  },
  history: {
    parameters: { status: HISTORY_JOB_STATUSES.join(',') },
    types: [JOBS_HISTORY_REQUEST, JOBS_HISTORY_SUCCESS, JOBS_HISTORY_FAILURE]
  },
  scheduled: {
    parameters: {
      status: SCHEDULED_JOB_STATUSES.join(','),
      sortBy: 'pickup_at asc',
      per_page: 100
    },
    types: [SCHEDULED_JOBS_REQUEST, SCHEDULED_JOBS_SUCCESS, SCHEDULED_JOBS_FAILURE]
  }
};

function getNextPageUrl(response) {
  const header = response.header['link'];
  if (header == null) { return; }

  const links = header.split(',').reduce((m, l) => {
    const parts = l.split(';');
    const url = parts[0].replace(/<(.*)>/, '$1').trim();
    const rel = parts[1].replace(/rel="(.*)"/, '$1').trim();

    m[rel] = url;

    return m;
  }, {});

  return links.next;
}

function getIntHeader(response, headerName) {
  const header = response.header[headerName];
  if (header == null) { return; }

  return parseInt(header, 10);
}

function fetchJobs(scopeName, nextPageUrl) {
  const { parameters, types } = SCOPES[scopeName];
  const [requestType, successType, failureType] = types;

  return (dispatch, getState) => {
    const { apiClient } = getState();

    dispatch({ type: requestType });
    const promise = apiClient.get(nextPageUrl, parameters).then(({ body, response }) => {
      return dispatch({
        type: successType,
        jobs: keyBy(body, 'id'),
        nextPageUrl: getNextPageUrl(response),
        page: getIntHeader(response, 'x-page'),
        total: getIntHeader(response, 'x-total')
      });
    });

    promise.catch((error) => {
      return dispatch({ type: failureType, error });
    });

    return promise;
  };
}

function loadJobs(scopeName, nextPage) {
  return (dispatch, getState) => {
    const state = getState();

    const { page, nextPageUrl } = state.pagination[scopeName];

    // Bails out if page is cached and user didn’t specifically request next page.
    if (page > 0 && !nextPage) { return null; }

    return dispatch(fetchJobs(scopeName, nextPageUrl || `v1/clients/${state.client.id}/jobs`));
  };
}

export const JOB_REQUEST = 'JOB_REQUEST';
export const JOB_SUCCESS = 'JOB_SUCCESS';
export const JOB_FAILURE = 'JOB_FAILURE';

export function fetchJob(jobId) {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    dispatch({ type: JOB_REQUEST });

    const promise = apiClient.get(`v1/jobs/${jobId}`).then(({ body: job }) => {
      dispatch({
        type: JOB_SUCCESS,
        jobs: { [job.id]: job }
      });
    });

    promise.catch((error) => {
      dispatch({ type: JOB_FAILURE, error });
    });

    return promise;
  };
}

export const CLIENT_EXTRA_SUCCESS = 'CLIENT_EXTRA_SUCCESS';

function getAddress(place) {
  const {
    id,
    address: {
      street,
      postcode
    }
  } = place;

  return {
    id,
    description: street || postcode,
    place
  };
}

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
      client: { id }
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
          recentDropOffAddresses
        },
        creditCards: keyBy(creditCards, 'id')
      });
    });
  };
}

export const CLIENT_SETTINGS_REQUEST = 'CLIENT_SETTINGS_REQUEST';
export const CLIENT_SETTINGS_SUCCESS = 'CLIENT_SETTINGS_SUCCESS';
export const CLIENT_SETTINGS_FAILURE = 'CLIENT_SETTINGS_FAILURE';

function fetchClientSettings() {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    dispatch({ type: CLIENT_SETTINGS_REQUEST });

    const promise = apiClient.get('v1/clients/settings').then(({ body: settings }) => {
      return dispatch({ type: CLIENT_SETTINGS_SUCCESS, settings });
    });

    promise.catch((error) => {
      return dispatch({ type: CLIENT_SETTINGS_FAILURE, error });
    });

    return promise;
  };
}

export function loadClientSettings() {
  return (dispatch, getState) => {
    const { settings } = getState().clientSettings;

    if (!settings) {
      dispatch(fetchClientSettings());
    }
  };
}

export const CLOSEST_DRIVERS_REQUEST = 'CLOSEST_DRIVERS_REQUEST';
export const CLOSEST_DRIVERS_SUCCESS = 'CLOSEST_DRIVERS_SUCCESS';
export const CLOSEST_DRIVERS_FAILURE = 'CLOSEST_DRIVERS_FAILURE';

export function fetchClosestDrivers(position) {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    const { longitude, latitude } = position;

    if (longitude == null || latitude == null) { return Promise.resolve(); }

    dispatch({ type: CLOSEST_DRIVERS_REQUEST });
    const promise = apiClient.get('v1/transport/type/closest/drivers', {
      longitude,
      latitude
    }).then(({ body, response }) => {
      const drivers = keyBy(reduce(body, (m, v) => m.concat(v), []), 'id');
      return dispatch({
        type: CLOSEST_DRIVERS_SUCCESS,
        uniqueId: response.header['x-request-id'],
        drivers
      });
    });

    promise.catch((error) => {
      return dispatch({ type: CLOSEST_DRIVERS_FAILURE, error });
    });

    return promise;
  };
}

export function getAddresses(position, input) {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    input = input.trim();
    return apiClient.get('v1/directions/autocomplete', {
      ...position,
      input
    }).then(({ body: addresses }) => addresses);
  };
}

export const RESET_NEW_JOB = 'RESET_NEW_JOB';

function getPlaceValue(place) {
  return {
    address: getAddress(place),
    contactCompany: place.contactCompany,
    contactFirstname: place.contactFirstname,
    contactLastname: place.contactLastname,
    contactPhone: place.contactPhone,
    contactEmail: place.contactEmail,
    comment: place.comment
  };
}

function resetNewJobWithLocaleStorage() {
  const value = {
    pickUp: {},
    dropOff: {}
  };
  const places = {};

  const defaultPlace = storage.get(DEFAULT_PLACE_STORAGE_KEY);
  if (defaultPlace) {
    value.pickUp = getPlaceValue(defaultPlace);
    places.pickUpPlace = defaultPlace;
  }

  return { type: RESET_NEW_JOB, value, places };
}

function resetNewJobWithJob(jobId) {
  return (dispatch, getState) => {
    const { apiClient } = getState();

    return apiClient.get(`v1/jobs/${jobId}`).then(({ body: job }) => {
      const {
        originPlace: pickUpPlace,
        destinationPlace: dropOffPlace,
        currentDelivery: d
      } = job;

      const value = {
        pickUp: getPlaceValue(pickUpPlace),
        dropOff: getPlaceValue(dropOffPlace),
        transportType: d && d.transportType.code
      };

      const places = {
        pickUpPlace,
        dropOffPlace
      };

      dispatch({ type: RESET_NEW_JOB, value, places });

      return dispatch(fetchNewJobQuotes());
    }).catch(emptyFunction);
  };
}

export function resetNewJob(jobId) {
  return (dispatch) => {
    if (jobId) {
      return dispatch(resetNewJobWithJob(jobId));
    } else {
      return dispatch(resetNewJobWithLocaleStorage());
    }
  };
}

export const SCHEDULING_SUCCESS = 'SCHEDULING_SUCCESS';

export function loadSchedulingDays(city) {
  return (dispatch, getState) => {
    if (!city) { return; }

    const { apiClient } = getState();

    // Retrieve slots for the next five days and format them as a tree.
    const now = new Date();
    const promises = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setUTCDate(now.getUTCDate() + i);

      const [dayKey] = date.toISOString().split('T');
      const promise = apiClient.get(`v1/jobs/schedules/${city}/${dayKey}`).then(({ body }) => {
        const slotKeys = [];
        const slotsByKey = {};
        body.slots.forEach(({ startTime, endTime }) => {
          const slotKey = `${startTime.split(/[T\.]/)[1]}-${endTime.split(/[T\.]/)[1]}`;
          slotKeys.push(slotKey);
          slotsByKey[slotKey] = {
            startTime,
            endTime,
            key: slotKey,
            dayKey
          };
        });

        return {
          key: dayKey,
          date: body.date,
          slotKeys,
          slotsByKey
        };
      });

      promises.push(promise);
    }

    Promise.all(promises).then((days) => {
      const dayKeys = [];
      const daysByKey = {};
      days.forEach((day) => {
        if (day) {
          dayKeys.push(day.key);
          daysByKey[day.key] = day;
        }
      });

      dispatch({
        type: SCHEDULING_SUCCESS,
        scheduling: {
          dayKeys,
          daysByKey
        }
      });
    });
  };
}

export const NEW_JOB_VALUE_CHANGE = 'NEW_JOB_VALUE_CHANGE';

export function updateNewJob(value) {
  return (dispatch, getState) => {
    const { value: previousValue } = getState().newJob;

    dispatch({ type: NEW_JOB_VALUE_CHANGE, value });

    const { pickUp, dropOff } = value;

    const pickUpChanged = pickUp !== previousValue.pickUp;
    const dropOffChanged = dropOff !== previousValue.dropOff;

    // Bails out if places have not changed.
    if (!pickUpChanged && !dropOffChanged) { return; }

    if (pickUp.address == null && dropOff.address == null) { return; }

    const pickUpAddressChanged = pickUp.address !== previousValue.pickUp.address;
    const dropOffAddressChanged = dropOff.address !== previousValue.dropOff.address;

    const promises = [];
    if (pickUpChanged) {
      promises.push(dispatch(fetchNewJobPlace('pickUp', pickUpAddressChanged)));
    }
    if (dropOffChanged) {
      promises.push(dispatch(fetchNewJobPlace('dropOff', dropOffAddressChanged)));
    }

    return Promise.all(promises).then(() => {
      return dispatch(fetchNewJobQuotes());
    }).then(() => {
      const {
        quotes: {
          bike: bikeQuote
        },
        value: currentValue
      } = getState().newJob;
      const { transportType: t } = currentValue;

      // We want to promote bike, so we pre-select it.
      if (!t && bikeQuote && !bikeQuote.errors) {
        dispatch({
          type: NEW_JOB_VALUE_CHANGE,
          value: {
            ...currentValue,
            transportType: 'bike'
          }
        });
      }
    });
  };
}

export const NEW_JOB_PLACE_REQUEST = 'NEW_JOB_PLACE_REQUEST';
export const NEW_JOB_PLACE_SUCCESS = 'NEW_JOB_PLACE_SUCCESS';
export const NEW_JOB_PLACE_FAILURE = 'NEW_JOB_PLACE_FAILURE';

function getErrorKey(error) {
  let errorKey;
  try {
    errorKey = error.response.body.errors[0].key;
  } catch (e) {
    errorKey = error.message || 'UNKNOW';
  }

  return errorKey;
}

function fetchNewJobPlace(placeType, addressHasChanged) {
  return (dispatch, getState) => {
    function getPlaceData() {
      return getState().newJob.value[placeType];
    }

    const placeData = getPlaceData();
    const {
      apiClient,
      newJob: { places }
    } = getState();

    const { address, ...contactInformations } = placeData;

    // Bails out when address is not set since we cannot create a place without
    // an address.
    if (!address) { return Promise.resolve(); }

    let promise;
    let from;
    const currentPlace = places[`${placeType}Place`];
    if (!currentPlace || addressHasChanged) {
      // If there is no place created yet or if the address has changed, created
      // a new place.

      // We do not want to use phone and comment from the previous place. We
      // only want to send those fields when the user filled them before
      // selecting an addresses.
      const shouldClearPlaceValue = !!currentPlace;

      dispatch({ type: NEW_JOB_PLACE_REQUEST, placeType, shouldClearPlaceValue });

      if (address.place) {
        // Address from recent addresses.
        promise = Promise.resolve(address.place);
        from = 'recentAddresses';
      } else {
        // Address from autocomplete.
        let params = {
          placeTypeId: PLACE_TYPES[placeType],
          geoPlaceId: address.id
        };
        if (!shouldClearPlaceValue) {
          params = {
            ...params,
            ...contactInformations
          };
        }

        promise = apiClient.post('v1/places', params).then(r => r.body);
        from = 'autocomplete';
      }
    } else {
      // Otherwise, update the current place.
      promise = apiClient.put(`v1/places/${currentPlace.id}`, contactInformations).then(r => r.body);
      from = 'update';
    }

    return promise.then((place) => {
      // Bails out if the address has changed while fetching the place.
      if (getPlaceData().address !== placeData.address) { return; }

      dispatch({
        type: NEW_JOB_PLACE_SUCCESS,
        shouldFillPlaceValue: from === 'recentAddresses',
        place,
        placeType
      });

      if (from !== 'update' && placeType === 'pickUp') {
        dispatch(fetchClosestDrivers(place.address));
      }
    }).catch((error) => {
      const currentPlaceData = getPlaceData();

      // Bails out if the address has changed while fetching the place.
      if (currentPlaceData.address !== placeData.address) { return; }

      dispatch({ type: NEW_JOB_PLACE_FAILURE, placeType, error });

      analytics.track('Got address error', {
        errorKey: getErrorKey(error),
        from,
        address: currentPlaceData.address.description,
        addressId: currentPlaceData.address.id,
        phone: currentPlaceData.contactPhone,
        company: currentPlaceData.contactCompany,
        firstname: currentPlaceData.contactFirstname,
        lastname: currentPlaceData.contactLastname,
        email: currentPlaceData.contactEmail,
        comment: currentPlaceData.comment,
        addressFor: placeType,
        category: analytics.ERRORS_CATEGORY
      });
    });
  };
}

export const NEW_JOB_QUOTES_REQUEST = 'NEW_JOB_QUOTES_REQUEST';
export const NEW_JOB_QUOTES_SUCCESS = 'NEW_JOB_QUOTES_SUCCESS';
export const NEW_JOB_QUOTES_FAILURE = 'NEW_JOB_QUOTES_FAILURE';

export function fetchNewJobQuotes() {
  return (dispatch, getState) => {
    function getPlaces() {
      const { pickUpPlace, dropOffPlace } = getState().newJob.places;
      const hash = [pickUpPlace, dropOffPlace].map(p => p ? p.id : '').join('-');

      return { pickUpPlace, dropOffPlace, hash };
    }

    const { pickUpPlace, dropOffPlace, hash } = getPlaces();
    const {
      apiClient,
      newJob: {
        quotes: {
          fetchedAtTime,
          hash: currentHash
        }
      },
      closestDrivers: {
        uniqueId: closestDriversUniqueId
      }
    } = getState();

    // Bails out because if pick up or drop off places are not set. We need
    // both places to create quote.
    if (pickUpPlace == null || dropOffPlace == null) { return Promise.resolve(); }

    const placesHaveChanged = hash !== currentHash;
    if (placesHaveChanged) {
      dispatch({ type: NEW_JOB_QUOTES_REQUEST });
    } else if (Date.now() - fetchedAtTime < POLL_QUOTES_INTERVAL) {
      // Bails out if quotes have been fetched recently to prevent to make to
      // much requests to the quotes endpoint.
      return Promise.resolve();
    }

    const { transportTypes } = CITIES[pickUpPlace.address.city.code];
    const promise = apiClient.post('v1/jobs/quotes/types', {
      closestDriversUniqueId,
      originPlaceId: pickUpPlace.id,
      destinationPlaceId: dropOffPlace.id,
      jobTypeId: JOB_TYPES.transport,
      transportTypeIds: transportTypes.map((t) => TRANSPORT_TYPES[t]).join(',')
    }).then(({ body }) => {
      // Bails out if the places have changed while fetching the quotes.
      if (getPlaces().hash !== hash) { return; }

      const quotes = reduce(TRANSPORT_TYPES, (m, v, k) => {
        const quote = body[v.toString()];
        if (quote) { m[k] = quote; }
        return m;
      }, {});

      dispatch({
        type: NEW_JOB_QUOTES_SUCCESS,
        fetchedAtTime: Date.now(),
        quotes,
        hash
      });
    });

    promise.catch((error) => {
      if (getPlaces().hash !== hash) { return; }
      return dispatch({ type: NEW_JOB_QUOTES_FAILURE, error });
    });

    return promise;
  };
}

export const CREATE_NEW_JOB_REQUEST = 'CREATE_NEW_JOB_REQUEST';
export const CREATE_NEW_JOB_SUCCESS = 'CREATE_NEW_JOB_SUCCESS';
export const CREATE_NEW_JOB_FAILURE = 'CREATE_NEW_JOB_FAILURE';

export function createNewJob() {
  return (dispatch, getState) => {
    const {
      apiClient,
      newJob: {
        value: {
          transportType,
          clientInvoiceReference,
          scheduling: {
            when,
            slot: { dayKey, slotKey }
          }
        },
        places: { pickUpPlace, dropOffPlace },
        quotes,
        scheduling: { daysByKey }
      }
    } = getState();

    dispatch({ type: CREATE_NEW_JOB_REQUEST });

    const params = {
      source: 'dashboard',
      jobQuoteId: quotes[transportType].id,
      originComment: pickUpPlace.comment,
      destinationComment: dropOffPlace.comment,
      clientInvoiceReference
    };
    const isScheduled = when === 'later';
    if (isScheduled) {
      params.pickupAt = daysByKey[dayKey].slotsByKey[slotKey].startTime;
    }
    const promise = apiClient.post('v1/jobs', params).then(({ body: job }) => {
      dispatch({
        type: CREATE_NEW_JOB_SUCCESS,
        jobs: { [job.id]: job }
      });

      browserHistory.push({
        pathname: isScheduled ? '/scheduled' : '/active',
        query: { job: job.id }
      });

      storage.set(DEFAULT_PLACE_STORAGE_KEY, job.originPlace);
      dispatch(fetchClientExtra());

      const {
        finalJobPrice: { finalTotalAmount, currency }
      } = job;
      analytics.track('Requested a delivery', {
        category: analytics.DELIVERY_REQUEST_FLOW_CATEGORY,
        vehicule: transportType,
        revenue: finalTotalAmount,
        currency: currency.isoCode,
        hasPickUpPhone: !!pickUpPlace.contactPhone,
        hasDropOffPhone: !!dropOffPlace.contactPhone,
        hasPickUpCompany: !!pickUpPlace.contactCompany,
        hasDropOffCompany: !!dropOffPlace.contactCompany,
        hasPickUpFirstname: !!pickUpPlace.contactFirstname,
        hasDropOffFirstname: !!dropOffPlace.contactFirstname,
        hasPickUpLastname: !!pickUpPlace.contactLastname,
        hasDropOffLastname: !!dropOffPlace.contactLastname,
        hasPickUpEmail: !!pickUpPlace.contactEmail,
        hasDropOffEmail: !!dropOffPlace.contactEmail,
        hasPickUpComment: !!pickUpPlace.comment,
        hasDropOffComment: !!dropOffPlace.comment
      });
    });

    promise.catch((error) => {
      return dispatch({ type: CREATE_NEW_JOB_FAILURE, error });
    });

    return promise;
  };
}

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';

export function updateJob(jobId, changes) {
  return (dispatch, getState) => {
    const {
      apiClient,
      jobs: { jobsById }
    } = getState();
    const job = jobsById[jobId];

    dispatch({ type: UPDATE_JOB_REQUEST });

    // Update job because updating placed does not trigger notifications.
    // https://github.com/StuartApp/stuart-api/issues/1569
    const jobPromise = apiClient.patch(`v1/jobs/${job.id}`, {
      originComment: changes.originComment,
      destinationComment: changes.destinationComment
    });
    const originPromise = apiClient.put(`v1/places/${job.originPlace.id}`, {
      comment: changes.originComment
    });
    const destinationPromise = apiClient.put(`v1/places/${job.destinationPlace.id}`, {
      comment: changes.destinationComment
    });

    const promise = Promise.all([
      jobPromise,
      originPromise,
      destinationPromise
    ]).then(([jobR, originR, destinationR]) => {
      dispatch({
        type: UPDATE_JOB_SUCCESS,
        jobs: {
          [job.id]: {
            ...jobR.body,
            originPlace: originR.body,
            destinationPlace: destinationR.body
          }
        }
      });
    });

    promise.catch((error) => {
      dispatch({ type: UPDATE_JOB_FAILURE, error });
    });

    return promise;
  };
}

export const CANCEL_JOB_REQUEST = 'CANCEL_JOB_REQUEST';
export const CANCEL_JOB_SUCCESS = 'CANCEL_JOB_SUCCESS';
export const CANCEL_JOB_FAILURE = 'CANCEL_JOB_FAILURE';

export function fetchJobCancellationFee(jobId) {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { id }
    } = getState();

    return apiClient.get(`v1/clients/${id}/jobs/${jobId}/currentcancellationfee`).then((r) => {
      return r.body;
    });
  };
}

export function cancelJob(jobId) {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { id },
      jobs: { jobsById }
    } = getState();
    const job = jobsById[jobId];

    if (!job) { return; }

    dispatch({ type: CANCEL_JOB_REQUEST });

    const promise = apiClient.post(`v1/clients/${id}/jobs/${jobId}/cancel`).then(() => {
      const deliveryStatus = (job.currentDelivery || {}).status;
      analytics.track('Cancelled a delivery', {
        id: job.id,
        status: job.status,
        deliveryStatus
      });

      // Fetch the job because the cancel response does not contain a job.
      return apiClient.get(`v1/jobs/${jobId}`);
    }).then(({ body: job }) => {
      dispatch({
        type: CANCEL_JOB_SUCCESS,
        jobs: { [job.id]: job }
      });
    });

    promise.catch((error) => {
      dispatch({ type: CANCEL_JOB_FAILURE, error });
    });

    return promise;
  };
}

export const DISMISS_JOB = 'DISMISS_JOB';

function trackExpiredJob(job, eventName) {
  const { createdAt: expiredAt } = job.lastStatus;

  analytics.track(eventName, {
    expiredSince: (Date.now() - Date.parse(expiredAt)) / 1000,
    category: analytics.ONGOING_DELIVERIES_CATEGORY
  });
}

export function dismissJob(job) {
  const { id: jobId } = job;

  trackExpiredJob(job, 'Dismissed an expired delivery request');

  return {
    type: DISMISS_JOB,
    jobs: {
      [jobId]: null
    }
  };
}

export function retryJob(job) {
  const { id: jobId } = job;

  trackExpiredJob(job, 'Retried an expired delivery request');

  return {
    type: DISMISS_JOB,
    jobs: {
      [jobId]: null
    }
  };
}

export const CREATE_CREDIT_CARD_REQUEST = 'CREATE_CREDIT_CARD_REQUEST';
export const CREATE_CREDIT_CARD_SUCCESS = 'CREATE_CREDIT_CARD_SUCCESS';
export const CREATE_CREDIT_CARD_FAILURE = 'CREATE_CREDIT_CARD_FAILURE';

export function createCreditCard(creditCard) {
  return (dispatch, getState) => {
    const {
      cardName,
      cardNumber,
      cardCode,
      cardDate
    } = creditCard;

    const {
      apiClient,
      client: { id }
    } = getState();

    dispatch({ type: CREATE_CREDIT_CARD_REQUEST });

    const promise = apiClient.get(`v1/clients/${id}/creditcards/token`).then(({ body }) => {
      return getNonce(body.token, cardCode, cardDate, cardNumber);
    }).then((nonce) => {
      return apiClient.post('v1/creditcards', { nonce, name: cardName }).then(r => r.body);
    }).then((creditCard) => {
      dispatch({
        type: CREATE_CREDIT_CARD_SUCCESS,
        creditCards: {
          [creditCard.id]: creditCard
        }
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
      client: { id }
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
      apiClient
    } = getState();

    dispatch({ type: DEFAULT_CREDIT_CARD_REQUEST });

    const promise = apiClient.patch(`v1/creditcards/${cardId}`, {
      default: true
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
      apiClient
    } = getState();

    dispatch({ type: REDEEM_COUPON_REQUEST });

    const promise = apiClient.post('/v1/coupons/load', {
      code
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
      client: { id }
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
    billingAccount: value
  };
}

export const UPDATE_BILLING_DETAILS_REQUEST = 'UPDATE_BILLING_DETAILS_REQUEST';
export const UPDATE_BILLING_DETAILS_SUCCESS = 'UPDATE_BILLING_DETAILS_SUCCESS';
export const UPDATE_BILLING_DETAILS_FAILURE = 'UPDATE_BILLING_DETAILS_FAILURE';

export function updateBillingDetails(value) {
  return (dispatch, getState) => {
    const {
      apiClient,
      client: { id }
    } = getState();

    dispatch({ type: UPDATE_BILLING_DETAILS_REQUEST });

    const promise = apiClient.patch(`v1/clients/${id}`, {
      billing_account: value
    }).then(({ body: client }) => {
      dispatch({ type: UPDATE_BILLING_DETAILS_SUCCESS, billingAccount: client.billingAccount });
    });

    promise.catch((error) => {
      dispatch({ type: UPDATE_BILLING_DETAILS_FAILURE, error });
    });

    return promise;
  };
}
