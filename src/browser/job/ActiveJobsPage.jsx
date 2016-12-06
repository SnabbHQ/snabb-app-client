import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import includes from 'lodash/includes';
import { FormattedMessage } from 'react-intl';
import {
  cancelJob,
  dismissJob,
  fetchClosestDrivers,
  fetchJob,
  fetchJobCancellationFee,
  retryJob,
  loadActiveJobs,
  updateJob
} from '../../common/job/actions';
import createPoller from '../../common/lib/createPoller';
import createPromiseHandler from '../../common/lib/createPromiseHandler';
import { isPending } from '../../common/job/jobHelpers';
import Blankslate from '../app/components/Blankslate/index';
import LoadingMessage from '../app/components/LoadingMessage/index';
import UpdateJobFields from './components/UpdateJobFields';
import { SubmitModal } from '../app/components/Modal/index';
import CancelJobModal from './components/CancelJobModal';
import Button from '../app/components/Button2/index';
import RequestJobButton from './components/RequestNewDeliveryButton';
import ActiveJobsCards from './components/ActiveJobsCards/index';
import JobMap from './components/JobMap';
import layoutStyles from '../app/styles/layout.scss';
import gridStyles from '../app/styles/grid.scss';
import activeBlankslateIcon from '../../../assets/images/activeBlankslateIcon.svg';
import {Flex} from '../app/components'

const POLL_JOBS_INTERVAL = 5000;
const POLL_DRIVERS_INTERVAL = 15000;
const DEFAULT_MAP_OFFSET = -320; // roughly 50% of the width of the card to the right

