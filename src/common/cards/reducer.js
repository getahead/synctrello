import * as actions from './actions';
import { Map } from 'immutable';
import { Record } from '../transit';
import CardModel from './cardModel';

const State = Record({
  map: Map(),
  status: '',
  error: null
}, 'cards');

const cardsReducer = (state = new State(), action = {}) => {
  switch (action.type) {
    case actions.FETCH_CARDS_START: {
      return state.set('status', 'pending');
    }

    case actions.FETCH_CARDS_SUCCESS: {
      if (!action.payload.success || !action.payload.data) {
        return state
          .set('status', '')
          .set('error', action.payload.error)
      }

      const cards = action.payload.data.items.reduce((result, item) =>
        result.set(item.id, new CardModel(item)), Map());

      return state
        .update('map', map => map.merge(cards))
        .set('status', '');
    }

    case actions.FETCH_CARDS_ERROR: {
      return state
        .set('status', '')
        .set('error', action.payload.error);
    }

    case actions.ADD_CARD: {
      const card = new CardModel(action.payload);
      return state.update('map', map => map.set(card.id, card));
    }

    default:
      return state;
  }
};

export default cardsReducer;

