'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as locationActions from "../../reducers/location/locationActions"
import * as globalActions from "../../reducers/global/globalActions"
import React, {Component} from "react"
import {StyleSheet, Text} from "react-native"
import {View, Content} from "native-base"
import DefaultNavBar from "../../components/DefaultNavBar"

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

class RequestingPickupView extends Component {

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

export default connect(null, mapDispatchToProps)(RequestingPickupView)


