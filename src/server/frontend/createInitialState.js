import config from '../config';
import repositoriesReducer from '../../common/repositories/reducer';
import authReducer from '../../common/auth/reducer';
// import configReducer from '../../common/config/reducer';
// import deviceReducer from '../../common/device/reducer';
// import intlReducer from '../../common/intl/reducer';
// import loadMessages from '../intl/loadMessages';

//const messages = loadMessages();

const createInitialState = () => ({
  config: {
//    ...configReducer(),
    appName: config.appName,
    appVersion: config.appVersion,
    sentryUrl: config.sentryUrl
  },
  device: {}, //deviceReducer(),
  intl: {
//    ...intlReducer(),
    currentLocale: config.defaultLocale,
    defaultLocale: config.defaultLocale,
    locales: config.locales,
//    messages,
  },
  repositories: repositoriesReducer(),
  auth: authReducer()
});

export default createInitialState;
