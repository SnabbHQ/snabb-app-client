/* @flow */
import React, { PropTypes } from 'react';
import { Input, Text, Button, Box, Grid, FieldHeader} from '../../app/components';
import { Space } from '../../app/components-old';

class PlaceFields extends React.Component {

  constructor(props: P, context: any) {
    super(props, context);

    this.state = {
      collapsed: false,
    };

    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderExpandedFields = this.renderExpandedFields.bind(this);
    this.renderCollapsedFields = this.renderCollapsedFields.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
  }

  onInputKeyDown() {
    // TODO
  }

  renderEditButton(collapsed) {
    if (this.props.collapsible) {
      return (
        <Button
          marginLeft="2em"
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
    return (
      <Box>
        <Box>
          <Grid col={6} pt={2}>
            <Input
              name={`${this.props.placeType}FirstName`}
              label="First Name"
              labelSize={-1}
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              type="text"
            />
          </Grid>
          <Grid col={6} pt={2} pl={2}>
            <Input
              name={`${this.props.placeType}LastName`}
              label="Last Name"
              labelSize={-1}
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              placeholder={''}
              type="text"
            />
          </Grid>
        </Box>

        <Input
          name={`${this.props.placeType}BusinessName`}
          label="Business Name"
          labelSize={-1}
          maxLength={100}
          onKeyDown={this.onInputKeyDown}
          placeholder={''}
          type="text"
        />

        <Input
          name={`${this.props.placeType}Address`}
          label="Address*"
          labelSize={-1}
          maxLength={100}
          onKeyDown={this.onInputKeyDown}
          placeholder={'e.g. San Vicente, 91, 46001, Valencia'}
          type="text"
        />

        <Box>
          <Grid col={6}>
            <Input
              name={`${this.props.placeType}Email`}
              label="Email"
              labelSize={-1}
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              placeholder={''}
              type="email"
            />
          </Grid>
          <Grid col={6} pl={2}>
            <Input
              name={`${this.props.placeType}PhoneNumber`}
              label="Phone Number"
              labelSize={-1}
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              placeholder={''}
              type="text"
            />
          </Grid>
        </Box>

        <Input
          name={`${this.props.placeType}Comments`}
          label="Comments for the courier"
          labelSize={-1}
          maxLength={100}
          onKeyDown={this.onInputKeyDown}
          placeholder={'e.g. leave with the doorman'}
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
          <FieldHeader icon={this.props.icon} title={this.props.title} />
          <Space auto />
          {this.renderEditButton(this.state.collapsed)}
        </Box>
        {this.renderFields(this.state.collapsed)}
      </Box>
    );
  }
}

PlaceFields.propTypes = {
  title: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  placeType: PropTypes.oneOf(['pickUp', 'dropOff']).isRequired,
  collapsible: PropTypes.bool,
};

PlaceFields.defaultProps = {
  collapsible: false,
};

export default PlaceFields;
