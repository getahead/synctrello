import express from 'express';
import config from '../../config';
import URI from 'urijs';
import * as userController from '../../controllers/UserController';

const UNAUTHORIZED_BODY = {
  success: false,
  error: {
    message: 'Unauthorized'
  }
};

const router = express.Router();

router.get('/trello', (req, res) => {
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
          callback_method: `postMessage`,
          scope: ['account', 'read'].join(',')
        })
        .toString()
    }
  });
});

router.get('/user', (req, res) => {
  const promise = req.query.token
    ? userController.loginWithTrello
    : userController.authorizeUserByLocalToken;

  const token = req.query.token || req.cookies.token;

  return promise(token)
    .then(result => {
      if (!result.user) {
        return Promise.reject(result);
      }
      if (result.token) {
        res.cookie('token', result.token);
      }
      return res.send({
        success: true,
        data: result.user
      })
    })
    .catch(err => res.send(err || UNAUTHORIZED_BODY))
});

export default router;
