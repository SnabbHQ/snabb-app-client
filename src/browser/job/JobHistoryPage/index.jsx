import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { FormattedMessage } from 'react-intl';
import { loadJobsHistory } from '../../../common/job/actions';
import LoadingMessage from '../../app/components/LoadingMessage';
import Blankslate from '../../app/components/Blankslate';
import RequestJobButton from '../components/RequestJobButton';
import JobsHistoryTable from '../components/JobsHistoryTable';
import styles from './JobsHistoryPage.scss';
import gridStyles from '../../app/styles/grid.scss';
import layoutStyles from '../../app/styles/layout.scss';
import historyBlankslateIcon from '../../../assets/images/historyBlankslateIcon.svg';

const JobsHistoryPage = React.createClass({
  handleLoadMoreClick() {
    this.props.loadJobsHistory(true);
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
          icon={historyBlankslateIcon}
          title={
            <FormattedMessage
              id='jobsHistoryPage.blankStlateTitle'
              defaultMessage='No jobs requested yet' />
          }
          subtitle={
            <FormattedMessage
              id='jobsHistoryPage.blankStlateSubtitle'
              defaultMessage='All jobs that you requested will appear here.' />
          }
          actions={
            <RequestJobButton position='History blankslate' />
          } />
      </div>
    );
  },

  render() {
    const {
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
      <div className={layoutStyles.content}>
        <div className={gridStyles.container}>
          <div className={gridStyles.row}>
            <div id='jobsHistoryTable' className={[styles.tableContainer, gridStyles.col12].join(' ')}>
              <JobsHistoryTable
                jobs={jobs}
                hasMore={!!nextPageUrl}
                isLoading={isLoading}
                onLoadMoreClick={this.handleLoadMoreClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const hooks = {
  load: ({ dispatch }) => dispatch(loadJobsHistory())
};

function mapStateToProps(state) {
  const {
    jobs: {
      jobsById,
      jobIdsByFilter: {
        history: ids
      }
    },
    pagination: { history }
  } = state;

  return {
    pagination: history,
    jobs: ids.map((id) => jobsById[id])
  };
}

export default provideHooks(hooks)(connect(mapStateToProps, {
  loadJobsHistory
})(JobsHistoryPage));
