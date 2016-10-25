import React, {Component} from "react";
import {Image, TouchableOpacity, StyleSheet, Platform, Dimensions} from "react-native";
import {Content, Text, List, ListItem, Icon, View} from "native-base";
import {Actions} from "react-native-router-flux";
import UserProfileImage from "../../user/components/UserProfileImage";

class LeftNavigationPanel extends Component {

  navigateTo(route) {
    Actions.Home();
  }

  navigateToProfile() {
    Actions.Profile();
  }

  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}>
        <TouchableOpacity onPress={this.navigateToProfile()}
                          style={styles.sidebarHeader}>
          <UserProfileImage/>
          <View style={{ flex: 1, marginRight: 5, marginLeft: 10}}>
            <Text
              style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#09091A' }}>Javier
              Tarazaga Gomez
            </Text>
            <Text style={{ marginRight: 10, color: '#969696' }}>View Profile</Text>
          </View>
        </TouchableOpacity>

        <List>
          <ListItem button iconLeft onPress={() => Actions.Home() }>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                <Icon name="ios-phone-portrait-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Home</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => Actions.RegisterView() }>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer]}>
                <Icon name="ios-notifications-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Current Deliveries</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('button')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { paddingLeft: 10 }]}>
                <Icon name="md-radio-button-off" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>History</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('card')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer]}>
                <Icon name="ios-keypad" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Payments</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('checkbox')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { paddingLeft: 10 }]}>
                <Icon name="ios-checkmark-circle-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Free Deliveries</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('deckswiper')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { paddingLeft: 10 }]}>
                <Icon name="ios-swap" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>Help</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('form')}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer]}>
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

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: {width: 1},
    shadowRadius: 4,
    shadowOpacity: 0.4
  },
  sidebarHeader: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 35,
    marginLeft: 15,
    marginBottom: 10
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingLeft: 11,
    paddingTop: (Platform.OS === 'android') ? 7 : 5
  },
  sidebarIcon: {
    fontSize: 21,
    color: '#B2B2BA',
    lineHeight: 25,
    backgroundColor: 'transparent'
  },
  text: {
    fontWeight: '500',
    fontSize: 16
  }
});


module.exports = LeftNavigationPanel;
