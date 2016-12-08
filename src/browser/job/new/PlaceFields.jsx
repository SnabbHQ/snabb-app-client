import React, {PropTypes} from 'react';
import {defineMessages} from 'react-intl';
import wrapFields, {wrappedFieldsPropTypes} from '../../lib/wrapFields';
import {Block, View, Heading, Grid, Input} from '../../app/components'

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

const PlaceFields = ({}) => {

  const onInputKeyDown = (event) => {
  }

  return (
    <View>
      <View>
        <Grid col={6} pt={2}>
          <Input
            label="First Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
        <Grid col={6} pt={2} pl={2}>
          <Input
            label="Last Name"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
      </View>

      <Input
        label="Business Name"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'Business Name'}
      />

      <Input
        label="Address*"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'Address'}
      />

      <View>
        <Grid col={6} >
          <Input
            label="Email"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
        <Grid col={6} pl={2}>
          <Input
            label="Phone Number"
            maxLength={100}
            onKeyDown={onInputKeyDown}
            placeholder={'Hola'}
          />
        </Grid>
      </View>

      <Input
        label="Comments for the courier"
        maxLength={100}
        onKeyDown={onInputKeyDown}
        placeholder={'e.g. leave with the doorman'}
      />
    </View>
  )
}

PlaceFields.propTypes = {
  ...wrappedFieldsPropTypes,
  placeType: PropTypes.oneOf(['pickUp', 'dropOff']).isRequired,
  recentAddresses: PropTypes.array.isRequired,
  getAddresses: PropTypes.func.isRequired,
  value: PlaceShape.isRequired
}

export default PlaceFields
