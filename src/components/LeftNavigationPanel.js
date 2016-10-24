import React, {Component} from 'react';
import {Image, StyleSheet, Platform, Dimensions} from "react-native";

import {Content, Text, List, ListItem, Icon, View} from 'native-base';

import UserProfileImage from '../components/UserProfileImage';

var sidebarTheme = {

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (Platform.OS === 'ios') ? 37 : 30,
  lineHeight: (Platform.OS === 'ios') ? 20 : 24,


  // List
  listBorderColor: '#fff',
  listDividerBg: '#ddd',
  listItemHeight: 45,
  listItemPadding: 10,
  listNoteColor: '#808080',
  listNoteSize: 13,

};

class LeftNavigationPanel extends Component {
  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}>
        <View style={{ marginTop: 10, height: 80 }}>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{ width: 80, alignItems:'center', justifyContent:'center'}}>
              <UserProfileImage/>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15, marginLeft: 15, marginRight: 10, marginBottom: 5, color: '#09091A' }}>Javier
                Tarazaga Gomez
              </Text>
              <Text style={{ marginLeft: 15, marginRight: 10, color: '#969696' }}>View Profile</Text>
            </View>
          </View>
        </View>

        <List>
          <ListItem button iconLeft onPress={() => this.navigateTo('anatomy')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#0209D8', paddingLeft: 14 }]}>
                <Icon name="ios-phone-portrait-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Home</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('badge')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#4DCAE0' }]}>
                <Icon name="ios-notifications-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Current Deliveries</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('button')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#5cb85c', paddingLeft: 10 }]}>
                <Icon name="md-radio-button-off" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>History</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('card')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#877CA6' }]}>
                <Icon name="ios-keypad" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Payments</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('checkbox')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#EB6B23', paddingLeft: 10 }]}>
                <Icon name="ios-checkmark-circle-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Free Deliveries</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('deckswiper')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#3591FA', paddingLeft: 10 }]}>
                <Icon name="ios-swap" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Help</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('form')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#F5BF35' }]}>
                <Icon name="ios-call" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Settings</Text>
            </View>
          </ListItem>
        </List>
      </Content>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerCover: {
    alignSelf: 'stretch',
    // resizeMode: 'cover',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10,
  },
  drawerImage: {
    position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: 'cover',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingLeft: 11,
    paddingTop: (Platform.OS === 'android') ? 7 : 5,
  },
  sidebarIcon: {
    fontSize: 21,
    color: '#fff',
    lineHeight: 25,
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
  // sidebar: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 30 },
  //   shadowRadius: 60,
  //   shadowOpacity: 0.3,
  // },

  // sidebar: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 1 },
  //   shadowRadius: 4,
  //   shadowOpacity: 0.4,
  // },
});


module.exports = LeftNavigationPanel;
