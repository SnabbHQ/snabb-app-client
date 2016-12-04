/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, View, PrimaryButton, Space, Toolbar } from '../app/components';
import { connect } from 'react-redux';

const styles = {
  toolbar: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  prefetch: {
    display: 'none',
  },
};

const Header = ({ viewer }) => (
  <Toolbar style={styles.toolbar}>
    <Link bold inverted exactly to="/">
      <FormattedMessage {...linksMessages.home} />
    </Link>
    <Space x={2} />
    <View>
      <PrimaryButton backgroundColor='secondary'>Request a delivery</PrimaryButton>
      <Space x={2} />
      {!viewer &&
      <Link bold inverted to="/signin">
        <FormattedMessage {...linksMessages.signIn} />
      </Link>
      }
    </View>

  </Toolbar>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    viewer: undefined
    // TODO
    //viewer: state.users.viewer,
  }),
)(Header);
