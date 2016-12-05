import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './ProgressBar.scss';

const MAX_PROGRESS_VALUE = 100;

const ProgressBar = React.createClass({
  propTypes: {
    current: PropTypes.number,
    max: PropTypes.number,
    type: PropTypes.string
  },

  getDefaultProps() {
    return {
      current: MAX_PROGRESS_VALUE,
      max: MAX_PROGRESS_VALUE,
      type: 'default'
    };
  },

  render() {
    const { current, max, type } = this.props;
    const percentage = Math.min(MAX_PROGRESS_VALUE, Math.floor(MAX_PROGRESS_VALUE*current/max));

    return (
      <div className={styles.progressBarContainer}>
        <div className={styles[type]} role='progressbar' aria-valuenow={percentage} aria-valuemin='0' aria-valuemax={MAX_PROGRESS_VALUE} style={{width: `${percentage}%`}}>
          <FormattedMessage
            id='progressBar.percentComplete'
            defaultMessage='{percentage}% complete'
            values={{ percentage }} />
        </div>
      </div>
    );
  }
});

export default ProgressBar;

export function ProgressBarSearching(props) {
  return <ProgressBar {...props} type={'searching'} />;
};

export function ProgressBarPicking(props) {
  return <ProgressBar {...props} type={'picking'} />;
};

export function ProgressBarDelivering(props) {
  return <ProgressBar {...props} type={'delivering'} />;
};
