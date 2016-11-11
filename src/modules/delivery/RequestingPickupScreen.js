'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux";
import TimerMixin from 'react-timer-mixin';
import * as locationActions from "../../reducers/location/locationActions"
import * as globalActions from "../../reducers/global/globalActions"
import React, {Component} from "react"
import {StyleSheet, Text} from "react-native"
import {View, Button, Content} from "native-base"
import DefaultNavBar from "../../components/DefaultNavBar"
import I18n from "../../lib/I18n";

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

class RequestingPickupScreen extends Component {

  componentDidMount() {

    // TODO - Lets Fake the requesting period
    setTimeout(() => {
        Actions.DeliveryAssignedScreen()
      },
      2000
    )
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{}}>
          <Text style={styles.summary}>Requesting Pickup</Text>
          <Button>Cancel Request</Button>
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


