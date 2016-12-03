'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as locationActions from "../../../../common/location/locationActions"
import React, {Component, PropTypes} from "react"
import {TouchableOpacity, StyleSheet} from "react-native"
import {Text, View} from "native-base"
import LocationBox from "../LocationBox"

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

const propTypes = {
  onPickupLocationBoxPress: PropTypes.func,
  onSetPickupPress: PropTypes.func,
}

class SetPickupContainer extends Component {

  render() {
    return (
      <View style={styles.locationPanel}>
        <LocationBox
          address={this.props.location.pickupLocation.address}
          margin={10}
          showLabel={true}
          labelText={"PICKUP LOCATION"}
          defaultText={"Choose Location"}
          labelColor={"rgba(113,187,28,1)"}
          textColor={"rgba(0,0,0,1)"}
          onPress={this.props.onPickupLocationBoxPress}/>
        <TouchableOpacity style={styles.setPickupLocation} onPress={this.props.onSetPickupPress}>
          <Text style={styles.setPickupLocationText}>Set Pickup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SetPickupContainer.propTypes = propTypes;

var styles = StyleSheet.create({
  locationPanel: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    height: 130
  },
  setPickupLocation: {
    backgroundColor: '#31445d',
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
