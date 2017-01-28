import configureMiddleware from './configureMiddleware';
import configureReducer from './configureReducer';
import { applyMiddleware, createStore, compose } from 'redux';

const configureStore = (options) => {
  const {
    req,
    initialState,
    platformDeps = {},
    platformMiddleware = [],
  } = options;

  const reducer = configureReducer(initialState);

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
    req
  );

  const enableDevToolsExtension =
    process.env.NODE_ENV !== 'production' &&
    process.env.IS_BROWSER &&
    window.devToolsExtension;

  const createReduxStore = enableDevToolsExtension
    ? compose(applyMiddleware(...middleware), window.devToolsExtension())
    : applyMiddleware(...middleware);

  const store = createStore(
    reducer,
    initialState,
    createReduxStore
  );

  // Enable hot reloading for reducers.
  if (module.hot && typeof module.hot.accept === 'function') {
    // Webpack for some reason needs accept with the explicit path.
    module.hot.accept('./configureReducer', () => {
      const configureReducer = require('./configureReducer').default;

      store.replaceReducer(configureReducer(initialState));
    });
  }

  return store;
};

export default configureStore;
