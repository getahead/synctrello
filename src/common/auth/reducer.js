import * as actions from './actions';
import { Record } from '../transit';
import Profile from './profileModel';

const State = Record({
  isLoggedIn: false,
  profile: Profile(),
  status: '',
  error: '',
  token: '',
}, 'auth');

const repositoriesReducer = (state = new State(), action = {}) => {
  switch (action.type) {
    case actions.GET_USER_INFO_START:
    case actions.TRELLO_OAUTH_START: {
      return state.set('status', 'pending');
    }

    case actions.TRELLO_OAUTH_SUCCESS: {
      if (!action.payload.success) {
        // continue;
      }

      return state
        .set('error', '')
        .set('status', '');
    }

    case actions.GET_USER_INFO_ERROR:
    case actions.TRELLO_OAUTH_ERROR: {
      return state
        .set('error', action.payload.error)
        .set('isLoggedIn', false)
        .set('status', '');
    }

    case actions.GET_USER_INFO_SUCCESS: {
      const profile = new Profile(action.payload.data.profile);
      const token = action.payload.data.token || state.get('token');

      return state
        .set('error', '')
        .set('status', '')
        .set('isLoggedIn', true)
        .set('profile', profile)
        .set('token', token);
    }

    default:
      return state;
  }
};

export default repositoriesReducer;
