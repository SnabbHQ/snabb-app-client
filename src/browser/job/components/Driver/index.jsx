import React, { PropTypes } from 'react';
import defaultDriverImage from '../../../../../assets/images/defaultDriver.svg';
import styles from './Driver.scss';

const Driver = React.createClass({
  propTypes: {
    driver: PropTypes.object
  },

  getDefaultProps() {
    return {
      driver: {}
    };
  },

  renderPicture() {
    const { picturePath } = this.props.driver;

    if (picturePath) {
      return (
        <div
          className={styles.pictureMask}
          style={{ backgroundImage: `url(${picturePath})` }} />
      );
    }

    return <img className={styles.defaultPicture} src={defaultDriverImage} />;
  },

  render() {
    const {
      firstname,
      lastnameInitial,
      phone,
      email
    } = this.props.driver;
    const contact = phone || email;

    return (
      <div>
        <div className={styles.picture}>
          {this.renderPicture()}
        </div>
        <div className={styles.contact}>
          <p><strong>{firstname} {lastnameInitial}</strong></p>
          <p>{contact}</p>
        </div>
      </div>
    );
  }
});

export default Driver;
