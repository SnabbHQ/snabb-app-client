'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import NavigationBar from "react-native-navbar";
import React from "react";
import {StyleSheet, View, Text} from "react-native";
import * as deviceActions from "../../reducers/device/deviceActions";
import Translations from "../../lib/Translations";


/**
* ## Redux boilerplate
*/
/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which LoginRegisterView.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version
  }
}

/*
 * Bind all the actions in deviceActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
I18n.translations = Translations;

/**
 * ## Subview class
 */
let Subview = React.createClass({

  render () {
    var titleConfig = {
      title: I18n.t('Subview.subview')
    };

    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    };

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig} />
        <View style={styles.container}>
          <Text style={styles.summary}>{I18n.t('Subview.subview')} {I18n.t('App.version')}: {this.props.deviceVersion}
          </Text>
        </View>
      </View>
    )
  }
});

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Subview)