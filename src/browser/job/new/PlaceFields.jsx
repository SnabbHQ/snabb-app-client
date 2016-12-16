/* @flow */
import React, {PropTypes} from "react"
import {View} from "../../app/components-old"
import {Input, Grid} from "../../app/components"
import FieldHeader from "./FieldHeader"

const DEBOUNCE_DELAY = 1000;
const MOAR_DEBOUNCE_DELAY = 3000;

export const PlaceShape = PropTypes.shape({
  contactCompany: PropTypes.string,
  contactFirstname: PropTypes.string,
  contactLastname: PropTypes.string,
  address: PropTypes.object,
  comment: PropTypes.string,
  contactPhone: PropTypes.string,
  contactEmail: PropTypes.string
});

const PlaceFields = ({icon, title, placeType}) => {

  const onInputKeyDown = (event) => {
    event.preventDefault()
    console.log('hola')
  }

  return (
    <View>
      <FieldHeader icon={icon} title={"Pick Up"}/>
      <View>
        <Grid col={6} pt={2}>
          <Input
            name={`${placeType}FirstName`}
            label="First Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            type="text"
          />
        </Grid>
        <Grid col={6} pt={2} pl={2}>
          <Input
            name={`${placeType}LastName`}
            label="Last Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={''}
            type="text"
          />
        </Grid>
      </View>

      <Input
        name={`${placeType}BusinessName`}
        label="Business Name"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={''}
        type="text"
      />

      <Input
        name={`${placeType}Address`}
        label="Address*"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'e.g. San Vicente, 91, 46001, Valencia'}
        type="text"
      />

      <View>
        <Grid col={6} >
          <Input
            name={`${placeType}Email`}
            label="Email"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={''}
            type="email"
          />
        </Grid>
        <Grid col={6} pl={2}>
          <Input
            name={`${placeType}PhoneNumber`}
            label="Phone Number"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={''}
            type="text"
          />
        </Grid>
      </View>

      <Input
        name={`${placeType}Comments`}
        label="Comments for the courier"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'e.g. leave with the doorman'}
        type="text"
      />
    </View>
  )
}

PlaceFields.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeType: PropTypes.oneOf(['pickUp', 'dropOff']).isRequired,
  // recentAddresses: PropTypes.array.isRequired,
  // getAddresses: PropTypes.func.isRequired,
  // value: PlaceShape.isRequired
}

export default PlaceFields
