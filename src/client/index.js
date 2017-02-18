import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import {configureReporting} from './lib/captureException'
import {fromJSON} from '../common/transit';

import Root from './app/Root';

const appElement = document.getElementById('app');
const initialState = fromJSON(window.__INITIAL_STATE__);
const store = configureStore({
  initialState
});

if (process.env.NODE_ENV === 'production') {
  configureReporting({
    sentryUrl: `${document.location.protocol}//${document.location.host}/action/sentry/`,
    unhandledRejection: fn => window.addEventListener('unhandledrejection', fn),
  });
}

ReactDOM.render(<Root store={store} />, appElement);

if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./app/Root', () => {
    const NextRoot = require('./app/Root').default;

    ReactDOM.render(<NextRoot store={store} />, appElement);
  });
}
