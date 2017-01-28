import express from 'express';
import config from '../../config';
import URI from 'urijs';
import {v4 as uuidV4} from 'uuid';
import makeRequest from '../../lib/makeRequest';
import UserModel from '../../model/User.model';

const router = express.Router();

router.get('/github', (req, res) => {
  req.session.state = uuidV4();

  return res.json({
    success: true,
    data: {
      url: URI('https://github.com/login/oauth/authorize')
        .query({
          client_id: config.githubClientId,
          scope: ['repo', 'user'].join(','),
          state: req.session.state,
        })
        .toString()
    }
  });
});

router.get('/github-token', (req, res) => {
  const body = {
    client_id: config.githubClientId,
    client_secret: config.githubClientSecret,
    code: req.session.code,
    state: req.session.state
  };

  makeRequest('https://github.com/login/oauth/access_token', {
    method: 'post',
    body: JSON.stringify(body)
  }).then((response) => {
    req.session.token = response.access_token;
    res.cookie('token', response.access_token);
    delete req.session.code;
    delete req.session.state;

    res.json(response);
  });
});

router.get('/user', (req, res) => {
  makeRequest('https://api.github.com/user', {
    headers: {
      Authorization: `token ${req.session.token}`
    }
  }).then(({success, error, duration, ...userData}) => {
    if (error) {
      req.session.token = null;
      return res.json({
        success,
        error,
        data: {
          isLoggedIn: false
        }
      });
    }

    return res.json({
      success,
      data: {
        isLoggedIn: success,
        ...userData
      }
    });
  });
});

export default router;
