import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './Place.scss';

const Place = React.createClass({
  propTypes: {
    commentClassName: PropTypes.string,
    place: PropTypes.object.isRequired,
    showComment: PropTypes.bool
  },

  getDefaultProps() {
    return {
      showComment: true
    };
  },

  getId(name) {
    const {
      id,
      placeType: { code }
    } = this.props.place;

    return `${code === 'picking' ? 'pu' : 'do'}${name}-${id}`;
  },

  renderAddress() {
    const {
      contactCompany,
      contactFirstname,
      contactLastname,
      address
    } = this.props.place;

    return (
      <div id={this.getId('Address')}>
        <div className={styles.contact}>
          <span className={styles.contactCompany}>{contactCompany}</span>
          <span className={styles.contactName}>{contactFirstname} {contactLastname}</span>
        </div>
        <div className={styles.address}>
          {address.street}, {address.postcode} {address.city.name}
        </div>
      </div>
    );
  },

  renderComment() {
    const {
      commentClassName,
      place: { comment },
      showComment
    } = this.props;

    if (showComment && comment) {
      return (
        <div
          id={this.getId('Comment')}
          className={cx(styles.comment, commentClassName)}
        >
          {comment}
        </div>
      );
    }
  },

  render() {
    const {
      className,
      place: {
        placeType: { code }
      }
    } = this.props;

    return (
      <div
        id={this.getId('Place')}
        className={cx(code === 'picking' ? styles.placePU : styles.placeDO, className)}
      >
        {this.renderAddress()}
        {this.renderComment()}
      </div>
    );
  }
});

export default Place;
