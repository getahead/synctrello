import createLoggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import createFetch from './createFetch';

// Like redux-thunk, but with just one argument.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({...deps, dispatch, getState})
    : action,
  );

const configureMiddleware = (initialState, platformDeps, platformMiddleware, req) => {

  const middleware = [
    injectMiddleware({
      ...platformDeps,
      getUid: () => platformDeps.uuid.v4(),
      now: () => Date.now(),
      fetch: createFetch(initialState.device.host, req)
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    ...platformMiddleware,
  ];

  // Logger must be the last middleware in chain.
  if (process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER) {
    const logger = createLoggerMiddleware({
      collapsed: true,
    });
    middleware.push(logger);
  }

  return middleware;
};

export default configureMiddleware;
