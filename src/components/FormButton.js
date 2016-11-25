/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'

import React, {Component, PropTypes} from 'react'
import{ StyleSheet, View } from 'react-native'
import {Button} from 'native-base'

const propTypes = {
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
  buttonText: PropTypes.string
}

class FormButton extends Component {
  render () {
    return (
      <View style={styles.signIn}>
        <Button style={styles.button}
                textStyle={{fontSize: 18}}
                isDisabled={this.props.isDisabled}
                onPress={this.props.onPress}>
          {this.props.buttonText}
        </Button>
      </View>
    )
  }
}

FormButton.propTypes = propTypes

let styles = StyleSheet.create({
  signIn: {
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366'
  }
})

export default FormButton
