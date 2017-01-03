/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Button, Box } from '../app/components';
import { connect } from 'react-redux';
import { logOut } from '../../common/auth/actions';

const LogOutButton = ({ logOut }, { router }) => {
  const onClick = () => {
    // We have to redirect to home before signOut.
    router.transitionTo({ pathname: '/' });
    // TODO: Router should provide onCompleted callback.
    setImmediate(logOut);
  };
  return (
    <Box>
      <Button danger onClick={onClick}>
        <FormattedMessage {...buttonsMessages.logOut} />
      </Button>
    </Box>
  );
};

LogOutButton.propTypes = {
  logOut: React.PropTypes.func.isRequired,
};

LogOutButton.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  null,
  { logOut },
)(LogOutButton);
