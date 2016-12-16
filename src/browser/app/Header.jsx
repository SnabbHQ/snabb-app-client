/* @flow */
import type {State, User} from "../../common/types"
import React from "react"
import linksMessages from "../../common/app/linksMessages"
import {NewDeliveryButton} from '../job/components'
import {FormattedMessage} from "react-intl"
import {Link, Box, Image} from "../app/components"
import {Fixed, Space} from "../app/components-old"
import {connect} from "react-redux"

// $FlowFixMe
const logo = require('../../../assets/images/logo.svg')

// $FlowFixMe
const clientPhoto = require('../../../assets/images/clientPhotoDefaultSmall.svg')


type HeaderProps = {
  viewer: ?User,
};

type HeaderLinkProps = {
  exactly?: boolean,
  to: string,
  message: Object,
};

const HeaderLink = ({exactly, to, message}: HeaderLinkProps) => (
  <Link
    bold
    color="white"
    exactly={exactly}
    marginHorizontal="1.5em"
    to={to}
  >
    <FormattedMessage {...message} />
  </Link>
);

const Header = ({viewer}: HeaderProps) => (
  <Fixed top left right zIndex={2}>
    <Box
      backgroundColor="primary"
      display="flex"
      flexWrap="wrap"
      marginBottom={0.5}
      paddingVertical={0.5}
    >
      <Space x={2}/>
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
        <Space x={2}/>
        <HeaderLink exactly to="/" message={linksMessages.active}/>
        <HeaderLink to="/scheduled" message={linksMessages.scheduled}/>
        <HeaderLink to="/past" message={linksMessages.past}/>
      </Box>
      <Space auto/>
      <Box
        display="flex"
        alignItems="center"
      >
        <NewDeliveryButton/>
        <Space x={2}/>
        <Image
          height={40}
          width={40}
          alt="Snabb"
          src={clientPhoto}/>
      </Box>
      <Space x={2}/>
    </Box>
  </Fixed>
);

export default connect(
  (state: State) => ({
    viewer: {}//state.users.viewer,
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



