'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions, ActionConst} from "react-native-router-flux";
import TimerMixin from 'react-timer-mixin';
import * as locationActions from "../../reducers/location/locationActions"
import * as globalActions from "../../reducers/global/globalActions"
import React, {Component} from "react"
import {StyleSheet, Text, Alert} from "react-native"
import {View, Button, Content} from "native-base"
import I18n from "../../lib/I18n";

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

let requestingTimeout
const timeout = 3000;

class RequestingPickupScreen extends Component {

  componentDidMount() {
    requestingTimeout = setTimeout(() => {
      Actions.DeliveryAssignedScreen({type: ActionConst.REPLACE})
    }, timeout);
  }

  componentWillUnmount() {
    if (requestingTimeout) {
      clearTimeout(requestingTimeout);
    }
  }

  handleCancelPress() {
    // Works on both iOS and Android
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to cancel your current delivery?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          // @TODO - Cancel current delivery and go back to home screen
          Actions.HomeScreen()
        }},
      ]
    )
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{}}>
          <Text style={styles.summary}>Requesting Pickup</Text>
          <Button onPress={this.handleCancelPress.bind(this)}>Cancel Request</Button>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default connect(null, null)(RequestingPickupScreen)


