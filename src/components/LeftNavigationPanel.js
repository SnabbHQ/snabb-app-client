import React from 'react'

import { SwitchIOS, StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

var LeftNavigationPanel = React.createClass({
  render() {
    return (
      <View style={styles.controlPanel}>
        <View style={{flex: 1}}/>
        <View style={{height: 80, backgroundColor: 'steelblue'}}>
            <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{ width: 80, backgroundColor: '#4F575C', alignItems:'center', justifyContent:'center'}}>
                    <Icon name="ios-person-outline" size={60} color="#AAAAAA" />
                </View>
                <View style={{ flex: 1, backgroundColor: '#31393E'}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 15, marginRight: 10, marginBottom: 5, color: 'white' }}>Javier Tarazaga Gomez </Text>
                    <Text style={{ marginLeft: 15, marginRight: 10, color: 'white' }}>javi.tarazaga@gmail.com</Text>
                </View>
            </View>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
    controlPanel: {
      flex: 2,
      backgroundColor:'#1E2326',
    },
    controlPanelText: {
      color:'white'
    },
    controlPanelWelcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 25,
      color:'white',
      fontWeight:'bold'
    }
});

module.exports = LeftNavigationPanel
