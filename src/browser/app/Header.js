/* @flow */
import type { State, User } from '../../common/types';
import React, { PropTypes } from 'react';
import { NewDeliveryButton } from '../job/components';
import { FormattedMessage } from 'react-intl';
import { Fixed, Link, Text, Box, Image } from '../app/components';
import { Space } from '../app/components-old';
import { connect } from 'react-redux';

// $FlowFixMe
const logo = require('../../../assets/images/logo.svg');

// $FlowFixMe
const clientPhoto = require('../../../assets/images/clientPhotoDefaultSmall.svg');


type HeaderProps = {
  viewer: ?User,
};

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const HeaderLink = ({ exactly, to, message }: HeaderLinkProps) => (
  <Link
    antialiasing
    bold
    color="white"
    exactly={exactly}
    marginHorizontal="1.5em"
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

const Header = ({ user }: HeaderProps, { router }: Object) => {
  const onProfileImageClick = () => {
    router.transitionTo('/profile');
  };

  return (
    <Fixed top left right zIndex={5}>
      <Box
        backgroundColor="primary"
        display="flex"
        flexWrap="wrap"
        paddingVertical={0.3}
        boxShadow="0 1px 2px rgba(0,0,0,0.15)"
      >
        <Space x={3} />
        <Box
          display="flex"
          alignItems="center"
        >
          <Image
            alt="Snabb logo"
            height={50}
            width={50}
            src={logo}
          />
          <Space x={1} />
          <Text color="white" size={1}>Snabb</Text>
        </Box>
        <Space auto />
        <Box
          display="flex"
          alignItems="center"
        >
          <NewDeliveryButton />
          <Space x={2} />
          <Image
            height={40}
            width={40}
            alt="Snabb"
            src={clientPhoto}
            onClick={onProfileImageClick}
          />
        </Box>
        <Space x={2} />
      </Box>
    </Fixed>
  );
};

Header.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  (state: State) => ({
    user: state.user,
  }),
)(Header);


// const HeaderLink = ({ exactly, to, message }: HeaderLinkProps) => (
//   <Link
//     bold
//     color="white"
//     exactly={exactly}
//     marginHorizontal="small"
//     to={to}
//   >
//     <FormattedMessage {...message} />
//   </Link>
// )
//
// class Header extends React.Component {
//
//   state: {
//     dropdownOpen: boolean
//   }
//   styles: Object
//   toggle: () => void
//
//
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       dropdownOpen: false
//     }
//
//     this.styles = {
//       toolbar: {
//         zIndex: 1,
//         justifyContent: 'space-between',
//         flexWrap: 'wrap',
//         boxShadow: '0 2px 6px 0 rgba(0,0,0,.50)',
//         webkitBoxShadow: '0 2px 6px 0 rgba(0,0,0,.50)',
//         mozBoxShadow: '0 2px 6px 0 rgba(0,0,0,.50)',
//       },
//       headerLink: {
//         hover: {borderRadius: 4, },//backgroundColor: rebass.colors.grey},
//         active: {}//color: rebass.colors.accent},
//       }
//     }
//
//     this.toggle = this.toggle.bind(this)
//   }
//
//   toggle(key) {
//     return (e) => {
//       const val = !this.state[key]
//       this.setState({ [key]: val })
//     }
//   }
//
//   render() {
//     return (
//
// <Toolbar style={this.styles.toolbar}>
//   <Flex align="center">
//     <Space x={2}/>
//     <Image
//       alt="Snabb"
//       src={logo}/>
//     <Space x={4}/>
//     <Link p={1} inverted exactly style={this.styles.headerLink} to="/">
//       <FormattedMessage {...linksMessages.active} />
//     </Link>
//     <Space x={2}/>
//     <Link p={1} inverted exactly style={this.styles.headerLink} to="/scheduled">
//       <FormattedMessage {...linksMessages.scheduled} />
//     </Link>
//     <Space x={2}/>
//     <Link p={1} inverted exactly style={this.styles.headerLink} to="/Past">
//       <FormattedMessage {...linksMessages.past} />
//     </Link>
//     <Space x={2}/>
//   </Flex>
//   <Flex>
//     <NewDeliveryButton/>
//     <Space x={2}/>
//     <Dropdown>
//       <Image
//         alt="Snabb"
//         src={clientPhoto}
//         onClick={this.toggle('dropdownOpen')}/>
//       <DropdownMenu
//         onDismiss={this.toggle('dropdownOpen')}
//         open={this.state.dropdownOpen}>
//         <NavItem is="a">
//           Settings
//         </NavItem>
//         <NavItem is="a">
//           Logout
//         </NavItem>
//       </DropdownMenu>
//     </Dropdown>
//   </Flex>
// </Toolbar>
//     )
//   }
//
// }
//
// Header.propTypes = {
//   viewer: React.PropTypes.object,
// }

// export default connect(
//   (state: State) => ({}),
// )(Header)

