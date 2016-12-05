import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { isCancellable } from '../../../../common/job/jobHelpers';
import JobStatus from '../JobStatus/index';
import Driver from '../Driver/index';
import Button from '../../../app/components/Button2/index';
import styles from './jobColumns.scss';
import textStyles from '../../../app/styles/text.scss';

export const statusColumn = {
  name: <FormattedMessage id='jobTable.status' defaultMessage='Status' />,
  headerClassName: styles.statusHeader,
  renderer(job, rowProps) {
    const status = <JobStatus job={job} />;

    if (job.status !== 'expired') {
      return status;
    }

    return (
      <div className={styles.statusContainer}>
        <div className={styles.expiredButtons}>
          <Button
            block={true}
            kind='primary'
            size='s'
            onClick={rowProps.onJobRetryClick.bind(null, job)}
          >
            <FormattedMessage id='jobTable.retryButton' defaultMessage='Retry' />
          </Button>
          <Button
            block={true}
            kind='secondary'
            size='s'
            onClick={rowProps.onJobDismissClick.bind(null, job)}
          >
            <FormattedMessage id='jobTable.dismissButton' defaultMessage='Dismiss' />
          </Button>
        </div>
        <div className={styles.status}>{status}</div>
      </div>
    );
  }
};

export const idColumn = {
  ...statusColumn,
  name: <FormattedMessage id='jobTable.id' defaultMessage='ID' />,
  headerClassName: styles.idHeader
};

export const pickUpColumn = {
  name: <FormattedMessage id='jobTable.pickUp' defaultMessage='Pick up' />,
  headerClassName: styles.pickUpHeader,
  renderer(job) {
    const { street, postcode } = job.originPlace.address;

    return (
      <div>
        <p><strong>{street || postcode}</strong></p>
        <p>{job.originComment || job.originPlace.comment}</p>
      </div>
    );
  }
};

export const dropOffColumn = {
  name: <FormattedMessage id='jobTable.dropOff' defaultMessage='Drop off' />,
  headerClassName: styles.dropOffHeader,
  renderer(job) {
    const { street, postcode } = job.destinationPlace.address;

    return (
      <div>
        <p><strong>{street || postcode}</strong></p>
        <p>{job.destinationComment || job.destinationPlace.comment}</p>
      </div>
    );
  }
};

export const driverColumn = {
  name: <FormattedMessage id='jobTable.driver' defaultMessage='Driver' />,
  headerClassName: styles.driverHeader,
  renderer(job, rowProps) {
    const driver = (job.currentDelivery && job.currentDelivery.driver) || {};
    const onCancelClick = rowProps.onJobCancelClick && rowProps.onJobCancelClick.bind(null, job);

    return (
      <Driver
        driver={driver}
        showCancel={onCancelClick && isCancellable(job)}
        onCancelClick={onCancelClick} />
    );
  }
};

export const priceColumn = {
  name: <FormattedMessage id='jobTable.price' defaultMessage='Price' />,
  headerClassName: styles.priceHeader,
  className: styles.priceCell,
  renderer(job) {
    let className = textStyles.green;
    let v = 0;
    if (job.status === 'finished') {
      v = job.finalJobPrice.finalTotalAmount;
    } else {
      className = textStyles.red;
      v = job.order ? job.order.finalTotalAmount : 0;
    }

    return (
      <strong className={className}>
        <FormattedNumber
          value={v}
          style='currency'
          currency={job.finalJobPrice.jobQuote.currency.isoCode} />
      </strong>
    );
  }
};
