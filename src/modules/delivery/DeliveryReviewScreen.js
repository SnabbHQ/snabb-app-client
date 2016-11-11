'use strict';

import {connect} from "react-redux"
import React, {Component} from "react"
import {StyleSheet, TextInput} from "react-native"
import {View, Text, Button, Content} from "native-base"
import DefaultNavBar from "../../components/DefaultNavBar"

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable={true}
        maxLength={40}
      />
    );
  }
}

class DeliveryReviewScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: 'Useless Multiline Placeholder',
    };
  }

  onDonePress() {
    alert("done")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{flexDirection: 'column'}}>
            <Text>Rate your Courier</Text>
            <TextInput
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.comment}
            />
            <Button style={styles.centerOnUserButton} onPress={() => this.onDonePress()}>Done</Button>
          </View>
        </View>
      </View>
    )
  }
}


{/*<TextInput*/
}
{/*editable={true}*/
}
{/*maxLength={40}*/
}
{/*multiline={true}*/
}
{/*numberOfLines={4}*/
}
{/*value="hola"/>*/
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  backToSetPickup: {
    marginRight: 30,
    marginBottom: 15,
    height: 36,
    width: 36,
    backgroundColor: '#F7F7F7'
  },
  centerOnUserButton: {
    flex: 1,
    margin: 15,
  },
  locationIcon: {
    fontSize: 20,
    color: '#007AFF'
  }
});

export default connect(null, null)(DeliveryReviewScreen)


