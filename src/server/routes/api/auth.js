import express from 'express';
import config from '../../config';
import URI from 'urijs';
import {v4 as uuidV4} from 'uuid';
import makeRequest from '../../lib/makeRequest';
import UserModel from '../../model/User.model';

const router = express.Router();

router.get('/trello', (req, res) => {

  //https://trello.com/1/authorize?response_type=token&key=8946c831b15b335bf71eec9733a09ff7&return_url=https%3A%2F%2Fdevelopers.trello.com&callback_method=postMessage&scope=read%2Cwrite%2Caccount&expiration=never&name=Sandbox+Trello+Application
  return res.json({
    success: true,
    data: {
      url: URI(config.API_URL).pathname('/1/authorize/')
        .query({
          key: config.TRELLO_API_KEY,
          expiration: 'never',
          name: 'SyncoBot',
          response_type: 'token',
          return_url: `${req.origin}/action/social-login/finish/`,
          callback_method: `fragment`,
          // scope: ['repo', 'user'].join(',')
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
