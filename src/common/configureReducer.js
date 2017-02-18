import { combineReducers } from 'redux';
import boardsReducer from './boards/reducer';
import authReducer from './auth/reducer';
import configReducer from './config/reducer';

const resetStateOnSignOutReducer = (reducer, initialState) => (
  state,
  action,
) => {
  const userWasSignedOut =
    action.type === 'ON_AUTH' &&
    state.users.viewer &&
    !action.payload.firebaseUser;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer({
    app: state.app,
    auth: initialState.auth,
    config: initialState.config,
    device: initialState.device,
    intl: initialState.intl,
  }, action);
};

const configureReducer = (initialState) => {
  let reducer = combineReducers({
    app: (state = {}) => state,
    config: configReducer,
    device: (state = {}) => state,
    intl: (state = {}) => state,
    boards: boardsReducer,
    auth: authReducer
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export default configureReducer;
