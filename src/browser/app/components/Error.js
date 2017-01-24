/* @flow */
import React from 'react'
import formatError from '../../../common/app/formatError'
import {FormattedMessage} from 'react-intl'
import Text from './Text'
import Box from './Box'

const Error = ({ error }) => {
  if (!error) return <Box/>;

  const errorFormatted = formatError(error);

  const message = errorFormatted.message;
  const values = errorFormatted.values;

  return (
    <Text color="danger" display="inline-block" align="center">
      {message ?
        <FormattedMessage {...message} values={values} />
      :
        error.toString()
      }
    </Text>
  );
};

Error.propTypes = {
  error: React.PropTypes.instanceOf(Error),
};

export default Error;
