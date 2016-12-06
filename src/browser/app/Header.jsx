/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, View, Flex, Image, PrimaryButton, Space, Toolbar } from '../app/components';
import { connect } from 'react-redux';
import Button from './components/Button2'

const logo = require('../../../assets/images/logo.svg')
const clientPhoto = require('../../../assets/images/clientPhotoDefaultSmall.svg')

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
    <Flex align="center">
      <Space x={2} />
      <Image
        alt="Snabb"
        src={logo}/>
      <Space x={4} />
      <Link inverted exactly to="/">
        <FormattedMessage {...linksMessages.active} />
      </Link>
      <Space x={4} />
      <Link inverted exactly to="/scheduled">
        <FormattedMessage {...linksMessages.scheduled} />
      </Link>
      <Space x={4} />
      <Link inverted exactly to="/Past">
        <FormattedMessage {...linksMessages.past} />
      </Link>
      <Space x={4} />
    </Flex>
    <Flex>
      <PrimaryButton>Request a delivery</PrimaryButton>
      <Space x={2} />
      <Image
        alt="Snabb"
        src={clientPhoto}/>
      }
    </Flex>

  </Toolbar>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
  }),
)(Header);
