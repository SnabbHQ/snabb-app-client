import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { FormattedMessage, FormattedTime, FormattedDate } from 'react-intl';
import {
  cancelJob,
  loadScheduledJobs
} from '../../actions';
import createPromiseHandler from '../../lib/createPromiseHandler';
import Place from '../../components/Place';
import Card from '../../components/Card';
import CancelJobModal from '../../components/CancelJobModal';
import RequestJobButton from '../../components/RequestJobButton';
import LoadingMessage from '../../components/LoadingMessage';
import Blankslate from '../../components/Blankslate';
import styles from './ScheduledJobsPage.scss';
import layoutStyles from '../../../styles/layout.scss';
import gridStyles from '../../../styles/grid.scss';

const ScheduledJobsDay = React.createClass({
  renderJob(job) {
    const pickupAtDate = new Date(job.pickupAt);
    const key = `job-${job.id}`;

    return (
      <div
        id={key}
        key={key}
        className={styles.job}
      >
        <div className={styles.pickupAtCol}>
          <p>
            <FormattedMessage
              id='scheduledJobsPage.pickupAt'
              defaultMessage='Pickup' />
          </p>
          <p>
            <strong><FormattedTime value={pickupAtDate} /></strong>
          </p>
        </div>
        <div className={styles.placeCol}>
          <Place place={job.originPlace} showComment={false} />
        </div>
        <div className={styles.placeCol}>
          <Place place={job.destinationPlace} showComment={false} />
        </div>
        <div className={styles.actionsCol}>
          <a
            id={`cancelX-${job.id}`}
            className={styles.cancelButton}
            href='#'
            onClick={this.props.onJobCancelClick.bind(null, job)}
          >
            <FormattedMessage
              id='cancel'
              defaultMessage='Cancel' />
          </a>
        </div>
      </div>
    );
  },

  render() {
    const { date, jobs } = this.props;

    return (
      <div className={styles.day}>
        <h2><FormattedDate value={date} /></h2>
        <Card compact={true}>{jobs.map(this.renderJob)}</Card>
      </div>
    );
  }
});

export const ScheduledJobsPage = React.createClass({
  getInitialState() {
    return {
      cancelJobModal: null
    };
  },

  componentWillMount() {
    this.cancelJob = createPromiseHandler(this.props.cancelJob, ({ state }) => {
      this.setState({
        cancelJobModal: { ...this.state.cancelJobModal, submitState: state }
      });
    });
  },

  componentWillUnmount() {
    this.cancelJob.cancel();
  },

  openCancelJobModal(job) {
    this.setState({
      cancelJobModal: { job }
    });
  },

  closeCancelJobModal() {
    this.cancelJob.cancel();
    this.setState({ cancelJobModal: null });
  },

  handleCancelJobClick() {
    const { job } = this.state.cancelJobModal;

    this.cancelJob(job.id).catch(() => {
      alert('Something went wrong while cancelling your job...');
    }).then(() => {
      this.closeCancelJobModal();
    });
  },

  renderCancelJobModal() {
    if (this.state.cancelJobModal == null) { return; }

    return (
      <CancelJobModal
        {...this.state.cancelJobModal}
        onCancelClick={this.closeCancelJobModal}
        onConfirmClick={this.handleCancelJobClick} />
    );
  },

  renderLoader() {
    return (
      <LoadingMessage
        className={[layoutStyles.content, layoutStyles.centered].join(' ')} />
    );
  },

  renderBlankSlate() {
    return (
      <div className={[layoutStyles.content, layoutStyles.centered].join(' ')}>
        <Blankslate
          title={
            <FormattedMessage
              id='scheduledJobsPage.blankStlateTitle'
              defaultMessage='No scheduled jobs' />
          }
          subtitle={
            <FormattedMessage
              id='scheduledJobsPage.blankStlateSubtitle'
              defaultMessage='Scheduled jobs will appear here.' />
          }
          actions={
            <RequestJobButton position='Scheduled blankslate' />
          } />
      </div>
    );
  },


  renderDay({ key, date, jobs }) {
    return (
      <ScheduledJobsDay
        key={key}
        date={date}
        jobs={jobs}
        onJobCancelClick={this.openCancelJobModal} />
    );
  },

  render() {
    const {
      days,
      pagination: { isLoading }
    } = this.props;

    if (days.length === 0 && isLoading) {
      return this.renderLoader();
    }

    if (days.length === 0) {
      return this.renderBlankSlate();
    }

    return (
      <div className={layoutStyles.content}>
        {this.renderCancelJobModal()}

        <div className={gridStyles.container}>
          {days.map(this.renderDay)}
        </div>
      </div>
    );
  }
});

const hooks = {
  load({ dispatch }) {
    return dispatch(loadScheduledJobs());
  }
};

function mapStateToProps(state) {
  const {
    pagination: { scheduled },
    jobs: {
      jobsById,
      jobIdsByFilter: {
        scheduled: ids
      }
    }
  } = state;

  const jobsByDayKey = {};
  ids.forEach((id) => {
    const job = jobsById[id];

    const [key] = job.pickupAt.split('T');
    jobsByDayKey[key] = jobsByDayKey[key] || [];

    jobsByDayKey[key].push(job);
  });
  const days = Object.keys(jobsByDayKey).map((key) => {
    const jobs = jobsByDayKey[key];
    jobs.sort((a, b) => new Date(a.pickupAt) - new Date(b.pickupAt));

    return {
      key,
      date: new Date(key),
      jobs
    };
  });
  days.sort((a, b) => a.date - b.date);

  return {
    pagination: scheduled,
    days
  };
}

export default provideHooks(hooks)(connect(mapStateToProps, {
  cancelJob,
  loadScheduledJobs
})(ScheduledJobsPage));
