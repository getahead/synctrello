import fetch from 'isomorphic-fetch';

export default function makeRequest(url, {headers, ...requestParams} = {}) {
  const startTime = new Date().getTime();
  const baseHeaders = {
    'Content-type': 'application/json',
    Accept: 'application/json'
  };

  return fetch(url, {
    headers: {
      ...baseHeaders,
      ...headers
    },
    timeout: 5000,
    ...requestParams
  }).then(res => res.json())
    .then(json => ({success: !json.error, duration: new Date().getTime() - startTime, ...json}))
    .catch(error => ({success: false, duration: new Date().getTime() - startTime, error}));
}
