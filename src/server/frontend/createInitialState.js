import config from '../config';
import boardsReducer from '../../common/boards/reducer';
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
  boards: boardsReducer(),
  auth: authReducer()
});

export default createInitialState;
