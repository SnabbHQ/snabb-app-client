import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './LoadingMessage.scss';

const LoadingMessage = React.createClass({
  render() {
    return (
      <div className={[styles.loader, this.props.className].join(' ')}>
        <FormattedMessage id='loading' defaultMessage='Loading...' />
      </div>
    );
  }
});

export default LoadingMessage;
