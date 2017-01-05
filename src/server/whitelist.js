/* @flow */
import express from 'express';
import { IpFilter } from 'express-ipfilter';

const app = express();

// WhiteList the following IPs
const ips = ['::ffff:127.0.0.1', '::1', '81.202.35.159'];

// Create the server
app.use(IpFilter(ips, { mode: 'allow' }));

export default app;
