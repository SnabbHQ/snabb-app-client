import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";
import {View, Content} from "native-base";
import DefaultNavBar from '../../components/DefaultNavBar'
import I18n from "../../lib/I18n";

/**
 * ## Redux boilerplate
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View>
        <DefaultNavBar title={I18n.t('Navigation.settings')}/>
        <Content>
          <Text style={styles.summary}>{I18n.t('Navigation.settings')} {I18n.t('App.version')}: {this.props.deviceVersion}</Text>
        </Content>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  summary: {
    flex: 1,
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default connect(mapStateToProps)(SettingsScreen)
