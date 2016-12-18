import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import NavBar, { NavTitle, NavButton } from 'react-native-nav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

export default class DefaultNavBar extends Component {

  backButtonPress() {
    Actions.pop();
  }

  render() {
    return (
      <View>
        <NavBar>
          <NavButton onPress={this.backButtonPress.bind(this)}>
            <Icon name="arrow-back" size={30} color="#444444" />
          </NavButton>
          <NavTitle>
            {this.props.title}
          </NavTitle>
          <NavButton />
        </NavBar>
      </View>
    );
  }
}
