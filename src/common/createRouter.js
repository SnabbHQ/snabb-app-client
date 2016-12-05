import React from 'react';
import { IndexRoute, Route } from 'react-router';
import AccountDetailsPage from './containers/AccountDetailsPage';
import ActiveJobsPage from './containers/ActiveJobsPage';
import ScheduledJobsPage from './containers/ScheduledJobsPage';
import App from './containers/App';
import AuthPage from './containers/AuthPage';
import BillingPage from './containers/BillingPage';
import JobsHistoryPage from './containers/JobsHistoryPage';
import NewJobPage from './containers/NewJobPage';
import SettingsPage from './containers/SettingsPage';

export default function createRoutes(store) {
  const isAuthenticated = () => !!store.getState().client.token;

  function redirectToLogIn(nextState, replace) {
    if (!isAuthenticated()) { replace('/log-in'); }
  }

  function redirectToActiveJobs(nextState, replace) {
    if (isAuthenticated()) { replace('/active'); }
  }

  function redirect(nextState, replace) {
    if (nextState.location.pathname !== '/') { return; }

    if (isAuthenticated()) {
      replace('/active');
    } else {
      replace('/log-in');
    }
  }

  function redirectSettings(nextState, replace) {
    if (nextState.location.pathname === '/settings') {
      replace('/settings/account-details');
    }
  }

  return (
    <Route path='/'>
      <IndexRoute onEnter={redirect} />

      <Route path='log-in' component={AuthPage} onEnter={redirectToActiveJobs} />
      <Route path='sign-up' component={AuthPage} onEnter={redirectToActiveJobs} />
      <Route path='password-reset' component={AuthPage} onEnter={redirectToActiveJobs} />

      <Route path='' component={App} onEnter={redirectToLogIn}>
        <Route path='active' component={ActiveJobsPage} />
        <Route path='scheduled' component={ScheduledJobsPage} />
        <Route path='history' component={JobsHistoryPage} />
        <Route path='new' component={NewJobPage} />

        <Route path='settings' component={SettingsPage}>
          <IndexRoute onEnter={redirectSettings} />

          <Route path='account-details' component={AccountDetailsPage} />
          <Route path='billing' component={BillingPage} />
        </Route>
      </Route>
    </Route>
  );
}
