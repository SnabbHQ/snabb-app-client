/**
 * # Main.js
 *  This is the main app screen
 */
'use strict';

// Redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// The actions we need
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'

// Routing
import {Actions} from 'react-native-router-flux'

// UI
import Drawer from 'react-native-drawer'
import LefNavigationPanel from '../components/LeftNavigationPanel'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavBar, {NavButton} from 'react-native-nav'

// Maps
import DisplayLatLng from '../components/HomeMapView'


// The components needed from React
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback
}
  from 'react-native'


/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
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
import Translations from '../lib/Translations'
I18n.translations = Translations;

/**
 * ## App class
 */
class Home extends Component {

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
        content={<LefNavigationPanel />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        style={styles.drawer}>
        <View style={styles.container}>
          <View style={{flex: 3}}>
            <DisplayLatLng/>
            <NavBar>
              <NavButton onPress={this.openControlPanel.bind(this)}>
                <Icon name="menu" size={30} color="#444444"/>
              </NavButton>
            </NavBar>
          </View>
          <View style={styles.content}>
            <View style={ styles.addressContainer }>
              <Text style={{ marginTop: 15, textAlign: 'center', fontWeight:'bold' }}>Get a quote in seconds</Text>
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
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  content: {
    flex: 1,
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)
