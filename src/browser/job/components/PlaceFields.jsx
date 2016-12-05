import React, { PropTypes } from 'react';
import { defineMessages } from 'react-intl';
import wrapFields, { wrappedFieldsPropTypes } from '../../lib/wrapFields';
import gridStyles from '../../app/styles/grid.scss';

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

const PlaceFields = React.createClass({
  propTypes: {
    ...wrappedFieldsPropTypes,
    placeType: PropTypes.oneOf(['pickUp', 'dropOff']).isRequired,
    recentAddresses: PropTypes.array.isRequired,
    getAddresses: PropTypes.func.isRequired,
    value: PlaceShape.isRequired
  },

  render() {
    const {
      intl,
      placeType,
      recentAddresses,
      getAddresses,
      renderers: {
        renderAutocomplete,
        renderText
      }
    } = this.props;

    const placeholder = intl.formatMessage(MESSAGES[`${placeType}AddressPlaceholder`]);

    return (
      <div>
        <div className={gridStyles.row}>
          <div className={gridStyles.col6}>
            {renderText('contactFirstname', { debounce: DEBOUNCE_DELAY })}
          </div>
          <div className={gridStyles.col6}>
            {renderText('contactLastname', { debounce: DEBOUNCE_DELAY })}
          </div>
        </div>

        <div className={gridStyles.row}>
          <div className={gridStyles.col12}>
            {renderText('contactCompany', { debounce: DEBOUNCE_DELAY })}
          </div>
        </div>

        <div className={gridStyles.row}>
          <div className={gridStyles.col12}>
            {renderAutocomplete('address', {
              id: `${placeType}AddressInput`,
              defaultItems: recentAddresses,
              getItems: getAddresses,
              placeholder
            })}
          </div>
        </div>

        <div className={gridStyles.row}>
          <div className={gridStyles.col6}>
            {renderText('contactPhone', {
              id: `${placeType}ContactPhone`,
              type: 'tel',
              debounce: MOAR_DEBOUNCE_DELAY })}
          </div>
          <div className={gridStyles.col6}>
            {renderText('contactEmail', {
              id: `${placeType}ContactEmail`,
              type: 'email',
              debounce: MOAR_DEBOUNCE_DELAY })}
          </div>
        </div>

        <div className={gridStyles.row}>
          <div className={gridStyles.col12}>
            {renderText('comment', {
              id: `${placeType}PlaceComment`,
              debounce: DEBOUNCE_DELAY })}
          </div>
        </div>
      </div>
    );
  }
});

export default wrapFields(PlaceFields, { messages: MESSAGES });
