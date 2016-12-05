import React, { PropTypes } from 'react';
import styles from './Card.scss';
import cx from 'classnames';

const Card = React.createClass({
  propTypes: {
    shadow: PropTypes.bool,
    compact: PropTypes.bool
  },

  getDefaultProps() {
    return {
      shadow: false,
      compact: false
    };
  },

  renderTitle(title) {
    return title && <h1 className={styles.title}>{title}</h1>;
  },

  render() {
    const { title, children } = this.props;

    const c = cx(this.props.className, {
      [styles.card]: true,
      [styles.cardShadow]: this.props.shadow,
      [styles.cardPadding]: !this.props.compact
    });

    return (
      <div
        id={this.props.id}
        className={c}
        onClick={this.props.onClick}
      >
        {this.renderTitle(title)}
        {children}
      </div>
    );
  }
});

export default Card;
