import React from "react"
import {View, Space, Divider} from "../../app/components"
import PlaceFields from "./PlaceFields"
import VehicleField from "./VehicleField"
import pickupIcon from "../../../../assets/images/pickupBadgeBlank.svg"
import dropIcon from "../../../../assets/images/dropOffBadgeBlank.svg"
import vehicleIcon from "../../../../assets/images/vehicleBadgeBlank.svg"

const JobFields = ({}) => {

  return (
    <View>
      <PlaceFields icon={pickupIcon} title={"Pick Up"} placeType="pickUp"/>
      <Space x={1}/>
      <Divider/>
      <Space x={1}/>
      <PlaceFields icon={dropIcon} title={"Drop Off"} placeType="dropOff"/>
      <Space x={1}/>
      <Divider/>
      <Space x={1}/>
      <VehicleField icon={vehicleIcon} title={"Select a Vehicle"}/>
      <Space x={1}/>
    </View>
  )
}

export default JobFields
