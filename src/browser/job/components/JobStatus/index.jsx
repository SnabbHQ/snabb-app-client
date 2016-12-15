import React, { PropTypes } from 'react';
import {
  defineMessages,
  FormattedRelative,
  FormattedMessage,
  FormattedDate
} from 'react-intl';
import ProgressBar, { ProgressBarSearching } from '../../../app/components-old/ProgressBar/index';
import { isPicking, isDelivering } from '../../../../common/lib/deliveryHelpers';
import styles from './JobStatus.scss';

const I18N = defineMessages({
  pickUpStatus: {
    id: 'jobStatus.pickUpStatus',
    defaultMessage: 'Pick up {time}'
  },
  dropOffStatus: {
    id: 'jobStatus.dropOffStatus',
    defaultMessage: 'Drop off {time}'
  }
});

const JobStatus = React.createClass({
  propTypes: {
    job: PropTypes.object.isRequired
  },

  renderNew() {
    return (
      <div>
        <div className={styles.defaultMessage} id="progressBarSearchingMsg">
          <FormattedMessage
            id='jobStatus.searching'
            defaultMessage='Looking for a courier...'
            tagName='strong' />
        </div>
        <ProgressBarSearching />
      </div>
    );
  },

  renderInProgress() {
    const { currentDelivery: delivery } = this.props.job;

    let containerClassName;
    let eta;
    let messageKey;
    let type;
    if (isPicking(delivery)) {
      containerClassName = styles.statusPicking;
      eta = delivery.etaToOrigin;
      messageKey = 'pickUpStatus';
      type = 'picking';
    } else if (isDelivering(delivery)) {
      containerClassName = styles.statusDelivering;
      eta = delivery.etaToDestination;
      messageKey = 'dropOffStatus';
      type = 'delivering';
    } else {
      return;
    }

    const now = new Date();
    const dateCreatedAt = new Date(delivery.createdAt);
    const dateEta = new Date(eta);

    if (!dateEta) {
      return <FormattedMessage id='jobStatus.wait' defaultMessage='Please wait...' />;
    }

    let timeMessage;
    if (dateEta - now < 0) {
      timeMessage = <FormattedMessage id='jobStatus.now' defaultMessage='now' />;
    } else {
      timeMessage = <FormattedRelative value={dateEta} />;
    }

    const current = now - dateCreatedAt;
    const max = dateEta - dateCreatedAt;

    return (
      <div className={containerClassName}>
        <div className={styles.etaMessage}>
          <FormattedMessage
            {...I18N[messageKey]}
            values={{ time: timeMessage }} />
        </div>
        <ProgressBar type={type} current={current} max={max} />
      </div>
    );
  },

  renderExpired() {
    return (
      <div className={styles.errorMessage}>
        <FormattedMessage id='jobStatus.expiredStatus' defaultMessage='No couriers found' />
      </div>
    );
  },

  renderDefault() {
    const { createdAt, id } = this.props.job;
    const date = <FormattedDate value={new Date(createdAt)} />;

    return (
      <div className={styles.defaultMessage}>
        <FormattedMessage
          id='jobStatus.defaultStatus'
          defaultMessage='Order #{id} from {date}'
          values={{ id, date }} />
      </div>
    );
  },

  render() {
    const { job } = this.props;

    switch (job.status) {
      case 'new':
      case 'scheduled':
      case 'searching':
      case 'accepted':
        return this.renderNew();
      case 'in_progress':
        return this.renderInProgress();
      case 'expired':
        return this.renderExpired();
      default:
        return this.renderDefault();
    }
  }
});

export default JobStatus;



// WEBPACK FOOTER //
// ./src/components-old/JobStatus/index.js
