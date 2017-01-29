import App from '../../client/app/App';
import Helmet from 'react-helmet';
import Html from './Html';
import React from 'react';
import Promise from 'bluebird';
import ServerFetchProvider from './ServerFetchProvider';
import config from '../config';
import configureStore from '../../common/configureStore';
import createInitialState from './createInitialState';
import serialize from 'serialize-javascript';
import { Provider as Redux } from 'react-redux';
import { createServerRenderContext, ServerRouter } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import {toJSON} from '../../common/transit';

const settleAllWithTimeout = promises => Promise
  .all(promises.map(p => p.reflect()))
  .each((inspection) => {
    if (inspection.isFulfilled()) return;
    console.log('Server fetch failed:', inspection.reason());
  })
  .timeout(5000) // Do not block rendering forever.
  .catch((error) => {
    if (error instanceof Promise.TimeoutError) {
      console.log('Server fetch timeouted:', error);
      return;
    }
    throw error;
  });

const initialState = createInitialState();

const createStore = (req, res) => configureStore({
  req,
  initialState: {
    ...initialState,
    auth: initialState.auth.update('user', user => user.merge(res.user)),
    device: {
      ...initialState.device,
      host: req.origin,
    },
    intl: {
      ...initialState.intl,
      initialNow: Date.now(),
    },
  }
});

const renderBody = (store, context, location, fetchPromises) => {
  const markup = renderToString(
    <Redux store={store}>
      <ServerFetchProvider promises={fetchPromises}>
        <ServerRouter
          context={context}
          location={location}
        >
          <App />
        </ServerRouter>
      </ServerFetchProvider>
    </Redux>,
  );
  return { markup, helmet: Helmet.rewind() };
};

const renderScripts = (state, appJsFilename) =>
  `
    <script>
      window.__INITIAL_STATE__ = ${serialize(toJSON(state))};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderHtml = (state, bodyMarkupWithHelmet) => {
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = global.webpackIsomorphicTools.assets();
  if (!config.isProduction) {
    global.webpackIsomorphicTools.refresh();
  }
  const { markup: bodyMarkup, helmet } = bodyMarkupWithHelmet;
  const scriptsMarkup = renderScripts(state, appJsFilename);
  const markup = renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyHtml={`<div id="app">${bodyMarkup}</div>${scriptsMarkup}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={helmet}
      isProduction={config.isProduction}
    />,
  );
  return `<!DOCTYPE html>${markup}`;
};

// react-router.now.sh/ServerRouter
const render = async (req, res, next) => {
  try {
    const context = createServerRenderContext();
    const store = createStore(req, res);
    const fetchPromises = [];

    let bodyMarkupWithHelmet = renderBody(store, context, req.url, fetchPromises);
    const result = context.getResult();

    if (result.redirect) {
      res.redirect(301, result.redirect.pathname + result.redirect.search);
      return;
    }

    if (result.missed) {
      bodyMarkupWithHelmet = renderBody(store, context, req.url, fetchPromises);
      const htmlMarkup = renderHtml(store.getState(), bodyMarkupWithHelmet);
      res.status(404).send(htmlMarkup);
      return;
    }

    if (fetchPromises.length > 0) {
      await settleAllWithTimeout(fetchPromises);
      bodyMarkupWithHelmet = renderBody(store, context, req.url);
    }

    const htmlMarkup = renderHtml(store.getState(), bodyMarkupWithHelmet);
    res.status(200).send(htmlMarkup);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default render;
