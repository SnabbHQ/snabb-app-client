/* @flow */
import React, { PropTypes } from 'react';
import { Space, Input, Text, Button, Box, Grid, FieldHeader} from '../../app/components';

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
          primary
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
    return (
      <Box>
        <Box>
          <Grid col={6} pt={2}>
            <Input
              name={`${this.props.placeType}FirstName`}
              placeholder="First Name"
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              type="text"
            />
          </Grid>
          <Grid col={6} pt={2} pl={2}>
            <Input
              name={`${this.props.placeType}LastName`}
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              placeholder={'Last Name'}
              type="text"
            />
          </Grid>
        </Box>

        <Input
          name={`${this.props.placeType}BusinessName`}
          maxLength={100}
          onKeyDown={this.onInputKeyDown}
          placeholder={'Business Name'}
          type="text"
        />

        <Input
          name={`${this.props.placeType}Address`}
          maxLength={100}
          onKeyDown={this.onInputKeyDown}
          placeholder={'Address (e.g. San Vicente, 91, 46001, Valencia)'}
          type="text"
        />

        <Box>
          <Grid col={6}>
            <Input
              name={`${this.props.placeType}Email`}
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              placeholder={'Email'}
              type="email"
            />
          </Grid>
          <Grid col={6} pl={2}>
            <Input
              name={`${this.props.placeType}PhoneNumber`}
              labelSize={-1}
              maxLength={100}
              onKeyDown={this.onInputKeyDown}
              placeholder={'Phone Number'}
              type="text"
            />
          </Grid>
        </Box>

        <Input
          name={`${this.props.placeType}Comments`}
          maxLength={100}
          onKeyDown={this.onInputKeyDown}
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
