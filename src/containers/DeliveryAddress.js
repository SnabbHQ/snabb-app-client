import NavigationBar from 'react-native-navbar'
/*
 * # DeliveryAddress.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict';
// Redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

// UI
import NavBar, {NavButton} from 'react-native-nav'
import Icon from 'react-native-vector-icons/MaterialIcons'

/**
 * The necessary components from React
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TextInput,
}
  from 'react-native'

/**
 * Use device options so we can reference the Version
 *
 */
import * as deviceActions from '../reducers/device/deviceActions'

/**
 * ## Redux boilerplate
 */

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which SplashScreenView.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
    deviceVersion: state.device.version
  }
}

/*
 * Bind all the actions in deviceActions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  }
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
import Translations from '../lib/Translations'

I18n.translations = Translations;

/**
 * ## DeliveryAddress class
 */
class DeliveryAddress extends Component {

  backButtonPress() {
    Actions.pop();
  };

  render() {

    return (
      <View>
        <NavBar>
          <NavButton onPress={this.backButtonPress.bind(this)}>
            <Icon name="arrow-back" size={30} color="#444444"/>
          </NavButton>
        </NavBar>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              backgroundColor: "rgba(74,144,226,1)",
            }}>
          </View>
          <NavigationBar
            title={{ title: 'Title', tintColor: "rgba(239,104,104,1)", }}
            leftButton={{ title: 'Back', }}
            rightButton={{ title: 'Forward', }}
            style={{ backgroundColor: "rgba(19,2,2,1)", }}
            statusBar={{ tintColor: "white", }}
          />
          <TextInput
            style={{
              height: 45, 
              width: 100,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.5)",
            }}
            placeholder={'This is some text'}
            placeholderTextColor={"rgba(198,198,204,1)"}
            onChangeText={(text) => {this.setState({text})}}
            onSubmitEditing={() => {this.setState({text: ''})}}
            value={(this.state && this.state.text) || ''}
          />
          <Text
            style={styles.summary}>{this.props.title} { I18n.t('App.version') }: {this.props.deviceVersion}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress)
