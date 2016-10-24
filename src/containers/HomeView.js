/**
 *  HomeView.js
 *  Main application view. This view should be displayed right after the user has successfully logged in the platform.
 */
'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../reducers/auth/authActions";
import * as globalActions from "../reducers/global/globalActions";
import {Actions} from "react-native-router-flux";
import {Drawer} from "native-base";
import LefNavigationPanel from "../components/LeftNavigationPanel";
import Icon from "react-native-vector-icons/MaterialIcons";
import DisplayLatLng from "../components/HomeMapView";
import React, {Component} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import Translations from "../lib/Translations";
import UserProfileImage from '../components/UserProfileImage';


/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which LoginRegisterView.js will depend on.
 */
function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...authActions, ...globalActions}, dispatch)
  }
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
I18n.translations = Translations;

/**
 * ## App class
 */
class HomeView extends Component {

  openControlPanel = () => {
    this._drawer.open()
  };

  handlePickUpPress() {
    Actions.DeliveryAddress({
      title: 'Pick-Up'
      // you can add additional props to be passed to Subview here...
    })
  }

  handleDropOffPress() {
    Actions.DeliveryAddress({
      title: 'Drop-Off'
      // you can add additional props to be passed to Subview here...
    })
  }

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        // open={state.open}
        // onOpen={()=>Actions.refresh({key:state.key, open: true})}
        // onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="overlay"
        tweenDuration={150}
        content={<LefNavigationPanel />}
        tapToClose={true}
        acceptPan={false}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        style={styles.drawer}
        tweenHandler={(ratio) => {
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2
            }
          };
        }}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <DisplayLatLng/>
            <UserProfileImage style={{marginTop: 25, marginLeft: 15}} onPress={() => this.openControlPanel()}/>
          </View>
          <View style={styles.content}>
            <View style={styles.addressContainer}>
              <Text style={{ marginTop: 15, textAlign: 'center', fontWeight:'bold' }}>Get a quote in seconds
                default</Text>
              <View style={{flex: 1, marginTop: 15, paddingLeft: 10, paddingRight: 10}}>
                <TouchableWithoutFeedback onPress={this.handlePickUpPress.bind(this)}>
                  <View style={{flex: 1, flexDirection:'row' }}>
                    <Icon name="archive" size={35} color="#444444"/>
                    <Text style={{ marginTop: 10, marginLeft: 10, color: '#AAAAAA' }}>Enter pick-up address</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{ height: 1, backgroundColor: '#EEEEEE', marginLeft: 50, marginRight: 50 }}/>
                <TouchableWithoutFeedback onPress={this.handleDropOffPress.bind(this)}>
                  <View style={{flex: 1, flexDirection:'row' }}>
                    <Icon name="flag" size={35} color="#444444"/>
                    <Text style={{ marginTop: 10, marginLeft: 10, color: '#AAAAAA' }}>Enter drop-off address</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  drawer: {
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  addressContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    height: 170,
    paddingLeft: 3
  }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
