import React from 'react';
import ReactModal from 'react-modal';
import ActionsBar from '../ActionsBar';
import styles from './Modal.scss';
import layoutStyles from '../../styles/layout.scss';
import warningRed from '../../../../../assets/images/warningRed.svg';

const Modal = React.createClass({
  render() {
    return (
      <ReactModal
        {...this.props}
        className={[styles.modal, this.props.className].join(' ')}
        overlayClassName={[styles.overlay, layoutStyles.centered, this.props.overlayClassName].join(' ')} />
    );
  }
});

export default Modal;

export const ConfirmModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} className={styles.confirmModal}>
        <div className={styles.content}>
          <img className={styles.icon} src={warningRed} />
          {this.props.children}
        </div>

        {/*
         Set children prop explicitly so that we do not have to set the key
         prop on every buttons
         */}
        <ActionsBar children={this.props.buttons} />
      </Modal>
    );
  }
});

export const SubmitModal = React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit();
  },

  render() {
    const {
      title,
      children,
      buttons,
      ...otherProps
    } = this.props;

    const header = title && (
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>{title}</h2>
        </div>
      );
    return (
      <Modal {...otherProps} className={styles.submitModal}>
        {/*
         Use a form so that we can the enter key to trigger onSubmit.
         */}
        <form onSubmit={this.handleSubmit}>
          {header}

          <div className={styles.content}>{children}</div>
          {/*
           Set children prop explicitly so that we do not have to set the key
           prop on every buttons
           */}
          <ActionsBar children={buttons} />
        </form>
      </Modal>
    );
  }
});
