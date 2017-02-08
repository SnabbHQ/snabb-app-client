/* @flow */
import type { State } from '../../common/types';
import * as themes from './themes';
import Page from './Page';
import Helmet from 'react-helmet';
import R from 'ramda';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Miss } from 'react-router';
import { Container, ThemeProvider, Box } from './components';
import { connect } from 'react-redux';

// Pages
import ActivePage from '../job/active/ActiveJobsPage';
import HistoryPage from '../job/history/HistoryPage';
import NewJobPage from '../job/new/NewDeliveryPage';
import SettingsPage from '../user/SettingsPage';
import LogInPage from '../auth/LogInPage';
import RegisterPage from '../user/register/RegisterPage';
import ResetPasswordPage from '../user/resetPassword/ResetPasswordPage';
import ForgotPassword from '../user/forgotPassword/ForgotPasswordPage';
import VerifyUserPage from '../user/verifyUser/VerifyUserPage';

import SplashScreen from './SplashScreen';

import NotFoundPage from '../notfound/NotFoundPage';

const theme = (currentTheme) => themes[currentTheme || 'defaultTheme'] || themes.defaultTheme;

type AppProps = {
  currentLocale: string,
  currentTheme: ?string,
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      renderApp: false
    }
  }

  componentDidMount() {

    // Crappy solution for now for the problem that the application gets rendered straight away from the server but
    // takes a while to init in the client due to init things like localforage to restore app state.
    setTimeout(() => this.setState({ renderApp: true }), 1000);
  }

  renderSplashScreen(currentTheme) {
    return <Box
      backgroundColor={theme(currentTheme).body.backgroundColor}
      flex={1} // make footer sticky
    >
      <SplashScreen/>
    </Box>
  }

  renderApp(currentTheme) {
    return (
      <Box
        backgroundColor={theme(currentTheme).body.backgroundColor}
        flex={1} // make footer sticky
      >
        <Page authorized exactly pattern="/" component={ActivePage} includeHeader />
        <Page authorized pattern="/active" component={ActivePage} includeHeader />
        <Page authorized pattern="/new" component={NewJobPage} includeHeader />
        <Page authorized pattern="/history" component={HistoryPage} includeHeader />
        <Page authorized pattern="/settings" component={SettingsPage} includeHeader />
        <Page pattern="/login" component={LogInPage} />
        <Page pattern="/register" component={RegisterPage} />
        <Page pattern="/forgotPassword" component={ForgotPassword} />
        <Page pattern="/resetPassword/:hash" component={ResetPasswordPage} />
        <Page pattern="/activate/:hash" component={VerifyUserPage} />
        <Miss component={NotFoundPage} />
      </Box>
    );
  }

  render() {
    const { currentLocale, currentTheme }: AppProps = this.props;

    return (
      <ThemeProvider
        // TODO: Do we need it?
        // key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
        theme={theme(currentTheme)}
      >
        <Container>
          <Helmet
            htmlAttributes={{ lang: currentLocale }}
            meta={[
          // v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
          { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
          ...favicon.meta,
        ]}
            link={[
          ...favicon.link,
        ]}
          />

          { this.state.renderApp ? this.renderApp(currentTheme) : this.renderSplashScreen(currentTheme) }

        </Container>
      </ThemeProvider>
    );
  }
}

export default R.compose(
  connect(
    (state: State) => ({
      currentLocale: state.intl.currentLocale,
      currentTheme: state.themes.currentTheme,
    }),
  ),
  start,
)(App);
