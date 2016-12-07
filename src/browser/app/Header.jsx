/* @flow */
import type {State} from "../../common/types"
import React from "react"
import linksMessages from "../../common/app/linksMessages"
import RequestNewDeliveryButton from "../job/components/RequestNewDeliveryButton"
import {FormattedMessage} from "react-intl"
import {Link, Flex, Image, Space, Toolbar} from "../app/components"
import {connect} from "react-redux"

// $FlowFixMe
const logo = require('../../../assets/images/logo.svg')

// $FlowFixMe
const clientPhoto = require('../../../assets/images/clientPhotoDefaultSmall.svg')

const Header = ({viewer}, { rebass }) => {
  const styles = {
    toolbar: {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    prefetch: {
      display: 'none',
    },
    headerLink: {
      hover: {borderRadius: 4, backgroundColor: rebass.colors.primaryLight},
      active: {backgroundColor: rebass.colors.primary, color: rebass.colors.accent},
    }
  }

  return (
    <Toolbar style={styles.toolbar}>
      <Flex align="center">
        <Space x={2}/>
        <Image
          alt="Snabb"
          src={logo}/>
        <Space x={4}/>
        <Link p={1} inverted exactly style={styles.headerLink} to="/">
          <FormattedMessage {...linksMessages.active} />
        </Link>
        <Space x={2}/>
        <Link p={1} inverted exactly style={styles.headerLink} to="/scheduled">
          <FormattedMessage {...linksMessages.scheduled} />
        </Link>
        <Space x={2}/>
        <Link p={1} inverted exactly style={styles.headerLink} to="/Past">
          <FormattedMessage {...linksMessages.past} />
        </Link>
        <Space x={2}/>
      </Flex>
      <Flex>
        <RequestNewDeliveryButton message="Request a Delivery"/>
        <Space x={2}/>
        <Image
          alt="Snabb"
          src={clientPhoto}/>
      </Flex>
    </Toolbar>
  )
}

Header.propTypes = {
  viewer: React.PropTypes.object,
}

Header.contextTypes = {
  rebass: React.PropTypes.object,
}

export default connect(
  (state: State) => ({}),
)(Header)
