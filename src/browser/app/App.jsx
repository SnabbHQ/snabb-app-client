/* @flow */
import type {State} from "../../common/types"
import {provideHooks} from "redial"

// $FlowFixMe
import "./App.css"
import * as themes from "./themes"
import Header from "./Header"
import Helmet from "react-helmet"
import R from "ramda"
import React from "react"
import favicon from "../../common/app/favicon"
import start from "../../common/app/start"
import {Box, Container, Flex} from "../app/components-old"
import {Match} from "../../common/app/components"
import { ThemeProvider } from './components';
import {Miss} from "react-router"
import {connect} from "react-redux"

// Pages
import ActivePage from "../job/active/ActiveJobsPage"
import ScheduledPage from "../job/scheduled/ScheduledJobsPage"
import NewJobPage from "../job/new/NewJobPage"
import NotFoundPage from "../notfound/NotFoundPage"

const styles = {
  container: {
    minHeight: '100vh',
  },
  page: {
    paddingTop: 35,
    flex: 1
  },
};

const theme = (currentTheme) => themes[currentTheme || 'defaultTheme'] || themes.defaultTheme;

type AppProps = {
  currentLocale: string,
  currentTheme: ?string,
};

const App = ({currentLocale, currentTheme}: AppProps) => (
  <ThemeProvider
    key={currentTheme}
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
      <Flex flexColumn style={styles.container}>
        <Header/>
        <Box style={styles.page}>
          <Match exactly pattern="/" component={ActivePage}/>
          <Match exactly pattern="/active" component={ActivePage}/>
          <Match exactly pattern="/new" component={NewJobPage}/>
          <Match exactly pattern="/scheduled" component={ScheduledPage}/>
          <Miss component={NotFoundPage}/>
        </Box>
      </Flex>
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
