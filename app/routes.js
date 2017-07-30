// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ChannelPage from './containers/ChannelPage';
import SettingsPage from './containers/SettingsPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/channels" component={HomePage} />
    <Route path="/channel" component={ChannelPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
