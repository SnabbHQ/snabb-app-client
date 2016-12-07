/* @flow */
import React, {PropTypes} from 'react'
import {View, Heading, Flex, Image, Text} from './'
import {FormattedMessage} from "react-intl"

type Props = {
  icon?: any,
  actions?: any,
  subtitle: object,
  title: objects,
}

const styles = {
  container: {
    minHeight: '90vh'
  },
  title: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  }
}

const Blankslate = ({icon, actions, title, subtitle}: Props) => {

  function renderIcon() {
    if (icon) {
      return <Image alt="Blankslate Icon" mt={2} src={icon}/>
    }
  }

  function renderActions() {
    if (actions) {
      return <div>{actions}</div>
    }
  }

  return (
    <Flex flexColumn align="center" justify="center" style={styles.container}>
      {renderIcon()}
      <Heading level={1} size={1} mt={1} mb={1} style={styles.title}><FormattedMessage {...title}/></Heading>
      <Text mb={1} style={styles.subtitle}><FormattedMessage {...subtitle}/></Text>
      {renderActions()}
    </Flex>
  )
}

Blankslate.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
  subtitle: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]).isRequired,
  icon: PropTypes.object,
  actions: PropTypes.object,
}
Blankslate.contextTypes = {
  rebass: React.PropTypes.object,
}

export default Blankslate
