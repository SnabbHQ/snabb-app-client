import React, { PropTypes } from 'react';
import styles from './Button2.scss';
import cx from 'classnames';

const Button = React.createClass({
  propTypes: {
    block: PropTypes.bool,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    kind: PropTypes.string.isRequired,
    type: PropTypes.string
  },

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      block: false,
      disabled: false,
      type: 'button'
    };
  },

  handleClick(e) {
    if (this.props.onClick) {
      return this.props.onClick(e);
    } else if (this.props.to) {
      e.preventDefault();

      return this.context.router.push({
        pathname: this.props.to
      });
    }
  },

  render () {
    const { block, className, disabled, kind, size, ...otherProps } = this.props;

    const classes = [className];
    classes.push(disabled ? styles.disabled : styles[kind]);

    const c = cx({
      [classes.join(' ')]: true,
      [styles.block]: block,
      [styles.small]: size === 's'
    });
    return (
      <button
        {...otherProps}
        className={c}
        disabled={disabled}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    );
  }
});

export default Button;
