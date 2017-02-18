export const configureReporting = ({sentryUrl, unhandledRejection}) => {
  if (!Raven) {
    return;
  }

  Raven.config(sentryUrl, {
    environment: process.env.NODE_ENV,
    ignoreErrors: [
      'top.GLOBALS'
    ],
    ignoreUrls: [
      /bn\.adblender\.ru/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i
    ],
    transport: (options) => {
      return fetch(sentryUrl, {
        method: 'post',
        body: JSON.stringify({
          auth: options.auth,
          data: options.data
        }),
        credentials: 'same-origin',
        headers: {'Content-type': 'application/json'}
      }).then(res => res.json())
        .then(options.onSuccess)
        .catch(options.onError)
    }
  }).install();
  register(unhandledRejection);
};

// bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
const register = unhandledRejection => unhandledRejection((event) => {
  event.preventDefault();
  captureException(event.detail.reason);
});

const captureException = (error) => {
  if (process.env.NODE_ENV === 'production') {
    Raven.captureException(error);
  } else {
    console.warn('Uncaught error. Fix it, or it will be reported on production.');
    console.error(error.stack);
  }
};
