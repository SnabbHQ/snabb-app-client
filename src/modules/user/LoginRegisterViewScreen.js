'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button} from 'native-base';
import * as authActions from "../../reducers/user/auth/authActions";
import * as globalActions from "../../reducers/global/globalActions";
import {Actions} from "react-native-router-flux";
import React, {Component} from "react";
import {Dimensions, StyleSheet, Image, View, Text} from "react-native";
import Swiper from "react-native-swiper"
import FitImage from "../../components/FitImage";
import I18n from "../../lib/I18n";

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which SplashScreenView.js will depend on.
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
 * ## App class
 */
class LoginRegisterScreen extends Component {

  static handleLoginPress() {
    Actions.LoginScreen();
  }

  static handleRegisterPress() {
    Actions.RegisterScreen();
  }

  // TODO - Add mocked images for now. Also the FitImage does not seem to calculate really good the dimensions to fix
  // the image in the parent container. 
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 10}}>
          <Swiper height={Dimensions.get('window').height - 150}
                  width={Dimensions.get('window').width - 70}
                  style={styles.wrapper}
                  showsButtons={false}
                  paginationStyle={{bottom: -70}}
                  dot={<View style={{backgroundColor: '#BABABA', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                  activeDot={<View style={{backgroundColor: '#00D5D5', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}>
            <View style={styles.slide1}>
              <FitImage style={styles.image}
                        source={require('../../images/walkthrough/request_pickup.png')}
                        originalWidth={640}
                        originalHeight={1136}/>
            </View>
            <View style={styles.slide2}>
              <FitImage style={styles.image}
                        source={require('../../images/walkthrough/transport_selection.png')}
                        originalWidth={640}
                        originalHeight={1136}/>
            </View>
            <View style={styles.slide3}>
              <FitImage style={styles.image}
                        source={require('../../images/walkthrough/request_pickup.png')}
                        originalWidth={640}
                        originalHeight={1136}/>
            </View>
          </Swiper>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button style={styles.buttonRegister} textStyle={{color: '#F9F9F9'}}
                  onPress={LoginRegisterScreen.handleRegisterPress.bind(this)}>
            {I18n.t('LoginRegisterScreen.new_account')}

          </Button>
          <Button style={styles.buttonLogin} textStyle={{color: '#00D5D5'}}
                  onPress={LoginRegisterScreen.handleLoginPress.bind(this)}>
            {I18n.t('LoginRegisterScreen.sign_in')}
          </Button>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#009595',
    alignItems:'center',
    justifyContent:'center'
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonLogin: {
    backgroundColor: '#F9F9F9',
    borderColor: '#F9F9F9',
    marginLeft: 5,
    marginRight: 10,
    flex: 1
  },
  buttonRegister: {
    backgroundColor: '#00D5D5',
    borderColor: '#00D5D5',
    marginLeft: 10,
    marginRight: 5,
    flex: 1
  },
  wrapper: {
    marginTop: 40
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterScreen)
