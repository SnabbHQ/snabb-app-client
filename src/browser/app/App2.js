import React from 'react';
import { provideHooks } from 'redial';
import analytics from '../../lib/analytics';
import {
  loadClientExtra,
  fetchClosestCity,
  fetchWallets,
  loadClientSettings
} from '../../actions';
import Navbar from '../Navbar';
import layoutStyles from '../../../styles/layout.scss';

const hooks = {
  load: ({ dispatch }) => {
    return Promise.all([
      dispatch(loadClientExtra()),
      dispatch(fetchWallets()),
      dispatch(loadClientSettings())
    ]);
  },
  browser: ({ dispatch }) => dispatch(fetchClosestCity())
};

const App = React.createClass({
  componentDidMount() {
    const { location } = this.props;

    analytics.page({
      path: location.pathname,
      search: location.search,
      url: document.location.origin + location.pathname + location.search
    });
  },

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    const { location: nextLocation } = nextProps;

    if (nextLocation.action === 'PUSH') {
      analytics.page({
        path: nextLocation.pathname,
        search: nextLocation.search,
        referrer: document.location.origin + location.pathname + location.search,
        url: document.location.origin + nextLocation.pathname + nextLocation.search
      });
    }
  },

  render() {
    return (
      <div>
        <div className={layoutStyles.navbar}>
          <Navbar />
        </div>

        {this.props.children}
      </div>
    );
  }
});

export default provideHooks(hooks)(App);
