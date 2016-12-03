import {Actions} from "react-native-router-flux";
import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";
import {View, Content} from "native-base";
import DefaultNavBar from '../../app/components/DefaultNavBar'
import I18n from "../../../common/lib/I18n";

class HelpScreen extends Component {

  render() {
    return (
      <View>
        <DefaultNavBar title={I18n.t('Navigation.help')}/>
        <Content>
          <Text style={styles.summary}>{I18n.t('Navigation.help')}</Text>
        </Content>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default HelpScreen;
