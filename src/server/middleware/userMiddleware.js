export default function userMiddleware(req, res, next) {
  const token = req.session.token || req.cookies.token || null;
  res.user = {
    isLoggedIn: false
  };

  if (!token) {
    return next();
  }

  res.user = {
    ...res.user,
    isLoggedIn: true
  };

  req.session.token = token;
  return next();
}
