import config from './config';
import errorHandler from './lib/errorHandler';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import mongoose from './lib/mongoose';
import userMiddleware from './middleware/userMiddleware';
import serverUrlMiddleware from './middleware/originUrlMiddleware';
import routes from './routes';

const app = express();

app.enable('strict routing');
app.use(serverUrlMiddleware);
app.use(express.static('public'));

app.use(cookieParser());
app.use(session({
  secret: config.session.secret,
  key: 'synctrello_sid',
  proxy: false,
  resave: true,
  saveUninitialized: true,
  cookie: {
    domain: config.session.cookie.domain,
    maxAge: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    secure: config.session.cookie.secure
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(compression());

app.use(userMiddleware);
app.use(routes);
app.get('*', errorHandler);

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
