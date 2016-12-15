/* @flow */
import LoginRegisterScreen from "../user/LoginRegisterViewScreen"
import LoginScreen from "../user/LoginScreen"
import LogoutScreen from "../user/LogoutSceen"
import RegisterScreen from "../user/RegisterScreen"
import ForgotPasswordScreen from "../user/ForgotPasswordScreen"
import ProfileScreen from "../user/profile/ProfileScreen"
import ModifyProfileScreen from "../user/profile/ModifyProfileScreen"
import HomeScreen from "../home/HomeScreen"
import SettingsScreen from "../settings/SettingsScreen"
import HelpScreen from "../help/HelpScreen"
import PaymentsScreen from "../payments/PaymentsScreen"
import OngoingDeliveriesScreen from "../ongoing/OngoingDeliveriesScreen"
import HistoryScreen from "../history/HistoryScreen"
import SetLocationScreen from "../delivery/SetLocationScreen"
import RequestingPickupModal from "../delivery/RequestingPickupModal"
import DeliveryAssignedScreen from "../delivery/DeliveryAssignedScreen"
import DeliveryReviewScreen from "../delivery/DeliveryReviewScreen"

import App from "./App"
import React from "react"
import {Router, Scene, Modal} from "react-native-router-flux"
import {Provider as Redux} from "react-redux"

type Props = {
  store: Object,
};

// Must be the ES6 class to ensure hot reload works for stateless components-old.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  props: Props;

  render() {
    const { store } = this.props;
    return (
    <Redux store={store}>
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
    </Redux>
    )
  }

}

export default Root;
