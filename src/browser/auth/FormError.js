/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import errorMessages from '../../common/auth/errorMessages';
import { FormattedMessage } from 'react-intl';
import { Text } from '../app/components';
import { connect } from 'react-redux';

const FormError = ({ error }) => {
  if (!error) return null;

  const message = errorMessages[error.name];

  return (
    <Text color="danger" display="inline-block" align="center">
      {message ?
        <FormattedMessage {...message} values={error.params} />
      :
        error.toString()
      }
    </Text>
  );
};

FormError.propTypes = {
  error: React.PropTypes.instanceOf(Error),
};

export default connect(
  (state: State) => ({
    error: state.auth.error,
  }),
)(FormError);
