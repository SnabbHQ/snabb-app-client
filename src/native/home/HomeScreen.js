/**
 *  HomeView.js
 *  Main application view. This view should be displayed right after the user has successfully logged in the platform.
 */


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../common/auth/actions';
import * as globalActions from '../../common/global/globalActions';
import Drawer from 'react-native-drawer';
import SidePanel from './components/SidePanel';
import HomeMapView from './components/HomeMapView';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import UserProfileImage from '../user/components/UserProfileImage';

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which LoginRegisterViewScreen.js will depend on.
 */
function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
      },
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
    },
  };
}

/*
 * Bind all the actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch),
  };
}

/**
 * ## App class
 */
class HomeScreen extends Component {

  openControlPanel = () => {
    this._drawer.open();
  };

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        // open={state.open}
        // onOpen={()=>Actions.refresh({key:state.key, open: true})}
        // onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="overlay"
        tweenDuration={150}
        content={<SidePanel />}
        tapToClose
        acceptPan={false}
        openDrawerOffset={0.25}
        panCloseMask={0.35}
        style={styles.drawer}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => ({
          drawer: {
            shadowColor: '#000000',
            shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5,
          },
          main: {
            opacity: 1,
          },
          mainOverlay: {
            opacity: ratio / 1.5,
            backgroundColor: 'black',
          },
        })}
      >

        <HomeMapView />
        <UserProfileImage dropShadow style={styles.userProfile} onPress={() => this.openControlPanel()} />
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  drawer: {
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  userProfile: {
    position: 'absolute',
    left: 15,
    top: 25,
  },
  addressContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    height: 170,
    paddingLeft: 3,
  },
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
