'use strict';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationActions from "../../../reducers/location/locationActions";
import * as globalActions from "../../../reducers/global/globalActions";
import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {Actions} from "react-native-router-flux";
import {Button, Grid, Row} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import LocationPin from "./LocationPin";
import LocationSearchbox from "./../components/LocationSearchbox";

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    global: {
      pickupLocation: state.location.pickupLocation
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions, ...globalActions}, dispatch)
  }
}

class HomeMapView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.centerOnUser();
  }

  centerOnUser() {
    this.props.actions.getCurrentPosition()
  }

  onRegionChange(region) {
    this.props.actions.setPickupLocation(region)
  }

  handlePickupLocationPress() {
    Actions.SetLocationScene({
      title: 'Pickup location'
      // you can add additional props to be passed to view here...
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          showsUserLocation={true}
          region={this.props.global.pickupLocation}
          onRegionChangeComplete={region => this.onRegionChange(region)}/>

        <LocationPin
          text={"SET LOCATION"}
          pinColor={"#000"}
          textColor={"#FFF"}
          top={0}/>

        <View style={styles.content} pointerEvents={'box-none'}>
          <View>
            <Button style={styles.centerOnUserButton} onPress={() => this.centerOnUser()}>
              <Icon name='location-arrow' style={styles.locationIcon}/>
            </Button>
          </View>

          <View style={styles.locationPanel}>
            <Grid>
              <Row>
                <LocationSearchbox
                  latlng={{lat: this.props.global.pickupLocation.latitude, lng: this.props.global.pickupLocation.longitude}}
                  margin={10}
                  showLabel={true}
                  labelText={"MY LOCATION"}
                  defaultText={"Choose Your Location"}
                  labelColor={"rgba(113,187,28,1)"}
                  textColor={"rgba(0,0,0,1)"}
                  onPress={() => this.handlePickupLocationPress()}/>
              </Row>
              <Row>
                <TouchableOpacity style={styles.setPickupLocation}>
                  <Text style={styles.setPickupLocationText}>Set Pickup</Text>
                </TouchableOpacity>
              </Row>
            </Grid>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  centerOnUserButton: {
    marginRight: 15,
    marginBottom: 15,
    height: 36,
    width: 36,
    backgroundColor: '#F7F7F7'
  },
  locationIcon: {
    fontSize: 20,
    color: '#007AFF'
  },
  locationPanel: {
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#F7F7F7',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    height: 130
  },
  setPickupLocation: {
    backgroundColor: '#00D5D5',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  setPickupLocationText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeMapView)
