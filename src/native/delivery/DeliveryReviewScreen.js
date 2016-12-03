'use strict';

import {connect} from "react-redux"
import React, {Component} from "react"
import {Actions} from "react-native-router-flux";
import {StyleSheet, TextInput, Image} from "react-native"
import {View, Text, Button, InputGroup, Input} from "native-base"
import StarRating from 'react-native-star-rating';
import DefaultNavBar from "../app/components/DefaultNavBar"

class DeliveryReviewScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      comment: 'Leave here you comment',
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    })
  }

  onCommentTextChange(comment) {
    this.setState({
      comment: comment
    })
  }

  onDonePress() {
    alert(this.state.comment + ' and rating ' + this.state.starCount)
    Actions.HomeScreen()
  }

  render() {
    return (
      <View style={styles.container}>
        <DefaultNavBar title={"History"}/>
        <View style={styles.content}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            />
            <Text>You paid 3 Euros</Text>
            <Text>Rate your Courier</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />

            <TextInput
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.onCommentTextChange(text)}
              value={this.state.comment}
              multiline = {true}
              numberOfLines = {4}
            />
            <Button style={styles.centerOnUserButton} onPress={() => this.onDonePress()}>Done</Button>
          </View>
        </View>
      </View>
    )
  }
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


