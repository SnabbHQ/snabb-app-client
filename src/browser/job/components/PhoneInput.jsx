import React, { PropTypes } from 'react';
import keys from 'lodash/keys';
import Text from '../../app/components/Text/index';

const MASKS = {
  '33': '+11 1 11 11 11 11',
  '34': '+11 111 111 111',
  '44': '+11 1111 111111'
};

const COUNTRY_CODES = keys(MASKS);

const PhoneInput = React.createClass({
  propTypes: {
    countryCode: PropTypes.oneOf(COUNTRY_CODES).isRequired
  },

  getInitialState() {
    return {
      mask: MASKS[this.props.countryCode]
    };
  },

  handleChange(value) {
    this.props.onChange(value);

    const countryCode = value.replace(/\s/g, '').slice(1, 3);
    const mask = MASKS[countryCode] || MASKS[`${this.props.countryCode}`];

    this.setState({ mask });
  },

  handleFocus() {
    if (!this.props.value.trim()) {
      this.props.onChange(`+${this.props.countryCode}`);
    }
  },

  render() {
    return (
      <Text
        {...this.props}
        type='tel'
        mask={this.state.mask}
        onChange={this.handleChange}
        onFocus={this.handleFocus} />
    );
  }
});

export default PhoneInput;
