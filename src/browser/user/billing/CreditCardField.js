/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box, FieldHeader, Button } from '../../app/components';
import { FormattedMessage } from 'react-intl';
import billingMessages from '../../../common/user/billingMessages';
import CreditCardRow from './CreditCardRow';
import NewCreditCard from './NewCreditCard';

class CreditCardField extends React.Component {

  constructor(props: P, context: any) {
    super(props, context);

    this.state = {
      addCardShown: false,
    };

    this.addCreditCardPress = this.addCreditCardPress.bind(this);
  }

  addCreditCardPress() {
    this.setState({ addCardShown: true });
  }

  renderNewCreditCard(addCardShown: boolean) {
    if (!addCardShown) {
      return (
        <Button primary onClick={this.addCreditCardPress}>
          <FormattedMessage {...billingMessages.addCard} />
        </Button>
      );
    }

    return <NewCreditCard onCancelClick={() => this.setState({ addCardShown: false })} />;
  }

  render() {
    return (
      <Box>
        <FieldHeader title={billingMessages.cardTitle} />
        <CreditCardRow />
        { this.renderNewCreditCard(this.state.addCardShown) }
      </Box>
    );
  }
}

CreditCardField.PropTypes = {
  type: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
};

CreditCardField.DefaultProps = {
  disabled: false,
};

export default connect(
  () => ({
    cards: {}, // state.cards.all,
  }),
  {},
)(CreditCardField);
