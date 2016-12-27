/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import errorMessages from '../../common/auth/errorMessages';
import { FormattedMessage } from 'react-intl';
import { Message } from '../app/components-old';
import { connect } from 'react-redux';

const styles = {
  message: {
    display: 'inline-block',
    width: '100%'
  },
};

const SignInError = ({ error }) => {
  if (!error) return null;

  const message =
    errorMessages[error.name];

  return (
    <Message style={styles.message} theme="error">
      {message ?
        <FormattedMessage {...message} values={error.params} />
      :
        error.toString()
      }
    </Message>
  );
};

SignInError.propTypes = {
  error: React.PropTypes.instanceOf(Error),
};

export default connect(
  (state: State) => ({
    error: state.auth.error,
  }),
)(SignInError);
