import URI from 'urijs';
import isomorphicFetch from 'isomorphic-fetch';

function ensureServerUrl(serverUrl, input) {
  if (typeof input !== 'string') return input;
  if (URI(input).is('absolute')) return input;
  return URI(serverUrl + input).normalize().toString();
}

// Simple wrapper making isomorphic-fetch universal.
export default function createFetch(serverUrl, req) {
  return (input, init = {}) => {
    input = ensureServerUrl(serverUrl, input);
    if (req && URI(input).host() === URI(req.origin).host()) {
      init = {
        ...init,
        headers: {
          ...init.headers,
          Cookie: req.headers.cookie,
        }
      };
    }
    return isomorphicFetch(input, init);
  };
}
