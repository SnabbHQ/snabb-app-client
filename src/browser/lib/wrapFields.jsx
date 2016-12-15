import React, { PropTypes } from 'react';
import reduce from 'lodash/reduce';
import { intlShape, injectIntl } from 'react-intl';
import invariant from 'invariant';
import { camelize } from 'humps';
import Autocomplete from '../app/components-old/Autocomplete';
import Checkbox from '../app/components-old/Checkbox/index';
import Select from '../app/components-old/Select/index';
import Text from '../app/components-old/Text/index2';
import TransportPicker from '../job/components/TransportPicker/index';
import { default as Phone } from '../job/components/PhoneInput';
import { default as Photo } from '../job/components/PhotoInput/index';

const CONTROLS = {
  Autocomplete,
  Checkbox,
  Phone,
  Photo,
  Select,
  Text,
  TransportPicker
};

const renderersPropTypes = reduce(CONTROLS, (m, ControlComponent, controlName) => {
  m[`render${controlName}`] = PropTypes.func.isRequired;
  return m;
}, {});

export const wrappedFieldsPropTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  renderers: PropTypes.shape(renderersPropTypes).isRequired
};

const TRANSLATABLE_PROPERTIES = ['label', 'placeholder', 'help'];

export default function wrapFields(SourceFields, { messages }) {
  const sourceName = SourceFields.displayName || SourceFields.name || 'Fields';

  invariant(
    SourceFields.propTypes.value,
    `Expected "value" propTypes to to be specified in "${sourceName}"`
  );

  const WrappedForm = React.createClass({
    propTypes: {
      intl: intlShape.isRequired,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.object.isRequired
    },

    handleChange(k, v) {
      if (this.props.value[k] === v) { return; }

      this.props.onChange({
        ...this.props.value,
        [k]: v
      });
    },

    getFieldDefaultProperties(name) {
      const { formatMessage } = this.props.intl;

      const translatedProperties = reduce(TRANSLATABLE_PROPERTIES, (m, p) => {
        const message = messages[camelize(`${name}-${p}`)];
        if (message) {
          m[p] = formatMessage(message);
        }

        return m;
      }, {});

      return {
        name,
        value: this.props.value[name],
        onChange: this.handleChange.bind(this, name),
        ...translatedProperties
      };
    },

    getRenderers() {
      return reduce(CONTROLS, (m, ControlComponent, controlName) => {
        m[`render${controlName}`] = this.renderField.bind(this, ControlComponent);
        return m;
      }, {
        renderField: this.renderField
      });
    },

    renderField(Component, name, props) {
      return (
        <Component
          intl={this.props.intl}
          id={name}
          {...this.getFieldDefaultProperties(name)}
          {...props} />
      );
    },

    render() {
      return (
        <SourceFields
          {...this.props}
          renderers={this.getRenderers()}
          onChange={this.handleChange} />
      );
    }
  });

  WrappedForm.displayName = `wrapFields(${sourceName})`;

  return injectIntl(WrappedForm);
};
