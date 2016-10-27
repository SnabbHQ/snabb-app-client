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
import LoginRegisterView from "./modules/user/LoginRegisterView";
import LoginView from "./modules/user/LoginView";
import Logout from "./modules/user/LogoutView";
import RegisterView from "./modules/user/RegisterView";
import ForgotPassword from "./modules/user/ForgotPasswordView";
import ProfileView from "./modules/user/ProfileView";
import HomeView from "./modules/home/HomeView";
import SettingsView from "./modules/settings/SettingsView";
import Icon from "react-native-vector-icons/FontAwesome";
import {setPlatform, setVersion} from "./reducers/device/deviceActions";
import {setStore} from "./reducers/global/globalActions";
import AuthInitialState from "./reducers/user/auth/authInitialState";
import DeviceInitialState from "./reducers/device/deviceInitialState";
import GlobalInitialState from "./reducers/global/globalInitialState";
import ProfileInitialState from "./reducers/user/profile/profileInitialState";
import LocationInitialState from "./reducers/location/locationInitialState";
import pack from "../package";
import HelpView from "./modules/help/HelpView";
import PaymentsView from "./modules/payments/PaymentsView";
import OngoingDeliveriesView from "./modules/ongoing/OngoingDeliveriesView";
import HistoryView from "./modules/history/HistoryView";
import SetLocationView from "./modules/delivery/SetLocationView";
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

              <Scene key='LoginRegisterScene'
                     component={LoginRegisterView}
                     type='replace'/>

              <Scene key='HomeScene'
                     component={HomeView}
                     type='replace'/>

              <Scene key='LoginScene'
                     component={LoginView}/>

              <Scene key='RegisterScene'
                     component={RegisterView}/>

              <Scene key='ForgotPasswordScene'
                     component={ForgotPassword}
                     type='replace'/>

              <Scene key='SetLocationScene'
                     component={SetLocationView}/>

              <Scene key='ProfileScene'
                     component={ProfileView}/>

              <Scene key='LogoutScene'
                     title={I18n.t('snabb.logout')}
                     component={Logout}/>

              <Scene key='OngoingDeliveriesScene'
                     component={OngoingDeliveriesView}/>

              <Scene key='HistoryScene'
                     component={HistoryView}/>
              
              <Scene key='PaymentsScene'
                     component={PaymentsView}/>

              <Scene key='HelpScene'
                     component={HelpView}/>

              <Scene key='SettingsScene'
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
