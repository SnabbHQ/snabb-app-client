import React from 'react';
import { IndexRoute, Route } from 'react-router';
import AccountDetailsPage from './user/AccountDetailsPage';
import ActiveJobsPage from './job/active/ActiveJobsPage';
import ScheduledJobsPage from './job/ScheduledJobsPage';
import App from './app/App2';
import AuthPage from './user/AuthPage';
import BillingPage from './payments/BillingPage';
import JobsHistoryPage from './job/JobsHistoryPage';
import NewJobPage from './job/NewJobPage';
import SettingsPage from './user/SettingsPage';

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
