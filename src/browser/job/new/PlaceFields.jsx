/* @flow */
import React, {PropTypes} from "react"
import {Input, Text, Button, Box, Grid} from "../../app/components"
import {Space} from "../../app/components-old"
import FieldHeader from "./FieldHeader"

const PlaceFields = ({icon, title, placeType, collapsible}) => {

  var collapsed = true;

  const onInputKeyDown = (event) => {
    event.preventDefault()
  }

  const renderEditButton = () => {
    return collapsible ? <Button marginLeft="2em">{collapsed ? "Edit" : "Save"}</Button> : null
  }

  const renderFields = () => {
    if (collapsible && collapsed) {
      return renderCollapsedFields()
    } else {
      return renderExpandedFields()
    }
  }

  const renderExpandedFields = () => {
    return (
      <Box>
        <Box>
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
        </Box>

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

        <Box>
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
        </Box>

        <Input
          name={`${placeType}Comments`}
          label="Comments for the courier"
          maxLength={100}
          onKeyDown={onInputKeyDown}
          placeholder={'e.g. leave with the doorman'}
          type="text"
        />
      </Box>
    )
  }

  const renderCollapsedFields = () => {
    return (
      <Box display="flex" flexDirection="column">
        <Text bold>Javier Tarazaga</Text>
        <Text>Snabb</Text>
        <Text>Av/Navarro Reverter 26, 46004, Valencia</Text>
        <Text>+34661518132</Text>
        <Text>Ring on the bell</Text>
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <FieldHeader icon={icon} title={title}/>
        <Space auto/>
        {renderEditButton()}
      </Box>
      {renderFields()}
    </Box>
  )
}

PlaceFields.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeType: PropTypes.oneOf(['pickUp', 'dropOff']).isRequired,
  collapsible: PropTypes.bool
  // recentAddresses: PropTypes.array.isRequired,
  // getAddresses: PropTypes.func.isRequired,
  // value: PlaceShape.isRequired
}

export default PlaceFields
