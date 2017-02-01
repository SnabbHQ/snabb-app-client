/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import buttonMessages from '../../../common/app/buttonsMessages';
import {FormattedMessage} from 'react-intl';
import {Box, Input, Button, Space, Text} from '../../app/components';

type NewCreditCardProps = {
  type: Object,
  cards: Object,
  onCancelClick?: func,
}

const Pepito = () => (
  <div style={{padding: "100px", backgroundColor: "black"}}>
    <input
      type="text"
      ref={(input) => { console.log('San dios!!' + input); }} />
    <input
      type="button"
      value="Focus the text input"
    />
  </div>
);

import { createComponent } from 'react-fela';

const StyledComponent = createComponent(props => ({
  backgroundColor: 'red',
}), ({ innerRef,...otherProps }) => (
  <span {...otherProps} ref={innerRef} />
), ['innerRef']);

class Agnostic extends React.Component {
  handleClick = event => {
    console.log('Here is the ref:', this.rootNode);
  };

  render() {
    const self = this;
    return (
      <StyledComponent
        {...this.props}
        onClick={this.handleClick}
        innerRef={(node) => console.log("this is so much fun!" + node) }
      />
    );
  }
}

const NewCreditCard = ({type, cards, onCancelClick}: NewCreditCardProps) => {
  const card = cards[type];

  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;
  let previousLength = 0;

  const onCVVChange = (event) => {
    const target = event.target || event;
    const {value} = target;

    if (value.length === 2) {
      previousLength = value.length;
      textInput.value = value + " / ";
    }
  };

  return (
    <Box>
      <Input
        label="Card number"
        name="cardNumber"
        maxLength={100}
        placeholder={'Card Number'}
        type="text"
      />
      <Box display="flex" >
        <Input
          label="Expiration Date"
          name="expirationDate"
          maxLength={7}
          onChange={onCVVChange}
          placeholder={'MM / YY'}
          innerRef={(input) => { console.log(input); textInput = input; }}
          type="text"
        />
        <Space x={0.33} />
        <Input
          label="Security Code"
          name="CVV"
          maxLength={3}
          placeholder={'CVV'}
          type="text"
        />
      </Box>
      <Box display="flex" >
        <Space auto />
        <Button onClick={onCancelClick} >
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Button>
          <FormattedMessage {...buttonMessages.save} />
        </Button>
      </Box>
    </Box>
  );
};

NewCreditCard.DefaultProps = {
  disabled: false,
};

export default connect(
  () => ({
    cards: {}, // state.quotes.all,
  }),
  {},
)(NewCreditCard);
