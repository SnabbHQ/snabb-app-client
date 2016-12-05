import React, { PropTypes } from 'react';
import { defineMessages } from 'react-intl';
import wrapFields, { wrappedFormPropTypes } from '../../lib/wrapFields';

const MESSAGES = defineMessages({
  couponPlaceholder: {
    id: 'couponForm.couponPlaceholder',
    defaultMessage: 'Insert coupon'
  }
});

const CouponShape = PropTypes.shape({
  coupon: PropTypes.string
});

const CouponFields = React.createClass({
  propTypes: {
    ...wrappedFormPropTypes,
    value: CouponShape.isRequired
  },

  render() {
    const {
      renderers: {
        renderText
      }
    } = this.props;

    return (
      <div>
        {renderText('coupon', { id: 'coupon' })}
      </div>
    );
  }
});

export default wrapFields(CouponFields, { messages: MESSAGES });
