import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import some from 'lodash/some';
import toString from 'lodash/toString';
import AccountDetailsFields from './components/AccountDetailsFields';
import AccountPasswordFields from './components/AccountPasswordFields';
import Card from '../app/components-old/Card';
import Button from '../app/components-old/Button';
import {
  setClientGeneralValue,
  updateClient,
  setClientPasswordValue,
  updateClientPassword
} from '../../common/user/profile/actions/clientActions';
import layoutStyles from '../app/styles/layout.scss';
import gridStyles from '../app/styles/grid.scss';

const GENERAL_FIELDS = [
  'photo',
  'company_name',
  'firstname',
  'lastname',
  'email',
  'phone'
];

const AccountDetailsPage = React.createClass({
  componentDidMount() {
    this.props.setClientGeneralValue(this.props.client);
  },

  handleChange(generalValue) {
    this.props.setClientGeneralValue(generalValue);
  },

  handlePasswordChange(passwordValue) {
    this.props.setClientPasswordValue(passwordValue);
  },

  handleSubmit(e) {
    e.preventDefault();

    // TODO: handle error messages #204

    this.props.updateClient(this.props.generalValue);
  },

  handlePasswordSubmit(e) {
    e.preventDefault();

    // TODO: handle error messages #204

    this.props.updateClientPassword(this.props.passwordValue);
  },

  render() {
    const  {
      client,
      generalValue,
      generalIsSaving,
      passwordValue,
      passwordIsSaving
    } = this.props;

    const generalIsDirty = some(GENERAL_FIELDS, k => toString(client[k]) !== toString(generalValue[k]));
    const generalIsDisabled = generalIsSaving || !generalIsDirty;

    const passwordIsDisabled = passwordIsSaving || !passwordValue.password || !passwordValue.current_password;

    return (
      <div className={gridStyles.row}>
        <div className={gridStyles.col12}>
          <Card>
            <form onSubmit={this.handleSubmit}>
              <AccountDetailsFields
                client={client}
                value={generalValue}
                onChange={this.handleChange} />
              <Button
                type='submit'
                kind='primary'
                disabled={generalIsDisabled}
                className={[layoutStyles.pullRight, layoutStyles.mtl].join(' ')}
              >
                <FormattedMessage
                  id='saveChanges'
                  defaultMessage='Save changes' />
              </Button>
            </form>
          </Card>

          <Card>
            <form onSubmit={this.handlePasswordSubmit}>
              <AccountPasswordFields
                value={passwordValue}
                onChange={this.handlePasswordChange} />
              <Button
                type='submit'
                kind='primary'
                disabled={passwordIsDisabled}
                className={[layoutStyles.pullRight, layoutStyles.mtl].join(' ')}
              >
                <FormattedMessage
                  id='AccountDetailsForm.updatePassword'
                  defaultMessage='Update password' />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const {
    client,
    accountDetailsSettings
  } = state;

  return {
    client,
    ...accountDetailsSettings
  };
}

export default connect(mapStateToProps, {
  setClientGeneralValue,
  updateClient,
  setClientPasswordValue,
  updateClientPassword
})(AccountDetailsPage);
