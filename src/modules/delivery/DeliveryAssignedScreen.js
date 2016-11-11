'use strict';

import {Actions} from "react-native-router-flux";
import {connect} from "react-redux"
import React, {Component} from "react"
import {StyleSheet, Text} from "react-native"
import {View, Button} from "native-base"

class DeliveryAssignedScreen extends Component {

  componentDidMount() {

    // TODO - Lets Fake the requesting period
    setTimeout(() => {
        Actions.DeliveryReviewScreen()
      },
      2000
    )
  }


  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{}}>
          <Text style={styles.summary}>Driver Assigned</Text>
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

export default connect(null, null)(DeliveryAssignedScreen)


