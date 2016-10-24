import React from "react";
import {Image, StyleSheet, View, Text} from "react-native";
import UserProfileImage from '../components/UserProfileImage';

import Icon from "react-native-vector-icons/Ionicons";

var LeftNavigationPanel = React.createClass({
  render() {
    return (
      <View style={styles.controlPanel}>
        <View style={{ marginTop: 10, height: 80 }}>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{ width: 80, alignItems:'center', justifyContent:'center'}}>
              <UserProfileImage/>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 15, marginRight: 10, marginBottom: 5, color: '#09091A' }}>Javier
                Tarazaga Gomez </Text>
              <Text style={{ marginLeft: 15, marginRight: 10, color: '#969696' }}>View Profile</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}/>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  controlPanel: {
    flex: 2,
    backgroundColor: '#F9F9F9'
  },
  controlPanelText: {
    color: 'white'
  },
  controlPanelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color: 'white',
    fontWeight: 'bold'
  }
});

module.exports = LeftNavigationPanel;
