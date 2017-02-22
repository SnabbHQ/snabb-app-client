/* @flow */
import R from 'ramda';
import React, { PropTypes } from 'react';
import {injectIntl, intlShape} from 'react-intl';
import { PlacesSuggest, Space, Input, Text, Button, Box, Grid, FieldHeader} from '../../app/components';
import jobMessages from '../../../common/delivery/jobMessages';

class PlaceFields extends React.Component {

  constructor(props: P, context: any) {
    super(props, context);

    this.state = {
      collapsed: false,
      search: "",
    };

    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderExpandedFields = this.renderExpandedFields.bind(this);
    this.renderCollapsedFields = this.renderCollapsedFields.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleAddressChange(e) {
    this.setState({search: e.target.value})
  }

  renderEditButton(collapsed) {
    if (this.props.collapsible) {
      return (
        <Button
          marginLeft={2}
          onClick={() => this.setState({ collapsed: !this.state.collapsed })}
        >
          {collapsed ? 'Edit' : 'Save'}
        </Button>
      );
    }

    return null;
  }

  renderFields(collapsed) {
    if (this.props.collapsible && collapsed) {
      return this.renderCollapsedFields();
    } else {
      return this.renderExpandedFields();
    }
  }

  renderExpandedFields() {

    const { search } = this.state;
    const { intl } = this.props;

    return (
      <Box>
        <Box>
          <Grid col={6} pt={2}>
            <Input
              name={`${this.props.placeType}FirstName`}
              placeholder="First Name"
              maxLength={100}
              type="text"
            />
          </Grid>
          <Grid col={6} pt={2} pl={1}>
            <Input
              name={`${this.props.placeType}LastName`}
              maxLength={100}
              placeholder={'Last Name'}
              type="text"
            />
          </Grid>
        </Box>

        <Input
          name={`${this.props.placeType}BusinessName`}
          maxLength={100}
          placeholder={'Business Name'}
          type="text"
        />

        <PlacesSuggest
          search={search}
          textNoResults={intl.formatMessage(jobMessages.noResults)}
          onSelectSuggest={(suggest, coordiante) => { console.log(suggest.description) }}
        >
          <Input
            name={`${this.props.placeType}Address`}
            maxLength={100}
            onChange={this.handleAddressChange}
            placeholder={'Address (e.g. San Vicente, 91, 46001, Valencia)'}
            type="text"
          />
        </PlacesSuggest>

        <Box>
          <Grid col={6}>
            <Input
              name={`${this.props.placeType}Email`}
              maxLength={100}
              placeholder={'Email'}
              type="email"
            />
          </Grid>
          <Grid col={6} pl={1}>
            <Input
              name={`${this.props.placeType}PhoneNumber`}
              labelSize={-1}
              maxLength={100}
              placeholder={'Phone Number'}
              type="text"
            />
          </Grid>
        </Box>

        <Input
          name={`${this.props.placeType}Comments`}
          maxLength={100}
          rows={2}
          placeholder={'Comments for the courier (e.g. leave with the doorman)'}
          type="text"
        />
      </Box>
    );
  }

  renderCollapsedFields() {
    return (
      <Box display="flex" flexDirection="column">
        <Text bold>Javier Tarazaga</Text>
        <Text>Snabb</Text>
        <Text>Av/Navarro Reverter 26, 46004, Valencia</Text>
        <Text>+34661518132</Text>
        <Text>Ring on the bell</Text>
      </Box>
    );
  }

  render() {
    return (
      <Box>
        <Box display="flex" alignItems="center">
          <FieldHeader
            icon={this.props.icon}
            marginBottom={0}
            title={this.props.title}
            titleSize={0}
          />
          <Space auto />
          {/*{this.renderEditButton(this.state.collapsed)}*/}
        </Box>
        {this.renderFields(this.state.collapsed)}
      </Box>
    );
  }
}

PlaceFields.propTypes = {
  collapsible: PropTypes.bool,
  intl: intlShape.isRequired,
  icon: PropTypes.string.isRequired,
  placeType: PropTypes.oneOf(['pickUp', 'dropOff']).isRequired,
  title: PropTypes.object.isRequired,
};

PlaceFields.defaultProps = {
  collapsible: false,
};


export default R.compose(
  injectIntl,
)(PlaceFields);
