'use strict'
/**
 *  # snabb
 *  snabb ![snabb](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */
import React from "react";
import {AppRegistry, StyleSheet, View, Text} from "react-native";
import {Router, Scene} from "react-native-router-flux";
import {Provider} from "react-redux";
import configureStore from "./lib/configureStore";
import Translations from "./lib/Translations";
import App from "./modules/App";
import SplashScreenView from "./modules/user/LoginRegisterView";
import LoginView from "./modules/user/LoginView";
import Logout from "./modules/user/LogoutView";
import RegisterView from "./modules/user/RegisterView";
import ForgotPassword from "./modules/user/ForgotPasswordView";
import Profile from "./modules/user/ProfileView";
import HomeView from "./modules/home/HomeView";
import Subview from "./modules/delivery/Subview";
import DeliveryAddress from "./modules/delivery/DeliveryAddress";
import Icon from "react-native-vector-icons/FontAwesome";
import {setPlatform, setVersion} from "./reducers/device/deviceActions";
import {setStore} from "./reducers/global/globalActions";
import AuthInitialState from "./modules/user/reducers/auth/authInitialState";
import DeviceInitialState from "./reducers/device/deviceInitialState";
import GlobalInitialState from "./reducers/global/globalInitialState";
import ProfileInitialState from "./modules/user/reducers/profile/profileInitialState";
import pack from "../package";


/**
 * ### Translations
 */
var I18n = require('react-native-i18n')

// Support fall-backs so en-US & en-BR both use en
I18n.fallbacks = true;
I18n.translations = Translations;

/**
 *  The version of the app but not  displayed yet
 */
var VERSION = pack.version;

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snabb
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
  return {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()).set('isMobile', true),
    global: (new GlobalInitialState()),
    profile: new ProfileInitialState()
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70
  }
});

/**
 * ## TabIcon
 *
 * Displays the icon for the tab w/ color dependent upon selection
 */
class TabIcon extends React.Component {
  render() {
    var color = this.props.selected ? '#FF3366' : '#FFB3B3'
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={30}/>
        <Text style={{color: color}}>{this.props.title}</Text>
      </View>
    )
  }
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {

  let snabb = React.createClass({
    render () {
      const store = configureStore(getInitialState());

      // configureStore will combine reducers from snabb and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));

      // setup the router table with App selected as the initial component
      // note: See https://github.com/aksonov/react-native-router-flux/issues/948
      return (

        <Provider store={store}>
          <Router sceneStyle={{ backgroundColor: 'white' }}>
            <Scene key='root' hideNavBar>
              <Scene key='App'
                     component={App}
                     type='replace'
                     initial/>

              <Scene key='SplashScreenView'
                     component={SplashScreenView}
                     type='replace'/>

              <Scene key='Home'
                     component={HomeView}
                     type='replace'/>

              <Scene key='InitialLoginForm'
                     component={RegisterView}
                     type='replace'/>

              <Scene key='LoginView'
                     component={LoginView}/>

              <Scene key='RegisterView'
                     component={RegisterView}/>

              <Scene key='ForgotPassword'
                     component={ForgotPassword}
                     type='replace'/>

              <Scene key='Subview'
                     component={Subview}/>

              <Scene key='DeliveryAddress'
                     component={DeliveryAddress}/>

              <Scene key='Tabbar'
                     tabs
                     hideNavBar
                     tabBarStyle={styles.tabBar}
                     default='Home'>

                <Scene key='Logout'
                       title={I18n.t('snabb.logout')}
                       icon={TabIcon}
                       iconName={"sign-out"}
                       hideNavBar
                       component={Logout}/>

                <Scene key='Profile'
                       title={I18n.t('snabb.profile')}
                       icon={TabIcon}
                       iconName={"gear"}
                       hideNavBar
                       component={Profile}/>
              </Scene>
            </Scene>
          </Router>
        </Provider>
      )
    }
  });

  /**
   * registerComponent to the AppRegistery and off we go....
   */
  AppRegistry.registerComponent('snabb', () => snabb)
}
