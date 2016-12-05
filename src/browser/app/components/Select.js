import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './Select.scss';

const Select = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  },

  handleChange(e) {
    this.props.onChange(e.target.value);
  },

  render() {
    return (
      <select
        {...this.props}
        className={cx(this.props.className, styles.select)}
        onChange={this.handleChange}
      >
        {this.props.options.map((o, i) => (
          <option key={`option-${i}`} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }
});

export default Select;