export const ActiveJobsPage = React.createClass({
  propTypes: {
    fetchJob: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
    loadActiveJobs: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    selectedJob: PropTypes.object
  },

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      cancelJobModal: null,
      editJobModal: null,
      offsetX: DEFAULT_MAP_OFFSET
    };
  },

  componentWillMount() {
    this.updateJob = createPromiseHandler(this.props.updateJob, ({ state }) => {
      this.setState({
        editJobModal: { ...this.state.editJobModal, submitState: state }
      });
    });
    this.cancelJob = createPromiseHandler(this.props.cancelJob, ({ state }) => {
      this.setState({
        cancelJobModal: { ...this.state.cancelJobModal, submitState: state }
      });
    });
  },

  componentDidMount() {
    // FIXME: this should be done also on window resize
    this.setState({ offsetX: this.getOffsetX() });

    this._jobsPoller = createPoller(this.fetchJobs, {
      interval: POLL_JOBS_INTERVAL
    });
    this._driversPoller = createPoller(this.fetchClosestDrivers, {
      interval: POLL_DRIVERS_INTERVAL
    });
  },

  componentDidUpdate(prevProps) {
    const {
      selectedJob,
      location: {
        query: { job: jobId }
      }
    } = this.props;

    // Ensure that the URL reflect the UI state.
    if (selectedJob && selectedJob.id !== parseInt(jobId, 10)) {
      this.selectJob(selectedJob);
    }

    // Close modals when selected job is finished.
    const hasChanged = (selectedJob || {}).id !== (prevProps.selectedJob || {}).id;
    if (hasChanged) {
      this.closeCancelJobModal();
      this.closeUpdateJobModal();
    }
  },

  componentWillUnmount() {
    this.updateJob.cancel();
    this.cancelJob.cancel();

    this._jobsPoller.stop();
    this._driversPoller.stop();
  },

  fetchJobs() {
    return Promise.all(this.props.jobs.map((job) => {
      // Call `catch` to continue to fetch jobs even if an error occurs.
      return this.props.fetchJob(job.id).catch(() => {});
    }));
  },

  fetchClosestDrivers() {
    const { selectedJob } = this.props;

    if (selectedJob && isPending(selectedJob)) {
      return this.props.fetchClosestDrivers(selectedJob.originPlace.address);
    }

    return Promise.resolve();
  },

  getOffsetX() {
    // Calculates bounding box of elements on top
    // of `#map` and offsets the center accordingly
    if (this.cardsRef) {
      const coords = this.cardsRef.getBoundingClientRect();

      return -1 * coords.width / 1.5;
    } else {
      return DEFAULT_MAP_OFFSET;
    }
  },

  selectJob(job) {
    this.context.router.replace({
      ...this.props.location,
      query: { job: job.id }
    });
  },

  retryJob(job, e) {
    e.stopPropagation();

    this.context.router.push({
      pathname: '/new',
      query: { job: job.id }
    });

    this.props.retryJob(job);
  },

  dismissJob(job, e) {
    e.stopPropagation();

    this.props.dismissJob(job);
  },

  openCancelJobModal(job) {
    this.props.fetchJobCancellationFee(job.id).then((cancelation) => {
      this.setState({
        cancelJobModal: { job, cancelation }
      });
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

  openUpdateJobModal(job) {
    const value = {
      originComment: job.originPlace.comment,
      destinationComment: job.destinationPlace.comment
    };

    this.setState({
      editJobModal: { job, value }
    });
  },

  closeUpdateJobModal() {
    this.updateJob.cancel();
    this.setState({ editJobModal: null });
  },

  handleUpdateJobChange(value) {
    this.setState({
      editJobModal: {
        ...this.state.editJobModal,
        value
      }
    });
  },

  handleUpdateJobSubmit() {
    const { job, value } = this.state.editJobModal;

    this.updateJob(job.id, value).then(() => {
      this.closeUpdateJobModal();
    });
  },

  handleShareClick(job) {
    const name = job.destinationPlace.contactFirstname || '';
    const email = job.destinationPlace.contactEmail || '';
    const url = job.trackingUrl;
    // TODO this needs i18n
    const subject = 'Track your Stuart delivery';
    const body = `Hello ${name}, %0D%0A%0D%0AHere is the tracking link: ${url}`;

    window.location = `mailto:${email}?subject=${subject}&body=${body}`;
  },

  handleLoadMoreClick() {
    this.props.loadActiveJobs(true);
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

  renderUpdateJobModal() {
    if (this.state.editJobModal == null) { return; }

    const {
      submitState,
      value,
      job
    } = this.state.editJobModal;

    const isDisabled = submitState === 'pending';

    return (
      <SubmitModal
        isOpen={true}
        onRequestClose={this.closeUpdateJobModal}
        onSubmit={this.handleUpdateJobSubmit}
        title={
          <FormattedMessage
            id='editJobModalTitle'
            defaultMessage='Edit delivery' />
        }
        buttons={[
          <Button
            id={`editJobModalCancelButton-${job.id}`}
            kind='secondary'
            disabled={isDisabled}
            onClick={this.closeUpdateJobModal}
          >
            <FormattedMessage
              id='editJobModalCancelButton'
              defaultMessage='Cancel' />
          </Button>,
          <Button
            id={`editJobModalSaveButton-${job.id}`}
            type='submit'
            kind='primary'
            disabled={isDisabled}
          >
            <FormattedMessage
              id='editJobModalSaveButton'
              defaultMessage='Save changes' />
          </Button>
        ]}
      >
        <UpdateJobFields
          value={value}
          onChange={this.handleUpdateJobChange}
          pickUpPlace={job.originPlace}
          dropOffPlace={job.destinationPlace} />
      </SubmitModal>
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
      <Flex align="center">
        <Blankslate
          icon={activeBlankslateIcon}
          title={
            <FormattedMessage
              id='activeJobsPage.blankStlateTitle'
              defaultMessage='No active jobs' />
          }
          subtitle={
            <FormattedMessage
              id='activeJobsPage.blankStlateSubtitle'
              defaultMessage='Jobs that are in progress will appear here.' />
          }
          actions={
            <RequestJobButton position='Active blankslate' />
          } />
      </Flex>
    )
  },

  render() {
    const {
      drivers,
      jobs,
      pagination: { isLoading, nextPageUrl }
    } = this.props;

    if (jobs.length === 0 && isLoading) {
      return this.renderLoader();
    }

    if (jobs.length === 0) {
      return this.renderBlankSlate();
    }

    return (
      <div>
        {this.renderCancelJobModal()}
        {this.renderUpdateJobModal()}

        <div id='map' className={[gridStyles.hiddenXs, layoutStyles.mapContainer].join(' ')}>
          <div className={layoutStyles.fillContent}>
            <JobMap
              offsetX={this.state.offsetX}
              job={this.props.selectedJob}
              drivers={drivers} />
          </div>
        </div>

        <div className={layoutStyles.cardsContainer}>
          <div className={gridStyles.container}>
            <div className={gridStyles.row}>
              <div id='activeJobsCards' ref={(ref) => this.cardsRef = ref} className={[gridStyles.col12, gridStyles.colSm6].join(' ')}>
                <ActiveJobsCards
                  jobs={jobs}
                  selectedJobId={this.props.selectedJob.id}
                  isLoading={isLoading}
                  onJobShareClick={this.handleShareClick}
                  onJobCancelClick={this.openCancelJobModal}
                  onJobEditClick={this.openUpdateJobModal}
                  onJobClick={this.selectJob}
                  onJobDismissClick={this.dismissJob}
                  onJobRetryClick={this.retryJob}
                  hasMore={!!nextPageUrl}
                  onLoadMoreClick={this.handleLoadMoreClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const hooks = {
  load: ({ dispatch }) => dispatch(loadActiveJobs())
};

function mapStateToProps(state, ownProps) {
  const {
    pagination: { active },
    jobs: {
      jobsById,
      jobIdsByFilter: {
        active: ids
      }
    },
    closestDrivers: {
      driversById: drivers
    }
  } = state;

  const jobId = '1'//parseInt(ownProps.location.query.job, 10);
  const selectedJob = jobsById[includes(ids, jobId) ? jobId : ids[0]];

  return {
    drivers,
    selectedJob,
    pagination: active,
    jobs: ids.map((id) => jobsById[id])
  };
}

export default provideHooks(hooks)(connect(mapStateToProps, {
  cancelJob,
  dismissJob,
  retryJob,
  fetchClosestDrivers,
  fetchJob,
  fetchJobCancellationFee,
  loadActiveJobs,
  updateJob
})(ActiveJobsPage));
