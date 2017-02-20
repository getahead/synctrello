import config from './config';
import errorHandler from './lib/errorHandler';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import modifyResponse from './middleware/modifyResponse';

import userMiddleware from './middleware/userMiddleware';
import serverUrlMiddleware from './middleware/originUrlMiddleware';
import routes from './routes';
import Raven from 'raven'

const app = express();

if (config.isProduction) {
  app.use(Raven.errorHandler(config.SENTRY_DSN));
}
app.enable('strict routing');
app.use(serverUrlMiddleware);
app.use(express.static('public'));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(compression());
app.use(modifyResponse);

app.use(userMiddleware);
app.use(routes);

if (config.isProduction) {
  app.use(Raven.errorHandler(config.SENTRY_DSN));
}
app.get('*', errorHandler);

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
