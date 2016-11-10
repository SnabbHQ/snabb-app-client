'use strict';

import {connect} from "react-redux"
import React, {Component} from "react"
import {StyleSheet, Text} from "react-native"
import {View, Content} from "native-base"
import DefaultNavBar from "../../components/DefaultNavBar"

class DeliveryReviewView extends Component {

  render() {
    return (
      <View>
        <DefaultNavBar title={this.props.title}/>
        <Content/>
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

export default connect(null, mapDispatchToProps)(DeliveryDoneView)


