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

  return userController.authorizeUserByLocalToken(token)
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
