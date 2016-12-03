'use strict';
/**
 *  # snabb
 *  snabb ![snabb](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */
import React from "react"
import {AppRegistry, Platform} from "react-native"
import Root from './app/Root'
import configureStore from "../common/configureStore"


import {setPlatform, setVersion} from "../common/device/deviceActions"
import {setStore} from "../common/global/globalActions"
import AuthInitialState from "../common/user/auth/authInitialState"
import DeviceInitialState from "../common/device/deviceInitialState"
import GlobalInitialState from "../common/global/globalInitialState"
import ProfileInitialState from "../common/user/profile/profileInitialState"
import LocationInitialState from "../common/location/locationInitialState"
import pack from "../../package"


/**
 *  The version of the app but not  displayed yet
 */
let VERSION = pack.version;

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

const Snabb = () => {
  const store = configureStore({
    initialState: getInitialState()
  });

  // configureStore will combine reducers from snabb and main application
  // it will then create the store based on aggregate state from all reducers
  store.dispatch(setPlatform(Platform.OS));
  store.dispatch(setVersion(VERSION));
  store.dispatch(setStore(store));

  // setup the router table with App selected as the initial component
  // note: See https://github.com/aksonov/react-native-router-flux/issues/948
  return (
    <Root store={store}/>
  )
}

/**
 * registerComponent to the AppRegister and off we go....
 */
AppRegistry.registerComponent('snabb', () => Snabb)
