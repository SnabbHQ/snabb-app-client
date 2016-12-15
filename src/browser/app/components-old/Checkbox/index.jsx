import React, { PropTypes } from 'react';
import styles from './Checkbox.scss';

const Checkbox = React.createClass({
  propTypes: {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool
  },

  handleChange(e) {
    this.props.onChange(e.target.checked, e);
  },

  render() {
    return (
      <div className={[styles.control, styles.checkbox].join(' ')}>
        <label>
          <input
            {...this.props}
            type='checkbox'
            checked={this.props.value}
            onChange={this.handleChange} />
          <span className={styles.checkboxLabel}>{this.props.label}</span>
        </label>
      </div>
    );
  }
})

export default Checkbox
