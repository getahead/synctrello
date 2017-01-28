import * as actions from './actions';
import { Record } from '../transit';
import User from './userModel';

const State = Record({
  user: User(),
  status: '',
  error: ''
}, 'auth');

const repositoriesReducer = (state = new State(), action = {}) => {
  switch (action.type) {
    case actions.GET_USER_INFO_START:
    case actions.GET_GITHUB_USER_TOKEN_START:
    case actions.GITHUB_OAUTH_START: {
      return state.set('status', 'pending');
    }

    case actions.GITHUB_OAUTH_SUCCESS: {
      if (!action.payload.success) {
        // continue;
      }

      return state
        .set('error', '')
        .set('status', '');
    }

    case actions.GET_USER_INFO_ERROR:
    case actions.GET_GITHUB_USER_TOKEN_ERROR:
    case actions.GITHUB_OAUTH_ERROR: {
      return state
        .set('error', action.payload.error)
        .set('status', '');
    }

    case actions.GET_GITHUB_USER_TOKEN_SUCCESS: {
      return state
        .set('error', '')
        .set('status', '');
    }

    case actions.GET_USER_INFO_SUCCESS: {
      const user = new User(action.payload.data);
      return state
        .set('error', '')
        .set('status', '')
        .set('user', user);
    }

    default:
      return state;
  }
};

export default repositoriesReducer;
