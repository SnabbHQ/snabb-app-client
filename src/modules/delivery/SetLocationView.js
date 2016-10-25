'use strict';

import {Actions} from "react-native-router-flux";
import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";
import {View, Content} from "native-base";
import DefaultNavBar from '../../components/DefaultNavBar'
import I18n from "../../lib/I18n";


class SetLocationView extends Component {

  render() {
    return (
      <View>
        <DefaultNavBar title={this.props.title}/>
        <Content>
          <Text style={styles.summary}>{this.props.title}</Text>
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

export default SetLocationView;

