'use strict';
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
import LoginRegisterView from "./modules/user/LoginRegisterViewScreen";
import LoginView from "./modules/user/LoginScreen";
import Logout from "./modules/user/LogoutSceen";
import RegisterView from "./modules/user/RegisterScreen";
import ForgotPassword from "./modules/user/ForgotPasswordScreen";
import ProfileView from "./modules/user/ProfileScreen";
import HomeView from "./modules/home/HomeScreen";
import SettingsView from "./modules/settings/SettingsScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import {setPlatform, setVersion} from "./reducers/device/deviceActions";
import {setStore} from "./reducers/global/globalActions";
import AuthInitialState from "./reducers/user/auth/authInitialState";
import DeviceInitialState from "./reducers/device/deviceInitialState";
import GlobalInitialState from "./reducers/global/globalInitialState";
import ProfileInitialState from "./reducers/user/profile/profileInitialState";
import LocationInitialState from "./reducers/location/locationInitialState";
import pack from "../package";
import HelpView from "./modules/help/HelpScreen";
import PaymentsView from "./modules/payments/PaymentsScreen";
import OngoingDeliveriesView from "./modules/ongoing/OngoingDeliveriesScreen";
import HistoryView from "./modules/history/HistoryScreen";
import SetLocationView from "./modules/delivery/SetLocationScreen";
import I18n from './lib/I18n'

/**
 *  The version of the app but not  displayed yet
 */
var VERSION = pack.version;

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snabb
 * @returns {Object} object with 5 keys
 */
function getInitialState() {
  return {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()).set('isMobile', true),
    global: (new GlobalInitialState()),
    location: (new LocationInitialState()),
    profile: new ProfileInitialState()
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
              <Scene key='AppScene'
                     component={App}
                     type='replace'
                     initial/>

              <Scene key='LoginRegisterScreen'
                     component={LoginRegisterView}
                     type='replace'/>

              <Scene key='HomeScreen'
                     component={HomeView}
                     type='replace'
                     initial/>

              <Scene key='LoginScreen'
                     component={LoginView}/>

              <Scene key='RegisterScreen'
                     component={RegisterView}/>

              <Scene key='ForgotPasswordScreen'
                     component={ForgotPassword}
                     type='replace'/>

              <Scene key='SetLocationScreen'
                     component={SetLocationView}/>

              <Scene key='ProfileScreen'
                     component={ProfileView}/>

              <Scene key='LogoutScreen'
                     title={I18n.t('snabb.logout')}
                     component={Logout}/>

              <Scene key='OngoingDeliveriesScreen'
                     component={OngoingDeliveriesView}/>

              <Scene key='HistoryScreen'
                     component={HistoryView}/>
              
              <Scene key='PaymentScreen'
                     component={PaymentsView}/>

              <Scene key='HelpScreen'
                     component={HelpView}/>

              <Scene key='SettingsScreen'
                     component={SettingsView}/>

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
