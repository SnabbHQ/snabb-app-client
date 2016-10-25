import {Actions} from "react-native-router-flux";
import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import DefaultNavBar from '../../components/DefaultNavBar'
import I18n from "../../lib/I18n";

class SettingsView extends React.Component {
  render() {
    var titleConfig = {
      title: I18n.t('Subview.subview')
    };

    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    };

    return (
      <View>
        <DefaultNavBar title={I18n.t('Navigation.settings')}/>
        <View style={styles.container}>
          <Text style={styles.summary}>{I18n.t('Subview.subview')} {I18n.t('App.version')}: {this.props.deviceVersion}
          </Text>
        </View>
      </View>
    )
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

export default SettingsView;
