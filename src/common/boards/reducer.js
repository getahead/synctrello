import * as actions from './actions';
import { Map } from 'immutable';
import { Record } from '../transit';
import Board from './boardModel';

const State = Record({
  map: Map(),
  status: '',
  error: null
}, 'boards');

const repositoriesReducer = (state = new State(), action = {}) => {
  switch (action.type) {
    case actions.FETCH_USER_BOARDS_START: {

      return state
        .set('error', null)
        .set('status', 'pending');
    }
    case actions.TOGGLE_WEBHOOK_BOARD_START: {

      return state.set('error', null)
    }

    case actions.FETCH_USER_BOARDS_SUCCESS: {
      if (!action.payload.success || !action.payload.data) {
        return state
          .set('status', '')
          .set('error', action.payload.error)
      }

      const repositories = action.payload.data.items.reduce((result, item) =>
          result.set(item.id, new Board(item))
        , Map());

      return state
        .set('status', '')
        .update('map', map => map.merge(repositories));
    }

    case actions.TOGGLE_WEBHOOK_BOARD_SUCCESS: {
      if (!action.payload.success || !action.payload.data) {
        return state
          .set('error', action.payload.error)
      }

      const {active, id, idModel} = action.payload.data;

      return state
        .set('error', action.payload.error)
        .updateIn(['map', idModel], board => board.merge({active, idWebhook: id}))
    }

    case actions.TOGGLE_WEBHOOK_BOARD_ERROR:
    case actions.FETCH_USER_BOARDS_ERROR: {

      return state
        .set('status', '')
        .set('error', action.payload.error);
    }

    default:
      return state;
  }
};

export default repositoriesReducer;
