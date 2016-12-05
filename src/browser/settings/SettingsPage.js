import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import camelCase from 'lodash/camelCase';
import { FormattedMessage, defineMessages } from 'react-intl';
import configuration from '../../../configuration';
import styles from './SettingsPage.scss';
import layoutStyles from '../../../styles/layout.scss';
import gridStyles from '../../../styles/grid.scss';

const MESSAGES = defineMessages({
  accountDetails: {
    id: 'settingsNavbar.accountDetails',
    defaultMessage: 'Account details'
  },
  billing: {
    id: 'settingsNavbar.billing',
    defaultMessage: 'Billing'
  },
  api: {
    id: 'settingsNavbar.api',
    defaultMessage: 'API'
  }
});

const SettingsPage = ({ children, clientAdminApiUrl, route }) => {
  return (
    <div className={layoutStyles.content}>
      <div className={gridStyles.container}>
        <div className={[gridStyles.row, layoutStyles.mtl].join(' ')}>
          <div className={gridStyles.col2}>
            <ul>
              {route.childRoutes.map(({ path }) =>
                <li key={path}>
                  <Link
                    to={`/${route.path}/${path}`}
                    className={styles.itemLink}
                    activeClassName={styles.itemLinkActive}
                  >
                    <FormattedMessage {...MESSAGES[camelCase(path)]} />
                  </Link>
                </li>
              )}
              <li>
                <a href={clientAdminApiUrl} className={styles.itemLink}>
                  <FormattedMessage {...MESSAGES.api} />
                </a>
              </li>
            </ul>
          </div>
          <div className={gridStyles.col10}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { token } = state.client;

  return {
    clientAdminApiUrl: `${configuration.stuartDashboardUrl}/api?access_token=${token}`
  };
}

export default connect(mapStateToProps)(SettingsPage);
