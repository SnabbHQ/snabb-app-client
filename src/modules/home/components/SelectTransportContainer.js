'use strict';

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux";
import TimerMixin from 'react-timer-mixin';
import * as locationActions from "../../../reducers/location/locationActions"
import * as globalActions from "../../../reducers/global/globalActions"
import React, {Component} from "react"
import {StyleSheet, Text, ListView} from "react-native"
import {View, Button, Content, List, ListItem} from "native-base"
import Icon from "react-native-vector-icons/MaterialIcons";
import DefaultNavBar from "../../../components/DefaultNavBar"
import I18n from "../../../lib/I18n";

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

class SelectTransportScreen extends Component {


  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          name: 'Bicycle'
        }, {
          name: 'row 2'
        }
      ]),
    };
  }

  componentDidMount() {
  }

  render() {

    var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];
    var items = [{icon: 'ios-alarm', name: 'Simon Mignolet'}]

    return (
      <View style={{flex: 1, flexDirection: 'column', height: 300}}>
        <Content>
          <View style={{flexDirection: 'row'}}>
            <Icon size={40} name='notifications' style={{padding: 20}}/>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>4min</Text>
                <Text style={{fontSize: 20}}>2.2 km away</Text>
              </View>
              <Text style={{padding: 30, fontSize: 20}}>€5.00</Text>
            </View>
          </View>
        </Content>
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

export default connect(null, null)(SelectTransportScreen)


