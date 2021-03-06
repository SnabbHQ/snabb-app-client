

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as deliveryActions from '../../common/delivery/deliveryActions';
import React, { Component } from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { View, Button } from 'native-base';

let requestingTimeout;
const timeout = 3000;


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...deliveryActions }, dispatch),
  };
}

class RequestingPickupScreen extends Component {

  constructor(props) {
    super(props);

    // bind functions
    this.dismissModal = this.dismissModal.bind(this);
  }

  dismissModal() {
    Actions.pop();
  }

  componentDidMount() {
    requestingTimeout = setTimeout(() => {
      this.props.actions.resetDelivery();
      this.dismissModal();
      Actions.DeliveryAssignedScreen({ type: ActionConst.REPLACE });
    }, timeout);
  }

  componentWillUnmount() {
    if (requestingTimeout) {
      clearTimeout(requestingTimeout);
    }
  }

  handleCancelPress() {
    this.dismissModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background} />
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.summary}>Requesting</Text>
            <ActivityIndicator animating style={{ height: 80 }} size="large" />
          </View>
          <Button
            danger block style={{ margin: 10 }}
            onPress={this.handleCancelPress.bind(this)}
          >Cancel Request</Button>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.85,
  },
  summary: {
    backgroundColor: 'transparent',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default connect(null, mapDispatchToProps)(RequestingPickupScreen);

