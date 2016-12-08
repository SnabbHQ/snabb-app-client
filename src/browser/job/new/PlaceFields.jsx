import React, {PropTypes} from 'react';
import {defineMessages} from 'react-intl';
import {View, Grid, Input} from '../../app/components'

const MESSAGES = defineMessages({
  contactCompanyPlaceholder: {
    id: 'jobForm.company',
    defaultMessage: 'Company'
  },
  contactFirstnamePlaceholder: {
    id: 'jobForm.firstname',
    defaultMessage: 'First name'
  },
  contactLastnamePlaceholder: {
    id: 'jobForm.lastname',
    defaultMessage: 'Last name'
  },
  pickUpAddressPlaceholder: {
    id: 'jobForm.pickUpAddressPlaceholder',
    defaultMessage: 'Select a pick up address...'
  },
  dropOffAddressPlaceholder: {
    id: 'jobForm.dropOffAddressPlaceholder',
    defaultMessage: 'Select a drop off address...'
  },
  contactPhonePlaceholder: {
    id: 'jobForm.phonePlaceholder',
    defaultMessage: 'Phone'
  },
  contactEmailPlaceholder: {
    id: 'jobForm.emailPlaceholder',
    defaultMessage: 'Email'
  },
  commentPlaceholder: {
    id: 'jobForm.commentPlaceholder',
    defaultMessage: 'Add a comment'
  }
});

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

const PlaceFields = ({placeType}) => {

  const onInputKeyDown = (event) => {
  }

  return (
    <View>
      <View>
        <Grid col={6} pt={2}>
          <Input
            name={`${placeType}FirstName`}
            label="First Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={''}
          />
        </Grid>
        <Grid col={6} pt={2} pl={2}>
          <Input
            name={`${placeType}LastName`}
            label="Last Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={''}
          />
        </Grid>
      </View>

      <Input
        name={`${placeType}BusinessName`}
        label="Business Name"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={''}
      />

      <Input
        name={`${placeType}Address`}
        label="Address*"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'e.g. San Vicente, 91, 46001, Valencia'}
      />

      <View>
        <Grid col={6} >
          <Input
            name={`${placeType}Email`}
            label="Email"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={''}
          />
        </Grid>
        <Grid col={6} pl={2}>
          <Input
            name={`${placeType}PhoneNumber`}
            label="Phone Number"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={''}
          />
        </Grid>
      </View>

      <Input
        name={`${placeType}Comments`}
        label="Comments for the courier"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'e.g. leave with the doorman'}
      />
    </View>
  )
}

PlaceFields.propTypes = {
  placeType: PropTypes.oneOf(['pickUp', 'dropOff']).isRequired,
  // recentAddresses: PropTypes.array.isRequired,
  // getAddresses: PropTypes.func.isRequired,
  // value: PlaceShape.isRequired
}

export default PlaceFields
