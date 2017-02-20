import config from '../config';
import boardsReducer from '../../common/boards/reducer';
import bindingsReducer from '../../common/bindings/reducer';
import cardsReducer from '../../common/cards/reducer';
import authReducer from '../../common/auth/reducer';
import configReducer from '../../common/config/reducer';
import searchReducer from '../../common/search/reducer';

const createInitialState = () => ({
  config: configReducer(),
  device: {}, //deviceReducer(),
  intl: {
//    ...intlReducer(),
    currentLocale: config.defaultLocale,
    defaultLocale: config.defaultLocale,
    locales: config.locales,
//    messages,
  },
  boards: boardsReducer(),
  bindings: bindingsReducer(),
  cards: cardsReducer(),
  search: searchReducer(),
  auth: authReducer()
});

export default createInitialState;
