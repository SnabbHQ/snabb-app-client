/* @flow */
import React, {PropTypes} from "react"
import {FormattedMessage} from "react-intl"
import {connect} from "react-redux"
import {View} from "../../app/components-old"
import FieldHeader from "./FieldHeader"
import jobMessages from "../../../common/job/jobMessages"
import vehicleIcon from "../../../../assets/images/vehicleBadgeBlank.svg"
import TransportType from "./TransportType"

const VehicleField = ({ quotes }) => {

  const renderExclVat = () => {
    //if (R.isEmpty(quotes)) { return }

    return (
      <View>
        <FormattedMessage {...jobMessages.excludeVAT}/>
      </View>
    )
  }

  //...jobMessages.selectVehicleTitle
  return (
    <View>
      <FieldHeader icon={vehicleIcon} title={'Select a Vehicle'}/>
      {renderExclVat}
      <TransportType/>
      <TransportType/>
    </View>
  )
}


VehicleField.propTypes = {
  quotes: PropTypes.object.isRequired
}

export default connect(
  (state: State) => ({
    quotes: {}//state.quotes.all,
  }),
  {},
)(VehicleField);
