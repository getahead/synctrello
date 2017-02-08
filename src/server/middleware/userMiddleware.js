import config from '../config';
import jwt from 'jsonwebtoken';
import * as userController from '../controllers/UserController';

export default function userMiddleware(req, res, next) {
  const token = req.cookies && req.cookies.token || null;
  res.user = {
    isLoggedIn: false,
    profile: {},
    token: ''
  };

  if (!token) {
    return next();
  }

  let decoded;
  try {
    decoded = jwt.verify(token, config.userSecret);
  }
  catch(e) {
    res.cookie('token', '');
    return next();
  }

  if (!decoded) {
    return next();
  }

  return userController.authorizeUserByLocalToken(decoded.id)
    .then(result => {
      if (!result) {
        return Promise.reject(result);
      }
      if (result.token) {
        res.cookie('token', result.token);
      }
      res.user = {
        isLoggedIn: true,
        profile: result.profile,
        trelloToken: result.trelloToken
      };

      return next();
    })
    .catch(err => {
      res.cookie('token', '');
      return next();
    });
}
