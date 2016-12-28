/* @flow */
import type { State } from '../../../common/types';
import React from 'react';
import { Match as ReactRouterMatch, Redirect } from 'react-router';
import { connect } from 'react-redux';

const haveAccess = (authed, authorized) => authorized ? authed : true;

const Match = ({
  authorized,
  component: Component,
  render,
  authed,
  ...props
}) => (
  <ReactRouterMatch
    {...props}
    render={renderProps => (
      haveAccess(authed, authorized) ?
        render ? render(renderProps) : <Component {...renderProps} />
      :
        <Redirect
          to={{
            pathname: '/login',
            state: { from: renderProps.location },
          }}
        />
    )}
  />
);

Match.propTypes = {
  authorized: React.PropTypes.bool,
  component: React.PropTypes.func,
  render: React.PropTypes.func,
  authed: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    authed: state.user.profile,
  }),
)(Match);
