function emptyFunction() {}

function getAnalytics() {
  if (typeof analytics !== 'undefined') {
    return analytics;
  }

  return {
    identify: emptyFunction,
    track: emptyFunction,
    page: emptyFunction,
    reset: emptyFunction,
    ready: emptyFunction,
  };
}

const analyticsProxy = getAnalytics();

analyticsProxy.identifyClient = (client) => {
  if (!client) { return; }

  const integrations = {};
  if (client.intercomUserHash) {
    integrations.Intercom = {
      user_hash: client.intercomUserHash,
    };
  }
  analyticsProxy.identify(client.id, {
    type: 'client',
    firstName: client.firstname,
    lastName: client.lastname,
    email: client.email,
    phone: client.phone,
    accountType: client.clientAccount.type,
  }, { integrations });
};

analyticsProxy.NAVIGATION_CATEGORY = 'Navigation';
analyticsProxy.ERRORS_CATEGORY = 'Errors';
analyticsProxy.DELIVERY_REQUEST_FLOW_CATEGORY = 'Delivery request flow';
analyticsProxy.ONGOING_DELIVERIES_CATEGORY = 'Ongoing deliveries';

export default analyticsProxy;
