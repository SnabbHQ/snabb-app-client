/* @flow */
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';
import whitelist from './whitelist';

const app = express();

// As currently we are deploying to heroku and there is no way to IP restrict so far at the network
// level, we need to configure express instead.
app.use(whitelist);

// $FlowFixMe
app.use(frontend);
app.get('*', errorHandler);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
