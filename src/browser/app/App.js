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
import ScheduledPage from '../job/scheduled/ScheduledDeliveriesPage';
import NewJobPage from '../job/new/NewDeliveryPage';
import ProfilePage from '../user/ProfileContainer';
import LogInPage from '../auth/LogInPage';
import RegisterPage from '../auth/RegisterPage';
import ResetPassword from '../auth/ResetPasswordPage';
import NotFoundPage from '../notfound/NotFoundPage';

const theme = (currentTheme) => themes[currentTheme || 'defaultTheme'] || themes.defaultTheme;

type AppProps = {
  currentLocale: string,
  currentTheme: ?string,
};


const App = ({ currentLocale, currentTheme }: AppProps) => (
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
          // Test vertical rhythm.
          //{
          //  href: `http://basehold.it/${theme(currentTheme).text.lineHeight}`,
          //  rel: 'stylesheet',
          //},
        ]}
      />
      <Box
        backgroundColor={theme(currentTheme).colors.bodyBackground}
        flex={1} // make footer sticky
      >
        <Page authorized exactly pattern="/" component={ActivePage} includeHeader />
        <Page authorized pattern="/active" component={ActivePage} includeHeader />
        <Page authorized pattern="/new" component={NewJobPage} includeHeader />
        <Page authorized pattern="/history" component={ScheduledPage} includeHeader />
        <Page authorized pattern="/profile" component={ProfilePage} includeHeader />
        <Page pattern="/login" component={LogInPage} />
        <Page pattern="/register" component={RegisterPage} />
        <Page pattern="/resetPassword" component={ResetPassword} />
        <Miss component={NotFoundPage} />
      </Box>
    </Container>
  </ThemeProvider>
);

export default R.compose(
  connect(
    (state: State) => ({
      currentLocale: state.intl.currentLocale,
      currentTheme: state.themes.currentTheme,
    }),
  ),
  start,
)(App);
