import React, { PropTypes } from 'react';
import styles from './Controls.scss';
import zorro from '../../lib/zorro';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

const Text = React.createClass({
  propTypes: {
    debounce: PropTypes.number,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  },

  getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  componentWillMount() {
    if (this.props.mask) {
      this.formatValue = zorro(this.props.mask);
    } else {
      this.formatValue = (v) => v;
    }

    if (this.props.debounce) {
      this.debouncedOnChange = debounce(this.props.onChange, this.props.debounce);
    } else {
      this.debouncedOnChange = this.props.onChange;
    }
  },

  componentDidMount() {
    // Browsers do not trigger change event for autofilled value, so we capture
    // the value when the component is mounted.
    const autofilledValue = this.refs.input.value;

    // Bails out if there is no autofilled value.
    if (!autofilledValue) { return; }

    // We wait a bit before calling the `onChange` handler to be sure that all
    // autofilled values have been captured.
    setTimeout(() => {
      this.props.onChange(autofilledValue);
    }, 100);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }

    if (this.props.mask !== nextProps.mask) {
      this.formatValue = zorro(nextProps.mask);
      this.setState({ value: this.formatValue(nextProps.value) });
    }
  },

  handleChange(e) {
    const formattedValue = this.formatValue(e.target.value);

    this.setState({ value: formattedValue });
    this.debouncedOnChange(formattedValue);
  },

  handleBlur() {
    if (this.debouncedOnChange.flush) {
      this.debouncedOnChange.flush();
    }
  },

  render() {
    // remove extraneous props to avoid "unknown prop in input" warning
    const props = omit(this.props, ['intl', 'debounce']);

    return (
      <input
        {...props}
        ref='input'
        className={[this.props.className, styles.textInput].join(' ')}
        value={this.state.value || ''}
        type={this.props.type || 'text'}
        onChange={this.handleChange}
        onBlur={this.handleBlur} />
    );
  }
});

export default Text;
