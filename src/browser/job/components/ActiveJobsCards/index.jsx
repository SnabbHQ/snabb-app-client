import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import LoadingMessage from '../../../app/components/LoadingMessage/index';
import Card from '../../../app/components/Card/index';
import Button from '../../../app/components/Button2/index';
import ActionsBar from '../../../app/components/ActionsBar/index';
import JobStatus from '../JobStatus/index';
import Driver from '../Driver/index';
import Place from '../Place/index';
import { isCancellable } from '../../../../common/job/jobHelpers';
import styles from './ActiveJobsCards.scss';
import gridStyles from '../../../app/styles/grid.scss';
import layoutStyles from '../../../app/styles/layout.scss';

const JobCard = React.createClass({
  propTypes: {
    job: PropTypes.object.isRequired,
    onJobCancelClick: PropTypes.func.isRequired,
    onJobClick: PropTypes.func.isRequired,
    onJobRetryClick: PropTypes.func.isRequired,
    onJobShareClick: PropTypes.func.isRequired
  },

  handleShareClick(e) {
    e.stopPropagation();

    this.props.onJobShareClick(this.props.job);
  },

  handleCancelClick(e) {
    e.stopPropagation();

    this.props.onJobCancelClick(this.props.job);
  },

  handleEditClick(e) {
    e.stopPropagation();

    this.props.onJobEditClick(this.props.job);
  },

  renderDriver() {
    const { job } = this.props;

    if (job.currentDelivery) {
      return (
        <div>
          <section className={gridStyles.row}>
            <div className={gridStyles.col6}>
              <Driver driver={job.currentDelivery.driver} />
            </div>
            <div className={[gridStyles.col6, styles.share].join(' ')}>
              <Button
                type='button'
                kind='primary'
                onClick={this.handleShareClick}>
                <FormattedMessage
                  id='jobCard.shareTrackingButton'
                  defaultMessage='Share tracking' />
              </Button>
            </div>
          </section>
          <hr className={styles.cardSeparator} />
        </div>
      );
    }
  },

  renderJobName() {
    const { id } = this.props.job;
    return (
      <FormattedMessage
        id='jobCard.orderNumber'
        defaultMessage='Order #{id}'
        values={{ id }} />
    );
  },

  renderDefaultActions() {
    const { job } = this.props;

    const children = [];
    if (isCancellable(job)) {
      children.push(
        <Button
          id={`cancelJobButton-${job.id}`}
          type='button'
          kind='secondary'
          onClick={this.handleCancelClick}>
          <FormattedMessage
            id='jobCard.cancelButton'
            defaultMessage='Cancel delivery' />
        </Button>
      );
    }
    children.push(
      <Button
        id={`editJobButton-${job.id}`}
        type='button'
        kind='secondary'
        onClick={this.handleEditClick}>
        <FormattedMessage
          id='jobCard.editButton'
          defaultMessage='Edit info' />
      </Button>
    );

    return <ActionsBar children={children} />;
  },

  renderExpiredActions() {
    const {
      job,
      onJobRetryClick,
      onJobDismissClick
    } = this.props;

    return (
      <ActionsBar>
        <Button
          className={layoutStyles.mrm}
          kind='secondary'
          onClick={onJobDismissClick.bind(null, job)}
        >
          <FormattedMessage id='jobCard.dismissButton' defaultMessage='Dismiss delivery' />
        </Button>
        <Button
          kind='primary'
          onClick={onJobRetryClick.bind(null, job)}
        >
          <FormattedMessage id='jobCard.retryButton' defaultMessage='Retry delivery' />
        </Button>
      </ActionsBar>
    );
  },

  renderActions() {
    if (this.props.job.status === 'expired') {
      return this.renderExpiredActions();
    } else {
      return this.renderDefaultActions();
    }
  },

  render() {
    const { job } = this.props;

    const classes = cx({
      [styles.collapsed]: !this.props.selected,
      [styles.jobCard]: true
    });

    return (
      <Card
        onClick={this.props.onJobClick.bind(null, job)}
        className={classes}
      >
        <header>
          <JobStatus job={job} />
        </header>
        <hr className={styles.cardSeparator} />

        <div className={styles.collapsable}>
          {this.renderDriver()}
        </div>

        <section>
          <div className={styles.jobName}>
            {this.renderJobName()}
          </div>

          <div className={styles.collapsable}>
            <Place place={job.originPlace} className={layoutStyles.mbl} />
          </div>

          <Place place={job.destinationPlace} commentClassName={styles.collapsable} />
        </section>

        <footer className={styles.collapsable}>
          <div className={styles.actions}>
            {this.renderActions()}
          </div>
        </footer>
      </Card>
    );
  }
});

const ActiveJobsCards = React.createClass({
  propTypes: {
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    jobs: PropTypes.array.isRequired,
    selectedJobId: PropTypes.number,
    onJobCancelClick: PropTypes.func.isRequired,
    onJobClick: PropTypes.func.isRequired,
    onJobRetryClick: PropTypes.func.isRequired,
    onJobShareClick: PropTypes.func.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired
  },

  handleLoadMoreClick(e) {
    e.preventDefault();

    this.props.onLoadMoreClick();
  },

  renderFooter() {
    if (this.props.isLoading) {
      return (
        <Card className={[styles.loadCard]}>
          <LoadingMessage className={styles.loadMore} />
        </Card>
      );
    }

    if (this.props.hasMore) {
      return (
        <a href='#' id='loadMoreLink' onClick={this.handleLoadMoreClick}>
          <Card className={[styles.loadCard]}>
            <FormattedMessage id='loadMore' defaultMessage='Load more' />
          </Card>
        </a>
      );
    }
  },

  render() {
    const { jobs, ...otherProps } = this.props;

    return (
      <div>
        {jobs.map((job) => {
          const isSelected = (this.props.selectedJobId === job.id);

          return (
            <JobCard
              job={job}
              key={job.id}
              selected={isSelected}
              {...otherProps} />
          );
        })}
        {this.renderFooter()}
      </div>
    );
  }
});

export default ActiveJobsCards;
