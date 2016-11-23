'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions, ActionConst} from "react-native-router-flux";
import TimerMixin from 'react-timer-mixin';
import * as locationActions from "../../reducers/location/locationActions"
import * as globalActions from "../../reducers/global/globalActions"
import React, {Component} from "react"
import {StyleSheet, Text, ActivityIndicator} from "react-native"
import {View, Button, Content} from "native-base"
import Spinner from 'react-native-spinkit'
import I18n from "../../lib/I18n"

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

let requestingTimeout
const timeout = 3000;

class RequestingPickupScreen extends Component {

  constructor(props) {
    super(props)

    // bind functions
    this.dismissModal = this.dismissModal.bind(this)
  }

  dismissModal() {
    Actions.pop()
  }

  componentDidMount() {
    requestingTimeout = setTimeout(() => {
      this.dismissModal()
      Actions.DeliveryAssignedScreen({type: ActionConst.REPLACE})
    }, timeout);
  }

  componentWillUnmount() {
    if (requestingTimeout) {
      clearTimeout(requestingTimeout);
    }
  }

  handleCancelPress() {
    this.dismissModal()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}/>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.summary}>Requesting</Text>
            <ActivityIndicator animating={true} style={{height: 80}} size="large"/>
          </View>
          <Button danger block style={{margin: 10}}
                  onPress={this.handleCancelPress.bind(this)}>Cancel Request</Button>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.85
  },
  summary: {
    backgroundColor: 'transparent',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default connect(null, null)(RequestingPickupScreen)


