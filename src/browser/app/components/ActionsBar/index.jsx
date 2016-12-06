import React from 'react';
import styles from './ActionsBar.scss';

const ActionsBar = React.createClass({
  render() {
    const buttons = React.Children.map(this.props.children, (button, i) => {
      return React.cloneElement(button, {
        key: `button-${i}`,
        className: styles.button
      });
    });

    return <div className={styles.bar}>{buttons}</div>;
  }
});

export default ActionsBar;
