/* @flow */
import React from "react"
import errorMessages from "../../../common/auth/errorMessages"
import {FormattedMessage} from "react-intl"
import Text from "./Text"
import Box from "./Box"

const Error = ({ error }) => {
  if (!error) return <Box/>;

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

Error.propTypes = {
  error: React.PropTypes.instanceOf(Error),
};

export default Error;
