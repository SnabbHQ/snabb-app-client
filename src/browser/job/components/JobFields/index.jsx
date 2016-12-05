import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import PlaceFields, { PlaceShape } from '../PlaceFields';
import JobSchedulingFields, { JobSchedulingShape } from '../JobSchedulingFields/index';
import ErrorMessage from '../ErrorMessage';
import wrapFields, { wrappedFieldsPropTypes } from '../../../lib/wrapFields';
import Card from '../../../app/components/Card/index';
import layoutStyles from '../../../app/styles/layout.scss';
import styles from './JobFields.scss';

const ICONS = {
  pickUp: {
    blank: require('../../../assets/images/pickUpBadgeBlank.svg'),
    present: require('../../../assets/images/pickUpBadgePresent.svg'),
    error: require('../../../assets/images/pickUpBadgeError.svg')
  },
  dropOff: {
    blank: require('../../../assets/images/dropOffBadgeBlank.svg'),
    present: require('../../../assets/images/dropOffBadgePresent.svg'),
    error: require('../../../assets/images/dropOffBadgeError.svg')
  },
  vehicle: {
    blank: require('../../../assets/images/vehicleBadgeBlank.svg'),
    present: require('../../../assets/images/vehicleBadgePresent.svg')
  },
  scheduling: {
    blank: require('../../../assets/images/schedulingBadgeBlank.svg')
  }
};

const MESSAGES = defineMessages({
  placeAddressNotSpecific: {
    id: 'jobForm.placeAddressNotSpecific',
    defaultMessage: 'Address is not specific enough'
  },
  outOfRange: {
    id: 'jobForm.outOfRange',
    defaultMessage: 'Address is out of range'
  },
  placeContactPhoneInvalid: {
    id: 'jobForm.placeContactPhoneInvalid',
    defaultMessage: 'Please provide international phone number (+33123456789)'
  },
  placeContactPhoneMissing: {
    id: 'jobForm.placeContactPhoneMissing',
    defaultMessage: 'This address is not accurate enough. Please provide a phone number'
  },
  placeContactEmailInvalid: {
    id: 'jobForm.placeContactEmailInvalid',
    defaultMessage: 'Please provide a valid email'
  },
  clientInvoiceReferencePlaceholder: {
    id: 'jobForm.clientInvoiceReferencePlaceholder',
    defaultMessage: 'Assignment code'
  }
});

export const JobShape = PropTypes.shape({
  pickUp: PlaceShape,
  dropOff: PlaceShape,
  transportType: PropTypes.string,
  scheduling: JobSchedulingShape,
  clientInvoiceReference: PropTypes.string
});

const JobFields = React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    value: JobShape.isRequired
  },

  renderIcon(type, value) {
    let state = 'blank';
    if (this.props.errors[type]) {
      state = 'error';
    } else if (!!value) {
      state = 'present';
    }

    const url = ICONS[type][state];
    return <img className={styles.sectionIcon} src={url} />;
  },

  renderError(placeType) {
    return (
      <ErrorMessage
        id={`${placeType}PlaceError`}
        className={layoutStyles.mts}
        errors={this.props.errors[placeType]}
        messages={MESSAGES} />
    );
  },

  renderExclVat() {
    // If hash is null it means that there are no quotes.
    if (!this.props.quotes.hash) { return; }

    return (
      <span className={styles.exclVat}>
        <FormattedMessage
          id='jobForm.exclVat'
          defaultMessage='Excl. VAT' />
      </span>
    );
  },

  renderDropOffCard() {
    const {
      getDropOffAddresses,
      recentDropOffAddresses,
      showAssignmentCode,
      renderers: { renderText }
    } = this.props;

    let assignmentCodeField = showAssignmentCode && (
        <div className={layoutStyles.mtl}>
          <FormattedMessage
            tagName='h3'
            id='jobForm.dropOffAssignmentCodeFieldTitle'
            defaultMessage='Assignment code' />
          {renderText('clientInvoiceReference')}
        </div>
      );

    return (
      <Card shadow={true} id='dropOff'>
        <div className={styles.sectionHeader}>
          {this.renderIcon('dropOff', this.props.dropOffPlace)}
          <FormattedMessage
            tagName='h2'
            id='jobForm.dropOff'
            defaultMessage='Drop off' />
        </div>

        <FormattedMessage
          tagName='h3'
          id='jobForm.dropOffPlaceFieldTitle'
          defaultMessage='Drop off address details' />

        <PlaceFields
          value={this.props.value.dropOff}
          onChange={this.props.onChange.bind(null, 'dropOff')}
          placeType='dropOff'
          recentAddresses={recentDropOffAddresses}
          getAddresses={getDropOffAddresses} />

        {assignmentCodeField}

        {this.renderError('dropOff')}
      </Card>
    );
  },

  render() {
    const {
      closestDriverByType,
      getPickUpAddresses,
      quotes,
      recentPickUpAddresses,
      transportTypes,
      renderers: { renderTransportPicker }
    } = this.props;

    return (
      <div>
        <Card shadow={true} id='pickUp'>
          <div className={styles.sectionHeader}>
            {this.renderIcon('pickUp', this.props.pickUpPlace)}
            <FormattedMessage
              tagName='h2'
              id='jobForm.pickUp'
              defaultMessage='Pick up' />
          </div>

          <FormattedMessage
            tagName='h3'
            id='jobForm.pickUpPlaceFieldTitle'
            defaultMessage='Pick up address details' />

          <PlaceFields
            value={this.props.value.pickUp}
            onChange={this.props.onChange.bind(null, 'pickUp')}
            placeType='pickUp'
            recentAddresses={recentPickUpAddresses}
            getAddresses={getPickUpAddresses} />
          {this.renderError('pickUp')}
        </Card>

        {this.renderDropOffCard()}

        <Card shadow={true} id='vehicle'>
          <div className={styles.sectionHeader}>
            {this.renderExclVat()}
            {this.renderIcon('vehicle', this.props.value.transportType)}
            <FormattedMessage
              tagName='h2'
              id='jobForm.vehicle'
              defaultMessage='Choose a vehicle' />
          </div>
          {renderTransportPicker('transportType', {
            closestDriverByType,
            quotes,
            transportTypes
          })}
        </Card>

        <Card shadow={true} id='scheduling'>
          <div className={styles.sectionHeader}>
            {this.renderIcon('scheduling')}
            <FormattedMessage
              tagName='h2'
              id='jobForm.scheduling'
              defaultMessage='When do you need a courier?' />
          </div>

          <JobSchedulingFields
            value={this.props.value.scheduling}
            dayKeys={this.props.dayKeys}
            daysByKey={this.props.daysByKey}
            onChange={this.props.onChange.bind(null, 'scheduling')} />
        </Card>
      </div>
    );
  }
});

export default wrapFields(JobFields, { messages: MESSAGES });
