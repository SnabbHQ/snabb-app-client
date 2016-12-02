'use strict';
/**
 *  # snabb
 *  snabb ![snabb](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */
import React from "react"
import {AppRegistry} from "react-native"
import {Router, Scene, Modal} from "react-native-router-flux"
import {Provider} from "react-redux"
import configureStore from "./common/lib/configureStore"
import App from "./native/modules/App"
import LoginRegisterScreen from "./native/modules/user/LoginRegisterViewScreen"
import LoginScreen from "./native/modules/user/LoginScreen"
import LogoutScreen from "./native/modules/user/LogoutSceen"
import RegisterScreen from "./native/modules/user/RegisterScreen"
import ForgotPasswordScreen from "./native/modules/user/ForgotPasswordScreen"
import ProfileScreen from "./native/modules/user/profile/ProfileScreen"
import ModifyProfileScreen from "./native/modules/user/profile/ModifyProfileScreen"
import HomeScreen from "./native/modules/home/HomeScreen"
import SettingsScreen from "./native/modules/settings/SettingsScreen"
import HelpScreen from "./native/modules/help/HelpScreen"
import PaymentsScreen from "./native/modules/payments/PaymentsScreen"
import OngoingDeliveriesScreen from "./native/modules/ongoing/OngoingDeliveriesScreen"
import HistoryScreen from "./native/modules/history/HistoryScreen"
import SetLocationScreen from "./native/modules/delivery/SetLocationScreen"
import RequestingPickupModal from "./native/modules/delivery/RequestingPickupModal"
import DeliveryAssignedScreen from "./native/modules/delivery/DeliveryAssignedScreen"
import DeliveryReviewScreen from "./native/modules/delivery/DeliveryReviewScreen"

import {setPlatform, setVersion} from "./common/device/deviceActions"
import {setStore} from "./common/global/globalActions"
import AuthInitialState from "./common/user/auth/authInitialState"
import DeviceInitialState from "./common/device/deviceInitialState"
import GlobalInitialState from "./common/global/globalInitialState"
import ProfileInitialState from "./common/user/profile/profileInitialState"
import LocationInitialState from "./common/location/locationInitialState"
import pack from "../package"

import I18n from "./common/lib/I18n"


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
            <Scene key="modal" component={Modal}>
              <Scene key='root' hideNavBar>
                <Scene key='AppScene'
                       component={App}
                       type='replace'
                       initial/>

                <Scene key='LoginRegisterScreen'
                       component={LoginRegisterScreen}
                       type='replace'/>

                <Scene key='HomeScreen'
                       component={HomeScreen}
                       type='replace'/>

                <Scene key='LoginScreen'
                       component={LoginScreen}/>

                <Scene key='RegisterScreen'
                       component={RegisterScreen}/>

                <Scene key='ForgotPasswordScreen'
                       component={ForgotPasswordScreen}
                       type='replace'/>

                <Scene key='SetLocationScreen'
                       component={SetLocationScreen}/>

                <Scene key='ProfileScreen'
                       component={ProfileScreen}/>

                <Scene key='ModifyProfileScreen'
                       component={ModifyProfileScreen}
                       direction='vertical'/>

                <Scene key='LogoutScreen'
                       title={I18n.t('snabb.logout')}
                       component={LogoutScreen}/>

                <Scene key='OngoingDeliveriesScreen'
                       component={OngoingDeliveriesScreen}/>

                <Scene key='HistoryScreen'
                       component={HistoryScreen}/>

                <Scene key='PaymentScreen'
                       component={PaymentsScreen}/>

                <Scene key='HelpScreen'
                       component={HelpScreen}/>

                <Scene key='SettingsScreen'
                       component={SettingsScreen}/>

                <Scene key='DeliveryAssignedScreen'
                       component={DeliveryAssignedScreen}/>

                <Scene key='DeliveryReviewScreen'
                       component={DeliveryReviewScreen}/>

              </Scene>
              <Scene key='RequestingPickupModal'
                     component={RequestingPickupModal}/>
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
