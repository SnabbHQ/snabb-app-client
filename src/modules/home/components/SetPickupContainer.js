'use strict'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationActions from "../../../reducers/location/locationActions";
import React from "react";
import {Image, TouchableOpacity, StyleSheet, Platform, Dimensions} from "react-native";
import {Text, View} from "native-base";
import {Grid, Row} from "native-base";
import LocationSearchbox from "./../components/LocationSearchbox";
import I18n from "../../../lib/I18n";

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    location: state.location
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...locationActions}, dispatch)
  }
}

class SetPickupContainer extends React.Component {

  render() {
    return (
      <View style={styles.locationPanel}>
        <Grid>
          <Row>
            <LocationSearchbox
              latlng={{lat: this.props.location.pickupLocation.latitude, lng: this.props.location.pickupLocation.longitude}}
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
    );
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(SetPickupContainer)
