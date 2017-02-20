import * as actions from './actions';
import { Record } from '../transit';

const State = Record({
  status: '',
  error: null
}, 'search');

const cardsReducer = (state = new State(), action = {}) => {
  switch (action.type) {

    default:
      return state;
  }
};

export default cardsReducer;

