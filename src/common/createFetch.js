import URI from 'urijs';
import isomorphicFetch from 'isomorphic-fetch';

export default function createFetch(serverUrl, auth) {
  return (getState, input, init = {}) => {
    input = URI(input).origin(serverUrl).toString();

    const auth = getState().auth;
    const authorization = !!auth.get('token')
      ? {authorization: `Bearer ${auth.get('token')}`}
      : {};

    return isomorphicFetch(input, {
      ...init,
      mode: 'cors',
      headers: {
        ...init.headers,
        ...authorization,
      }
    });
  };
}
