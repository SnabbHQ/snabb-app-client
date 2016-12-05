import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import some from 'lodash/some';
import filter from 'lodash/filter';
import size from 'lodash/size';
import get from 'lodash/get';
import {
  createNewJob,
  fetchClosestDrivers,
  fetchNewJobQuotes,
  getAddresses,
  loadSchedulingDays,
  resetNewJob,
  updateNewJob
} from '../../../common/job/actions';
import createPoller from '../../../common/lib/createPoller';
import JobFields from '../components/JobFields/index';
import MarkersMap from '../components/MarkersMap';
import Button from '../../app/components/Button2/index';
import Blankslate from '../../app/components/Blankslate/index';
import LoadingMessage from '../../app/components/LoadingMessage/index';
import {
  CITIES,
  DEFAULT_CITY,
  POLL_DRIVERS_INTERVAL,
  POLL_QUOTES_INTERVAL
} from '../../../common/lib/constants';
import layoutStyles from '../../app/styles/layout.scss';
import styles from './NewJobPage.scss';

const NewJobPage = React.createClass({
  componentWillMount() {
    // Use the place stored in locale storage if we were not able to fetch one
    // on the server.
    if (this.props.places.pickUpPlace == null) {
      this.props.resetNewJob();
    }
  },

  componentDidMount() {
    this._driversPoller = createPoller(this.fetchClosestDrivers, {
      interval: POLL_DRIVERS_INTERVAL
    });
    this._quotesPoller = createPoller(this.props.fetchNewJobQuotes, {
      interval: POLL_QUOTES_INTERVAL
    });

    this.props.loadSchedulingDays(this.props.currentCity);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.currentCity !== nextProps.currentCity) {
      this.props.loadSchedulingDays(nextProps.currentCity);
    }
  },

  componentWillUnmount() {
    this._driversPoller.stop();
    this._quotesPoller.stop();
  },

  fetchClosestDrivers() {
    const { pickUpPlace } = this.props.places;

    if (pickUpPlace == null) { return Promise.resolve(); }

    return this.props.fetchClosestDrivers(pickUpPlace.address);
  },

  handleSubmit(e) {
    e.preventDefault();

    this.props.createNewJob();
  },

  renderCreditCardsBlankSlate() {
    return (
      <div className={[layoutStyles.content, layoutStyles.centered].join(' ')}>
        <Blankslate
          title={
            <FormattedMessage
              id='newJobPage.noCreditCardsTitle'
              defaultMessage='No credit cards' />
          }
          subtitle={
            <FormattedMessage
              id='newJobPage.noCreditCardsSubtitle'
              defaultMessage='Please add a credit card to request deliveries' />
          }
          actions={
            <Button id='noCreditCardButton' to='settings/billing' kind='primary'>
              <FormattedMessage
                id='newJobPage.noCreditCardButton'
                defaultMessage='Add a credit card' />
            </Button>
          } />
      </div>
    );
  },

  renderRequestButton() {
    const {
      errors,
      isCreating,
      selectedQuote
    } = this.props;

    let buttonLabel;
    if (selectedQuote) {
      buttonLabel = (
        <FormattedMessage
          id='newJobPage.requestButton'
          defaultMessage='Request for {price}'
          values={{
            price: (
              <strong>
                <FormattedNumber
                  value={selectedQuote.finalTotalAmount}
                  style='currency'
                  currency={selectedQuote.currency.isoCode} />
              </strong>
            )
          }}/>
      );
    } else {
      buttonLabel = (
        <FormattedMessage
          id='newJobPage.requestButtonDisabled'
          defaultMessage='Request' />
      );
    }

    const isDisabled = !!(errors.pickUp || errors.dropOff || !selectedQuote || isCreating);

    return (
      <Button
        type='submit'
        kind='primary'
        id='requestButton'
        disabled={isDisabled}
      >
        {buttonLabel}
      </Button>
    );
  },

  render() {
    const {
      isLoading,
      showCreditCardBlankSlate
    } = this.props;

    if (isLoading) {
      return (
        <LoadingMessage
          className={[layoutStyles.content, layoutStyles.centered].join(' ')} />
      );
    }

    if (showCreditCardBlankSlate) {
      return this.renderCreditCardsBlankSlate();
    }

    return (
      <div>
        <div className={layoutStyles.left}>
          <div className={layoutStyles.content}>
            <div className={styles.form}>
              <form onSubmit={this.handleSubmit}>
                <JobFields
                  {...this.props.places}
                  onChange={this.props.updateNewJob}
                  quotes={this.props.quotes}
                  closestDriverByType={this.props.closestDriverByType}
                  transportTypes={this.props.transportTypes}
                  recentDropOffAddresses={this.props.recentDropOffAddresses}
                  getDropOffAddresses={this.props.getAddresses.bind(null, this.props.pickUpPosition)}
                  recentPickUpAddresses={this.props.recentPickUpAddresses}
                  getPickUpAddresses={this.props.getAddresses.bind(null, this.props.closestCityCenter)}
                  value={this.props.value}
                  dayKeys={this.props.dayKeys}
                  daysByKey={this.props.daysByKey}
                  showAssignmentCode={this.props.showAssignmentCode}
                  errors={this.props.errors} />

                <div className={styles.bar}>
                  <div className={styles.barContent}>
                    {this.renderRequestButton()}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={layoutStyles.right}>
          <div className={layoutStyles.fillContent}>
            <MarkersMap
              center={this.props.closestCityCenter}
              places={filter(this.props.places)}
              drivers={this.props.drivers}
              fitToDrivers={false} />
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const {
    client: {
      recentDropOffAddresses,
      recentPickUpAddresses,
      isExtraLoaded,
      clientAccount: {
        type: clientType
      }
    },
    clientSettings: { settings },
    newJob: {
      isCreating,
      value,
      errors,
      places,
      quotes,
      scheduling: { dayKeys, daysByKey }
    },
    closestDrivers: {
      closestDriverByType,
      driversById: drivers
    }
  } = state;

  let pickUpPosition = {};
  let currentCity;
  if (places.pickUpPlace) {
    const {
      longitude,
      latitude,
      zone: { code }
    } = places.pickUpPlace.address;

    pickUpPosition = { longitude, latitude };
    currentCity = code;
  }
  currentCity = currentCity || state.closestCity;

  const city = CITIES[currentCity || DEFAULT_CITY];
  const transportTypes = city.transportTypes;
  const closestCityCenter = city.center;

  const hasCreditCards = size(state.creditCards) > 0;
  const hasCredits = some(state.wallets, w => w.amount > 0);
  const canCreateJob = clientType === 'corporate' || hasCreditCards || hasCredits;

  const q = quotes[value.transportType];
  const selectedQuote = q && !q.errors && q;

  const showAssignmentCode = !!get(settings, 'jobs.assignmentCode');

  return {
    showCreditCardBlankSlate: !canCreateJob,
    isLoading: !isExtraLoaded,
    recentDropOffAddresses,
    recentPickUpAddresses,
    isCreating,
    value,
    errors,
    places,
    quotes,
    currentCity,
    closestCityCenter,
    pickUpPosition,
    transportTypes,
    selectedQuote,
    drivers,
    closestDriverByType,
    dayKeys,
    daysByKey,
    showAssignmentCode
  };
}

const hooks = {
  load({ dispatch, location }) {
    return dispatch(resetNewJob(location.query.job));
  }
};

export default provideHooks(hooks)(connect(mapStateToProps, {
  createNewJob,
  fetchClosestDrivers,
  fetchNewJobQuotes,
  getAddresses,
  loadSchedulingDays,
  resetNewJob,
  updateNewJob
})(NewJobPage));
