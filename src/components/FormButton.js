/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'
/**
 * ## Imports
 *
 * React
 */
import React from 'react'
import{ StyleSheet, View } from 'react-native'
import {Button} from 'native-base'

class FormButton extends React.Component {
  render () {
    return (
      <View style={styles.signin}>
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

var styles = StyleSheet.create({
  signin: {
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366'
  }
})

export default FormButton
