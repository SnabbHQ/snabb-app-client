'use strict';

import {bindActionCreators} from "redux"
import {Actions, ActionConst} from "react-native-router-flux";
import {connect} from "react-redux"
import * as deliveryActions from "../../reducers/delivery/deliveryActions"
import React, {Component} from "react"
import {StyleSheet, Image, Alert, ScrollView} from "react-native"
import {View, Icon, Button, Text, List, ListItem} from "native-base"


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...deliveryActions}, dispatch)
  }
}

class DeliveryAssignedContainer extends Component {

  componentDidMount() {
  }

  handleContactPress() {
  }

  handleSMSPress() {
  }

  handleCancelPress() {
    var self = this

    // Works on both iOS and Android
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to cancel your current delivery?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          // @TODO - Cancel current delivery and go back to home screen
          self.props.actions.resetDelivery()
          Actions.HomeScreen({type: ActionConst.REPLACE})
        }},
      ]
    )
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <ScrollView>
        <View style={{}}>
          <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name='ios-cube-outline' style={{fontSize: 33, margin: 15}}/>
            <View style={{flex: 0.8, flexDirection: 'column'}}>
              <Text>AV/Navarro Reverter 15, 46006</Text>
              <Text>Stairs A. To call simply put 16 and the press the bell in the entry panel</Text>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name='ios-flag-outline' style={{fontSize: 50, margin: 15}}/>
            <View style={{flex: 0.8, flexDirection: 'column'}}>
              <Text>C/San Vicente, 91, 46001</Text>
              <Text>Stairs A. To call simply put 16 and the press the bell in the entry panel</Text>
            </View>
          </View>
          <List>
            <ListItem button iconLeft iconRight onPress={this.handleContactPress.bind(this)}>
              <Icon name='ios-call-outline'/>
              <Text>Contact Courier</Text>
              <Icon name='ios-arrow-forward'/>
            </ListItem>
            <ListItem button iconLeft iconRight onPress={this.handleSMSPress.bind(this)}>
              <Icon name='ios-information-circle-outline'/>
              <Text>Notify Receiver by SMS</Text>
              <Icon name='ios-arrow-forward'/>
            </ListItem>
          </List>
          <Button danger block style={{margin: 10}}
                  onPress={this.handleCancelPress.bind(this)}>Cancel Request</Button>
        </View>
          </ScrollView>
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
})

export default connect(null, mapDispatchToProps)(DeliveryAssignedContainer)


