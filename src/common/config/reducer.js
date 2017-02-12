import { Record } from '../transit';

const State = Record({
  appName: '',
  appVersion: '',
  sentryUrl: ''
}, 'config');

const configReducer = (state = new State(), action = {}) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default configReducer;
