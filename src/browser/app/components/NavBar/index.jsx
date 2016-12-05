import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import map from 'lodash/map';
import { FormattedMessage } from 'react-intl';
import Dropdown, { Item as DropdownItem } from '../../components/Dropdown';
import RequestJobButton from '../../../job/components/RequestJobButton';
import analytics from '../../../../common/lib/analytics';
import { logOut } from '../../../../common/user/auth/actions2';
import styles from './Navbar.scss';
import gridStyles from '../../styles/grid.scss';
import logo from '../../../assets/images/logo.svg';
import clientPhotoDefaultSmall from '../../../assets/images/clientPhotoDefaultSmall.svg';
import cogIcon from '../../../assets/images/cogIcon.svg';
import logOutIcon from '../../../assets/images/logOutIcon.svg';

const ITEMS = {
  active: {
    to: '/active',
    label: <FormattedMessage id='navbar.active' defaultMessage='Active' />
  },
  scheduled: {
    to: '/scheduled',
    label: <FormattedMessage id='navbar.scheduled' defaultMessage='Scheduled' />
  },
  history: {
    to: '/history',
    label: <FormattedMessage id='navbar.history' defaultMessage='History' />
  }
};

const POSITION = 'navbar';

function trackNavbarLink(key) {
  analytics.track(`Clicked the ${key} link`, {
    category: analytics.NAVIGATION_CATEGORY,
    position: POSITION
  });
}

function renderNavbarItem(item, key) {
  return (
    <li key={`item-${key}`} className={styles.item}>
      <Link
        to={item.to}
        className={styles.itemLink}
        activeClassName={'fuck ' + styles.itemLinkActive}
        onClick={trackNavbarLink.bind(null, key)}
      >
        {item.label}
      </Link>
    </li>
  );
}

const Navbar = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  goToSettingsPage(e) {
    e.preventDefault();

    trackNavbarLink('settings');
    this.context.router.push({ pathname: '/settings' });
  },

  render() {
    return (
      <nav className={gridStyles.containerFluid}>
        <div className={gridStyles.row}>
          <div className={gridStyles.col12}>
            <img src={logo} className={styles.logo} />

            <ul className={styles.items}>
              {map(ITEMS, renderNavbarItem)}
            </ul>

            <div className={styles.rightItems}>
              <RequestJobButton id='newJob' position={POSITION} />
              <Dropdown
                button={(
                  <img
                    id='accountMenuButton'
                    className={styles.accountMenuButton}
                    src={this.props.clientPhotoUrl} />
                )}
                position='bottom right'>
                <DropdownItem
                  id='navbarLinkSettings'
                  onClick={this.goToSettingsPage}
                  iconSrc={cogIcon}
                >
                  <FormattedMessage id='navbar.settings' defaultMessage='Settings' />
                </DropdownItem>
                <DropdownItem
                  tagName='button'
                  id='navbarLinkLogOut'
                  onClick={this.props.logOut}
                  iconSrc={logOutIcon}>
                  <FormattedMessage id='navbar.logOut' defaultMessage='Log out' />
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    );
  }
});

function mapStateToProps(state) {
  const { picturePathDerived: ppd } = state.client;


  return {
    clientPhotoUrl: ppd ? `${ppd}?w=34&h=34&fit=crop` : clientPhotoDefaultSmall
  };
}

export default connect(mapStateToProps, { logOut }, null, { pure: false })(Navbar);
