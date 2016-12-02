import React from "react"
import {connect} from "react-redux"
import {Image, TouchableOpacity, StyleSheet, Platform, Dimensions} from "react-native"
import {Content, Text, List, ListItem, Icon, View} from "native-base"
import {Actions} from "react-native-router-flux"
import UserProfileImage from "../../user/components/UserProfileImage"
import I18n from "../../../common/lib/I18n"


/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    profile: {
      name: state.profile.form.fields.name,
    }
  }
}

class SidePanel extends React.Component {

  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}>
        <TouchableOpacity onPress={() => Actions.ProfileScreen()}
                          style={styles.sidebarHeader}>
          <UserProfileImage size={50}/>
          <View style={{flex: 1, marginRight: 5, marginLeft: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#09091A'}}>
              {this.props.profile.name}
            </Text>
            <Text style={{marginRight: 10, color: '#969696'}}>View Profile</Text>
          </View>
        </TouchableOpacity>

        <List>
          <ListItem button iconLeft onPress={() => Actions.HomeScreen() }>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {paddingLeft: 14}]}>
                <Icon name="ios-phone-portrait-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>{I18n.t("Navigation.home")}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => Actions.OngoingDeliveriesScreen() }>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer]}>
                <Icon name="ios-notifications-outline" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>{I18n.t("Navigation.ongoing_deliveries")}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => Actions.HistoryScreen() }>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {paddingLeft: 10}]}>
                <Icon name="md-radio-button-off" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>{I18n.t("Navigation.history")}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => Actions.PaymentScreen()}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer]}>
                <Icon name="ios-keypad" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>{I18n.t("Navigation.payments")}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => Actions.HelpScreen()}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {paddingLeft: 10}]}>
                <Icon name="ios-swap" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>{I18n.t("Navigation.help")}</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => Actions.SettingsScreen()}>
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer]}>
                <Icon name="ios-call" style={styles.sidebarIcon}/>
              </View>
              <Text style={styles.text}>{I18n.t("Navigation.settings")}</Text>
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
    shadowOffset: {width: 0},
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
    color: '#000000',
    lineHeight: 25,
    backgroundColor: 'transparent'
  },
  text: {
    fontWeight: '500',
    fontSize: 16
  }
});


export default connect(mapStateToProps, null)(SidePanel)
