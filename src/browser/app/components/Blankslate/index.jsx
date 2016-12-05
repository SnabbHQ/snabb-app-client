import React, { PropTypes } from 'react';
import styles from './Blankslate.scss';

const Blankslate = React.createClass({
  propTypes: {
    icon: PropTypes.string,
    actions: PropTypes.node,
    subtitle: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired
  },

  renderIcon() {
    const { icon } = this.props;

    if (icon) {
      return <img className={styles.icon} src={icon} />;
    }
  },

  renderActions() {
    const { actions } = this.props;

    if (actions) {
      return <div className={styles.actions}>{actions}</div>;
    }
  },

  render() {
    return (
      <div className={styles.blankslate}>
        {this.renderIcon()}
        <h1 className={styles.title}>{this.props.title}</h1>
        <p className={styles.subtitle}>{this.props.subtitle}</p>
        {this.renderActions()}
      </div>
    );
  }
});

export default Blankslate;
