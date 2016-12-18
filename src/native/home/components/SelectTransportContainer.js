

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as locationActions from '../../../common/location/locationActions';
import * as globalActions from '../../../common/global/globalActions';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View, Content, List, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...locationActions, ...globalActions }, dispatch),
  };
}

class SelectTransportScreen extends Component {


  constructor(props) {
    super(props);
  }

  onRequestPickupButtonPress() {
    Actions.RequestingPickupScreen();
  }

  render() {
    const items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];

    return (
      <View style={{ flex: 1, flexDirection: 'column', height: 280 }}>
        <Content>
          <List
            dataArray={items}
            renderRow={(item) =>
                  <ListItem button onPress={this.onRequestPickupButtonPress.bind(this)} style={{ padding: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon size={30} name="notifications" style={{ paddingTop: 16, paddingRight: 15 }} />
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>4min</Text>
                          <Text style={{ fontSize: 14 }}>2.2 km away</Text>
                        </View>
                        <Text style={{ padding: 16, fontSize: 20 }}>€5.00</Text>
                      </View>
                    </View>
                  </ListItem>
                }
          />
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default connect(null, null)(SelectTransportScreen);

