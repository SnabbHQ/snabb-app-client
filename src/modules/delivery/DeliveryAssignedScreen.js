'use strict';

import {Actions} from "react-native-router-flux";
import {connect} from "react-redux"
import React, {Component} from "react"
import {StyleSheet, Image} from "react-native"
import {View, Icon, Button, Text, List, ListItem} from "native-base"

class DeliveryAssignedScreen extends Component {

  componentDidMount() {

    // // TODO - Lets Fake the requesting period
    // setTimeout(() => {
    //     Actions.DeliveryReviewScreen()
    //   },
    //   2000
    // )
  }

  handleContactPress() {

  }

  handleSMSPress() {

  }

  handleCancelPress() {

  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text>Order Number: 12344</Text>
              <Text>Picking up in about 5 min</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name='ios-cube-outline' style={{fontSize: 50, margin: 15}}/>
            <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
              <Text>AV/Navarro Reverter 15, 46006</Text>
              <Text>Stairs A. To call simply put 16 and the press the bell in the entry panel</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name='ios-flag-outline' style={{fontSize: 50, margin: 15}}/>
            <View style={{flexDirection: 'column'}}>
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
            <ListItem button iconLeft iconRight onPress={this.handleCancelPress.bind(this)}>
              <Icon name='ios-settings-outline'/>
              <Text>Cancel Delivery</Text>
              <Icon name='ios-arrow-forward'/>
            </ListItem>
          </List>
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


