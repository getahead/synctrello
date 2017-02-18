import config from '../config';

export default function userMiddleware(req, res, next) {
  const token = req.cookies && req.cookies.token || null;
  res.user = {
    isLoggedIn: !!token,
    token
  };

  return next();
}
