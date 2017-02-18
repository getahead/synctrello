import fetch from 'isomorphic-fetch';
import config from '../config';
import jwt from 'jsonwebtoken';
import URI from 'urijs';

export function sentryProxy(req, res, next) {
  const {data, auth} = req.body;

  try {
    data.user = jwt.decode(token);
  }
  catch(e) {

  }

  const sentryPubilicDSN = config.SENTRY_PUBLIC_DSN;
  const sentryParsedDSN = sentryPubilicDSN.match(/(https?):\/\/([a-z0-9]*)@([0-9a-z\/\.]*)\/([0-9]*)$/);

  if (!sentryParsedDSN) {
    return next();
  }

  const sentryUrl = URI()
    .protocol(sentryParsedDSN[1])
    .hostname(sentryParsedDSN[3])
    .pathname(`/api/${sentryParsedDSN[4]}/store/`)
    .query({...auth, sentry_key: sentryParsedDSN[2]});

  console.log(sentryUrl.toString())
  console.log({
    'Host': req.headers['host'],
    'Origin': req.headers['origin'],
    'Referer': req.headers['referer'],
    'User-Agent': req.headers['user-agent'],
    'Content-type': 'application/json'
  })
  fetch(sentryUrl.toString(), {
    method: 'post',
    headers: {
      'Host': req.headers['host'],
      'Origin': req.headers['origin'],
      'Referer': req.headers['referer'],
      'User-Agent': req.headers['user-agent'],
      'Content-type': 'application/json'
    },
    timeout: 30000,
    body: JSON.stringify(data)
  }).then(res => console.log(res));

  return res.send({success: true})
}
